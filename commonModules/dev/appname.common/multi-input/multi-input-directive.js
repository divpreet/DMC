(function appnameMultiInputDirective() {
    'use strict';
    angular.module('appname.common.multiInput').directive('appnameMultiInput', MultiInput);

    MultiInput.$inject = ['$compile'];

    function MultiInput($compile) {
        var directive = {
            restrict: 'EA',
            template: require('./multi-input-template.html'),
            scope: {
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
                'tooltipPosition': '@',
                'yesText': '@',
                'noText': '@',
                'maxInput': '@',
                'listOf': '@',
                'dependencies': '@'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl,$transclude) {
            var elem = el.find('#transclude')[0];
            var repeatElem = el.find('#repeater')[0];
            $transclude(scope, function (clone) {
                angular.element(elem).append(clone);
                var replaceText = new RegExp( scope.vm.listOf, "g");
                elem.innerHTML = elem.innerHTML.replace(replaceText,'eachInput');
                var replaceTrans = new RegExp( 'ng-transclude', "g");
                elem.innerHTML = elem.innerHTML.replace(replaceTrans,'');
                //$compile(elem)(scope.$parent);
                angular.element(repeatElem).attr('ng-repeat',"eachInput in vm.model");
                $compile(repeatElem)(scope);
            });
        }
    }

    Controller.$inject = ['$element', '$scope', '$attrs', '$compile'];

    function Controller($element, $scope, $attrs,$compile) {
        var vm = this;
        //create a new scope that inherits from the parent of the
        var newScope = $scope.$parent;
        var dependencies = [];
        if(vm.dependencies){
            dependencies = vm.dependencies.split(',');
            for(var i=0;i<dependencies.length;i++){
                var value = getDescendantProp(newScope,dependencies[i]);
                createPropandAssign($scope,dependencies[i],value);
                addWatch(dependencies[i]);
            }
        }
        if(!vm.noText) vm.noText = 'No';
        if(!vm.yesText) vm.yesText = 'Yes';
        if(!vm.model) vm.model = [];
        if(!vm.maxInput) vm.maxInput = 100;
        vm.addInput = function(){
            var sampleObj = angular.copy(getDescendantProp(newScope,vm.listOf));
            vm.model.push(sampleObj);
        };
        vm.removeInput = function(index) {
            vm.model.splice(index, 1);
        };
        vm.onNoClick = function() {
            vm.model = [];
        };
        vm.onYesClick = function() {
            if(!vm.model || vm.model.length === 0){
                vm.addInput();
            }
        };
        vm.addInput();

        function addWatch(dependency){
            $scope.$watch('$parent.' + dependency,function(newValue){
                if(newValue){
                    createPropandAssign($scope,dependency,newValue);
                }
            });
        }
        //$element[0].innerHTML.replace(vm.listOf,'eachInput');
        //$element.find('#repeater').attr('custom-repeat',"eachInput in vm.model");
        function getDescendantProp(obj, desc) {
            var arr = desc.split(".");
            while(arr.length && (obj = obj[arr.shift()]));
            return obj;
        }
        function createPropandAssign(obj, desc,value) {
            var arr = desc.split(".");
            while(arr.length > 1 && (obj = obj[arr.shift()]));
            obj[arr] = value;
        }
    }
    angular.module('appname.common.multiInput').directive('customRepeat', function () {
        return {
            restrict: "A",
            template: '<div class="row form-group" ng-repeat="eachInput in vm.model" ng-form="eachForm" ng-transclude> ' +
            '</div>',
            transclude: true,
            link: function (scope, elem, attrs, ctrl, $transclude) {

            }
        };
    });
})();
