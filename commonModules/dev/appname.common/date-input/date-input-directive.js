(function appnameDateInputDirective() {
    'use strict';
    angular.module('appname.common.dateInput').directive('appnameDateInput', dateInput);
    angular.module('appname.common.dateInput').filter('rangeReversed', rangeReversed);

    dateInput.$inject = ["Logger"];

    function dateInput(logger) {
        var directive = {
            restrict: 'EA',
            require: '?ngModel',
            template: require('./date-input-template.html'),
            scope: {
                myParam: '@',
                id:'@'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            if (!ctrl) {
                return;
            }

            logger.log("Date selected 2", ctrl.$modelValue);
            var currentDate = new Date();
            scope.maxYear = currentDate.getFullYear() + parseInt(attr.yearsintofuture);
            scope.minYear = currentDate.getFullYear() - parseInt(attr.yearsintopast);
            var brandConfig = {
                minAge: 18
            };

            // to disable date fields
            logger.log("Disabled required", attr.disableRequired);
            scope.disableRequired = 'true' === attr.disableRequired;

            ctrl.$render = function() {
                if (ctrl.$modelValue && ctrl.$modelValue.match(/([0-9]{2}\/[0-9]{2}\/[0-9]{4})/g)) {
                    var arr = ctrl.$modelValue.split('/');
                    var day = arr[0];
                    var month = arr[1];
                    var year = arr[2];
                    scope.dateDay = day;
                    scope.dateMonth = month;
                    scope.dateYear = year;
                }
            };

            // update the value when one of the dropdown is changed
            function updateDateSelect() {

                // Update the model then the view
                if (scope.dateDay && scope.dateMonth && scope.dateYear) {
                    ctrl.$viewValue = scope.dateDay + '/' + scope.dateMonth + '/' + scope.dateYear;
                } else {
                    ctrl.$viewValue = '';
                }

                // Update $modelValue
                ctrl.$setViewValue(ctrl.$viewValue);

                // Update the local view
                ctrl.$render();

                // Validate
                validate(ctrl.$modelValue);
            }

            // Listen for change events to enable binding
            scope.$watch('dateDay + dateMonth + dateYear', function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    updateDateSelect();
                }
            });

            // reset when disable the fields
            scope.$watch(function() {
                return attr.disableRequired; }, function(newVal, oldVal) {
                logger.log("disable required watch", newVal);
                if (newVal !== oldVal) {
                    scope.disableRequired = 'true' === newVal;
                }
            });

            // Validator
            function validate(value) {

                // Reset validity state
                ctrl.$setValidity('required', true);
                ctrl.$setValidity('invalid', true);
                ctrl.$setValidity('issue', true);
                ctrl.$setValidity('expiry', true);
                ctrl.$setValidity('minAge', true);

                // Check required
                if (!value) {
                    ctrl.$setValidity('required', false);
                    return;
                }

                // Check valid date (eg 30 feb is invalid)
                var inputValue = new Date(scope.dateYear, scope.dateMonth - 1, scope.dateDay);
                if (inputValue.getFullYear() != scope.dateYear ||
                    inputValue.getMonth() !== (scope.dateMonth - 1) ||
                    inputValue.getDate() !== parseInt(scope.dateDay, 10)) {
                    ctrl.$setValidity('invalid', false);
                    return;
                }

                var today = new Date();
                if(attr.dateType === 'issue'){
                    // issue date must be a past date including today's date
                    if(inputValue.getTime() >= today.getTime()){
                        ctrl.$setValidity('issue', false);
                        return;
                    }
                } else if(attr.dateType === 'expiry'){
                    // expiry date must be a future date
                    if(inputValue.getTime() < today.getTime()){
                        ctrl.$setValidity('expiry', false);
                        return;
                    }
                } else if(attr.dateType === 'dob'){
                    var minAge = brandConfig.minAge;
                    var minDate = new Date();
                    minDate.setFullYear(minDate.getFullYear() - minAge);
                     if(inputValue.getTime() > minDate.getTime()){
                        ctrl.$setValidity('minAge', false);
                     }
                }


            }

            // Watch required attribute
            attr.$observe('required', function(value) {
                // Reset validity state
                if (!value) {
                    ctrl.$setValidity('required', true);
                    ctrl.$setValidity('invalid', true);
                } else {
                    validate(ctrl.$modelValue);
                }
            });

            scope.dateDayVisited = function() {
                scope.hasDateDayVisited = true;
            };

            scope.dateMonthVisited = function() {
                scope.hasDateMonthVisited = true;
            };

            scope.dateYearVisited = function() {
                scope.hasDateYearVisited = true;
            };


            scope.$watch('hasDateDayVisited + hasDateMonthVisited + hasDateYearVisited',
                function(newVal, oldVal) {
                    // set hasvisited to true
                    if (scope.hasDateDayVisited && scope.hasDateMonthVisited && scope.hasDateYearVisited) {
                        ctrl.touched = true;
                    }
                });

        }
    }

    Controller.$inject = ["Logger", "referenceDataFactory"];

    function Controller(logger, referenceDataFactory) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.days = referenceDataFactory.DateInput.day;
        vm.months = referenceDataFactory.DateInput.months;
        vm.years = referenceDataFactory.DateInput.getYears();


    }

    function rangeReversed() {
        return function(arr, upper, lower) {
            for (var i = upper; i > lower; i--) {
                arr.push(i < 10 ? '0' + i : i.toString());
            }
            return arr;
        };
    }

})();
