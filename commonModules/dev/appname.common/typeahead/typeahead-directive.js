(function appnameTypeaheadDirective() {
    'use strict';
    angular.module('appname.common.typeahead').directive('appnameTypeahead', Typeahead);

    Typeahead.$inject = [];

    function Typeahead() {
        var directive = {
            restrict: 'EA',
            template: require('./typeahead-template.html'),
            scope: {
                "list": '=',
                "model": '=',
                'labelName': '@',
                'valueName': '@',
                'groupTitle': '@',
                'name': '@',
                'onChange': '&',
                'isDisabled': '=',
                'isRequired': '=',
                'isInvalid': '=',
                'errorMsg': '@',
                'tooltipPosition': '@'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    Controller.$inject = ['$element', '$scope', '$attrs', '$timeout', '$compile'];

    function Controller($element, $scope, $attrs, $timeout, $compile) {
        var vm = this;
        var elem = $element.find('#typeahead');
        $scope.$watch('vm.list',function(newValue){
            if(newValue){
                vm.list = newValue;
                angular.element(elem).typeahead({
                    source: function (query, process) {
                        var displayArr = [];
                        for (var i = 0; i < vm.list.length; i++) {
                            displayArr.push(vm.list[i][vm.labelName]);
                        }
                        return process(displayArr);
                        /*return $.get('search?q=' + query, function (data) {
                         return process(data.search_results);
                         });*/
                    },
                    select: function (){
                        var val = this.$menu.find('.active').data('value');
                        var response = '';
                        for (var i = 0; i < vm.list.length; i++) {
                            var displayAddress = vm.list[i][vm.labelName];
                            if (displayAddress === val) {
                                response = vm.list[i];
                            }
                        }
                        if (this.autoSelect || val) {
                            this.$element
                                .val(this.updater(val))
                                .change();
                        }
                        vm.model = response;
                        $scope.$parent.$apply();
                    }, updater: function (item) {
                        return item;
                    }
                });
            }
        });
    }

})();
