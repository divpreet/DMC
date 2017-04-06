(function appnameTextFieldDirective() {
    'use strict';
    angular.module('appname.common.textField').directive('appnameTextField', TextField);

    TextField.$inject = [];

    function TextField() {
        var directive = {
            restrict: 'EA',
            template: require('./text-field-template.html'),
            scope: {
                name: '@',
                type: '@',
                model: '=',
                errorMsg: '@',
                isInvalid: '@',
                groupPrefix: '@',
                label: '@',
                labelLeft: '@',
                isDisabled: '@',
                lockedTooltipMsg: '@',
                lockedTooltipPosition: '@',
                placeholderText: '@',
                validateType: '@',
                validateMaxValue: '@',
                validateDisable: '@',
                validatePattern: '@',
                validateMaxlength: '@',
                validatePatternOnBlur: '@',
                applyFilterOnBlur: '@',
                additionalBusinessValidation: '@',
                requiredLength: '@',
                validateRequired: '@',
                regexFlags: '@',
                additionalBusinessValidationOnChange: '&',
                additionalBusinessValidationOnBlur: '&'
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        function linkFunc(scope, el, attrs, ctrl) {

        }

        return directive;
    }

    Controller.$inject = ['$attrs'];

    function Controller($attrs) {
        var vm = this;
        vm.onCommonValidateChangeRequired = false;
        vm.onCommonValidateBlurRequired = false;
        if ($attrs.additionalBusinessValidationOnChange !== undefined) {
            vm.onCommonValidateChangeRequired = true;
            vm.onCommonValidateChange = function (fieldName, model, isFieldValid, isKeyPressed) {
                vm.additionalBusinessValidationOnChange({
                    "fieldName": fieldName,
                    "model": model,
                    "isFieldValid": isFieldValid,
                    "isKeyPressed": isKeyPressed
                });
            };
        }
        if ($attrs.additionalBusinessValidationOnBlur !== undefined) {
            vm.onCommonValidateBlurRequired = true;
            vm.onCommonValidateBlur = function () {
                vm.additionalBusinessValidationOnBlur();
            };
        }
    }
})();
