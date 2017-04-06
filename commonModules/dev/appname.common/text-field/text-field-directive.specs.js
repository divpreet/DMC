describe('appname.textField', function () {
    var $compile;
    var $rootScope;
    var originalTimeout;
    var textField;
    var additionalBusinessValidationOnBlur = false;
    var additionalBusinessValidationOnChange = false;
    // Load the module, which contains textField
    beforeEach(angular.mock.module('gui.ng.components'));
    beforeEach(angular.mock.module('appname.common'));
    /*beforeAll(function () {
        grunticon(['base/dev/app/build/WBC/css/symbols.data.svg.css', 'base/dev/app/build/WBC/css/symbols.data.png.css', 'base/dev/app/build/WBC/css/symbols.fallback.css'], grunticon.svgLoadedCallback);
    });*/
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        textField = {
            "name": "testInput",
            "type": "input",
            "groupPrefix": "$",
            "label": "Sample Text Field",
            "errorMsg": "test error",
            "isDisabled": false,
            "lockedTooltipMsg": "This field is locked",
            "lockedTooltipPosition": "left",
            "placeholderText": "Sample text",
            "requiredLength": 4,
            "validateRequired": true,
            "validateType": "number",
            "validateMaxValue": 546456456456,
            "validateMaxlength": 4,
            "validateDisable": false,
            "validatePattern": "^\\d{0,10}[\\.]?\\d{0,2}$",
            "validatePatternOnBlur": "^\\d{0,7}[\\.]?\\d{0,2}$",
            "applyFilterOnBlur": "number:2",
            "additionalBusinessValidation": false,
            "regexFlags": "i"
        };
        $rootScope.vm = {};
        $rootScope.vm.testForm = {};
        $rootScope.vm.textFieldModel = null;
        $rootScope.vm.textField = angular.copy(textField);
        $rootScope.vm.onCommonValidateBlur = function () {
            additionalBusinessValidationOnBlur = true;
        };
        $rootScope.vm.onCommonValidateChange = function (fieldName, model, isFieldValid, isKeyPressed) {
            additionalBusinessValidationOnChange = true;
        };
        $rootScope.vm.isFieldInvalid = function (fieldName) {
            return ($rootScope.vm.testForm && $rootScope.vm.testForm[fieldName] && $rootScope.vm.testForm[fieldName].$invalid && (($rootScope.vm.testForm.$submitted && $rootScope.vm.testForm[fieldName].$dirty) || $rootScope.vm.testForm[fieldName].$touched));
        };
    }));
    afterEach(function () {
        $rootScope.vm = null;
        additionalBusinessValidationOnBlur = false;
        additionalBusinessValidationOnChange = false;
    });
    describe('display parameter validateRequired', function () {
        it('display "*" when validate-required="true"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            //console.log('Element after Digest: ' + $(element)[0].outerHTML);
            expect($(element).find('.appname-text-field__label__mandatory').text()).toEqual('*');
        });
        it('do not display "*" when validate-required="false"', function () {
            $rootScope.vm.textField.validateRequired = false;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isElementFount = $(".appname-text-field__label").find(".appname-text-field__label__mandatory").length;
            expect(isElementFount).toEqual(0);
        });
        it('do not highlight with "red" border if input field has empty value on load when validate-required="true"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border if input field has empty value on load when validate-required="false"', function () {
            $rootScope.vm.textField.validateRequired = false;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border if input field has non empty valid value "1234" on load when validate-required="true"', function () {
            $rootScope.vm.textFieldModel = '1234';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border if input field has non empty valid value "1234" on load when validate-required="false"', function () {
            $rootScope.vm.textField.validateRequired = false;
            $rootScope.vm.textFieldModel = '1234';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border after interacting with input field and left empty when validate-required="true"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').focus().blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isWarningMessageDisplayed = $(element).find('p.alert-form-msg').length;
            var warningMessage = $(element).find('p.alert-form-msg').text();
            var isWarningDisplayedWithMessage = hasWarningClass && isWarningMessageDisplayed && (warningMessage === 'test error');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = isWarningDisplayedWithMessage && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border after interacting with input field and not left empty with valid value "1234" when validate-required="true"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('1234').trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border after interacting with input field and left empty when validate-required="false"', function () {
            $rootScope.vm.textField.validateRequired = false;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').focus().blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border after interacting with input field and not left empty with valid value "1234" when validate-required="false"', function () {
            $rootScope.vm.textField.validateRequired = false;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('1234').trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToValidateRequired = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.required !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToValidateRequired;
            expect(isErrorStateApplied).toEqual(false);
        });
    });
    describe('display parameter requiredLength', function () {
        it('highlight with "red" border if input field has invalid value "123" on load when required-length="4"', function () {
            $rootScope.vm.textFieldModel = '123';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isWarningMessageDisplayed = $(element).find('p.alert-form-msg').length;
            var warningMessage = $(element).find('p.alert-form-msg').text();
            var isWarningDisplayedWithMessage = hasWarningClass && isWarningMessageDisplayed && (warningMessage === 'test error');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = isWarningDisplayedWithMessage && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border if input field has valid value "1234" on load when required-length="4"', function () {
            $rootScope.vm.textFieldModel = '1234';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border if input field has invalid value "123" on load when required-length="undefined"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textFieldModel = '123';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border if input field has valid value "1234" on load when required-length="undefined"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textFieldModel = '1234';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border after interacting with input field and not left empty with valid value "1234" when required-length="4"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('1234').trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('do not highlight with "red" border after interacting with input field and not left empty with valid "1234" value when required-length="undefined"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('1234').trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border after interacting with input field and not left empty with invalid value "123" when required-length="4"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('123').trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border after interacting with input field and not left empty with invalid value "123" when required-length="undefined"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('123').trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToRequiredLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.length !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToRequiredLength;
            expect(isErrorStateApplied).toEqual(false);
        });
    });
    describe('display parameter name', function () {
        it('create input tag with name attribute value as "testInput" when name="testInput"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var inputName = $(element).find('input.appname-text-field__input-field').prop('name');
            expect(inputName).toEqual('testInput');
        });
    });
    describe('display parameter type', function () {
        it('create input tag when type="input"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isInputGroup = $(element).find('input.appname-text-field__input-field').hasClass('input-group-input');
            expect(isInputGroup).toEqual(false);
        });
        it('create input group tag when type="input-group"', function () {
            $rootScope.vm.textField.type = 'input-group';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isInputGroup = $(element).find('input.appname-text-field__input-field').hasClass('input-group-input');
            expect(isInputGroup).toEqual(true);
        });
        it('create input group tag with group prefix="$" when type="input-group" and group-prefix="$"', function () {
            $rootScope.vm.textField.type = 'input-group';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isInputGroup = $(element).find('input.appname-text-field__input-field').hasClass('input-group-input');
            var hasInputGroupPrefix = $(element).find('.input-group-addon').length;
            var inputGroupPrefix = $(element).find('.input-group-addon').text();
            var isInputGroupWithPrefix = isInputGroup && hasInputGroupPrefix && (inputGroupPrefix === '$');
            expect(isInputGroupWithPrefix).toEqual(true);
        });
    });
    describe('display parameter label', function () {
        it('display label when label="Sample Text Field"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var inputLabel = $(element).find('label.appname-text-field__label').text();
            expect(inputLabel).toContain('Sample Text Field');
        });
    });
    /*describe('display parameter isDisabled', function () {
        it('display lock icon when is-disabled="true"', function () {
            $rootScope.vm.textField.isDisabled = true;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isLockIconDisplayed = $(element).find('gui-tooltip span.icon-padlock').length;
            expect(isLockIconDisplayed).toEqual(1);
        });
        it('do not display lock icon when is-disabled="false"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isLockIconDisplayed = $(element).find('gui-tooltip span.icon-padlock').length;
            expect(isLockIconDisplayed).toEqual(0);
        });
        it('disable input field when is-disabled="true"', function () {
            $rootScope.vm.textField.isDisabled = true;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isInputDisabled = $(element).find('input.appname-text-field__input-field').is(':disabled');
            expect(isInputDisabled).toEqual(true);
        });
        it('do not disable input field when is-disabled="false"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var isInputDisabled = $(element).find('input.appname-text-field__input-field').is(':disabled');
            expect(isInputDisabled).toEqual(false);
        });
        /*it('display tooltip on hover of lock icon when locked-tooltip-msg="This field is locked" and is-disabled="true"', function () {
            $rootScope.vm.textField.isDisabled = true;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var tooltipText = $(element).find('gui-tooltip span.tooltip.hltp-tooltip__fieldset div.tooltip-bubble').text();
            expect(tooltipText).toContain("This field is locked");
        });
    });*/
    describe('display parameter placeholderText', function () {
        it('display placeholder text when placeholder-text="Sample text"', function () {
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var placeholderText = $(element).find('input.appname-text-field__input-field').prop('placeholder');
            expect(placeholderText).toContain("Sample text");
        });
    });
    describe('display parameter validateType', function () {
        /*originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        beforeEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 21000;
        });*/
        it('convert modal value to float on load when validate-type="number" and modal value is float 12345.6', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textFieldModel = 12345.6;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
            /*console.log('Original before: ' + typeof $rootScope.vm.textFieldModel + ' value: ' + $rootScope.vm.textFieldModel);
            var rootscope = $rootScope;
            console.log('Duplicate before: ' + typeof rootscope.vm.textFieldModel + ' value: ' + rootscope.vm.textFieldModel);
            setTimeout(function () {
                //$rootScope.$apply();
                //debugger;
                var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
                console.log('Original after: ' + typeof $rootScope.vm.textFieldModel + ' value: ' + $rootScope.vm.textFieldModel);
                console.log('Duplicate after: ' + typeof rootscope.vm.textFieldModel + ' value: ' + rootscope.vm.textFieldModel);
                expect(typeOfModalValue).toEqual("string");
                done();
            }, 20000);*/
        });
        it('convert modal value to float on load when validate-type="number" and modal value is "12345.6"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textFieldModel = "12345.6";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
            /*setTimeout(function () {
                $rootScope.$apply();
                var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
                expect(typeOfModalValue).toEqual("number");
                done();
            }, 14000);*/
        });
        it('convert modal value to float after interacting with input field when validate-type="number" and modal value is float 12345.6', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('12345').trigger('change').blur();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
        });
        it('convert modal value to float after interacting with input field when validate-type="number" and modal value is "12345.6"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('12345').trigger('change').blur();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
        });
        it('convert modal value to float on load when validate-type="currency" and modal value is float 12345.6', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'currency';
            $rootScope.vm.textFieldModel = 12345.6;
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
        });
        it('convert modal value to float on load when validate-type="currency" and modal value is "12345.6"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'currency';
            $rootScope.vm.textFieldModel = "12345.6";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
        });
        it('convert modal value to float after interacting with input field when validate-type="currency" and modal value is float 12345.6', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'currency';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('12345').trigger('change').blur();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
        });
        it('convert modal value to float after interacting with input field when validate-type="currency" and modal value is "12345.6"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'currency';
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val('12345').trigger('change').blur();
            var typeOfModalValue = typeof $rootScope.vm.textFieldModel;
            expect(typeOfModalValue).toEqual("number");
        });
        it('do not highlight with "red" border on load when validate-type="date" and modal value is valid "02/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textFieldModel = "02/02/2016";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border on load when validate-type="date" and modal value is invalid "31/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textFieldModel = "31/02/2016";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border after interacting with input field when validate-type="date" and modal value is valid "02/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val("02/02/2016").trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border after interacting with input field when validate-type="date" and modal value is invalid "31/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val("31/02/2016").trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border on load when validate-type="date:before" and modal value is valid "02/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:before';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textFieldModel = "02/02/2016";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border on load when validate-type="date:before" and modal value is invalid "07/08/2500"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:before';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textFieldModel = "07/08/2500";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border after interacting with input field when validate-type="date:before" and modal value is valid "02/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:before';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val("02/02/2016").trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border after interacting with input field when validate-type="date:before" and modal value is invalid "07/08/2500"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:before';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val("07/08/2500").trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border on load when validate-type="date:after" and modal value is valid "07/08/2500"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:after';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textFieldModel = "07/08/2500";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border on load when validate-type="date:after" and modal value is invalid "02/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:after';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textFieldModel = "02/02/2016";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(true);
        });
        it('do not highlight with "red" border after interacting with input field when validate-type="date:after" and modal value is valid "07/08/2500"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:after';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val("07/08/2500").trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(false);
        });
        it('highlight with "red" border after interacting with input field when validate-type="date:after" and modal value is invalid "02/02/2016"', function () {
            $rootScope.vm.textField.requiredLength = undefined;
            $rootScope.vm.textField.validateMaxlength = undefined;
            $rootScope.vm.textField.validateType = 'date:after';
            $rootScope.vm.textField.validatePattern = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            $rootScope.vm.textField.validatePatternOnBlur = "^(0[1-9]|[1-2][0-9]|3[0-1])/(0[1-9]|1[0-2])/(19[0-9]{2}|2[0-9]{3})$";
            // Compile a piece of HTML containing Header
            var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
            $rootScope.$digest();
            $(element).find('input.appname-text-field__input-field').val("02/02/2016").trigger('change').blur();
            var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
            var isErrorSpecificToDate = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.validDate !== undefined);
            var isErrorStateApplied = hasWarningClass && isErrorSpecificToDate;
            expect(isErrorStateApplied).toEqual(true);
        });
        describe('display parameter validateMaxValue', function () {
            it('do not highlight with "red" border on load when validate-type="number" and validate-max-value="123456.5" and modal value is a valid value "123456.5"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.validateMaxValue = 123456.5;
                $rootScope.vm.textFieldModel = 123456.5;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxValue = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxvalue !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxValue;
                expect(isErrorStateApplied).toEqual(false);
            });
            it('highlight with "red" border on load when validate-type="number" and validate-max-value="123456.5" and modal value is a invalid value "123456.6"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.validateMaxValue = 123456.5;
                $rootScope.vm.textFieldModel = 123456.6;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxValue = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxvalue !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxValue;
                expect(isErrorStateApplied).toEqual(true);
            });
            it('do not highlight with "red" border after interacting with input field when validate-type="number" and validate-max-value="123456.5" and modal value is a valid value "123456.5"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.validateMaxValue = 123456.5;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("123456.5").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxValue = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxvalue !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxValue;
                expect(isErrorStateApplied).toEqual(false);
            });
            it('do not allow invalid entry into the field and do not highlight with "red" border after interacting with input field when validate-type="number" and validate-max-value="123456.5" and modal value is a invalid value "123456.6"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.validateMaxValue = 123456.5;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("123456.6").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxValue = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxvalue !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxValue;
                expect(isErrorStateApplied).toEqual(false);
            });
        });

        describe('display parameter validateMaxlength', function () {
            it('do not highlight with "red" border on load when validate-type="number" and validate-max-length="4" and modal value is a valid value "1234"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textFieldModel = 1234;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxlength !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxLength;
                expect(isErrorStateApplied).toEqual(false);
            });

            it('highlight with "red" border on load when validate-type="number" and validate-max-length="4" and modal value is a valid value "12345"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textFieldModel = 12345;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxlength !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxLength;
                expect(isErrorStateApplied).toEqual(true);
            });
            it('do not highlight with "red" border after interacting with the input field when validate-type="number" and validate-max-length="4" and modal value is a valid value "1234"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("1234").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxlength !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxLength;
                expect(isErrorStateApplied).toEqual(false);
            });

            it('do not highlight with "red" border after interacting with the input field when validate-type="number" and validate-max-length="4" and modal value is a valid value "12345"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("12345").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxlength !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxLength;
                expect(isErrorStateApplied).toEqual(false);
            });
        });

        describe('display parameter validatePattern', function () {
            it('reject the change after interacting with input field when validate-pattern="^\\d{0,8}$" and modal value is a invalid value "-"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("-").trigger('change').blur();
                var isValueRejected = $rootScope.vm.textFieldModel === '';
                expect(isValueRejected).toEqual(true);
            });
            it('accept the change after interacting with input field when validate-pattern="^\\d{0,8}$" and modal value is a valid value "1"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("1").trigger('change').blur();
                var isValueAccepted = $rootScope.vm.textFieldModel === 1;
                expect(isValueAccepted).toEqual(true);
            });

        });

        describe('display parameter validatePatternOnBlur', function () {
            it('do not highlight with "red" border on load when validate-pattern-on-blur="^\\d{0,7}[\\.]?\\d{0,2}$" and modal value is a valid value "1234"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textFieldModel = 1234;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToPattern = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.pattern !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToPattern;
                expect(isErrorStateApplied).toEqual(false);
            });

            it('highlight with "red" border on load when validate-pattern-on-blur="^\\d{0,7}[\\.]?\\d{0,2}$" and modal value is a invalid value "1234567890.123"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textFieldModel = "1234567890.123";
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToPattern = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.pattern !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToPattern;
                expect(isErrorStateApplied).toEqual(false);
            });
            it('do not highlight with "red" border after interacting with the input field when validate-pattern-on-blur="^\\d{0,7}[\\.]?\\d{0,2}$" and modal value is a valid value "1234"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("1234").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToPattern = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.pattern !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToPattern;
                expect(isErrorStateApplied).toEqual(false);
            });

            it('highlight with "red" border after interacting with the input field when validate-pattern-on-blur="^\\d{0,7}[\\.]?\\d{0,2}$" and modal value is a invalid value "1234567890.12"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("1234567890.12").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToPattern = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.pattern !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToPattern;
                expect(isErrorStateApplied).toEqual(true);
            });

            it('do not highlight with "red" border after interacting with the input field when validate-pattern-on-blur="^westpac$" and regex-flags="i" modal value is a valid value "Westpac"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.validateType = undefined;
                $rootScope.vm.textField.validatePattern = "^[A-Ba-b]{0,}$";
                $rootScope.vm.textField.validatePatternOnBlur = "^westpac$";
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("Westpac").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToPattern = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.pattern !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToPattern;
                expect(isErrorStateApplied).toEqual(false);
            });

            it('highlight with "red" border after interacting with the input field when validate-pattern-on-blur="^westpac$" and regex-flags="undefined" modal value is a invalid value "Westpac"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.validatePattern = "^[A-Ba-b]{0,}$";
                $rootScope.vm.textField.validatePatternOnBlur = "^westpac$";
                $rootScope.vm.textField.validateType = undefined;
                $rootScope.vm.textField.regexFlags = undefined;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val("Westpac").trigger('change').blur();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToPattern = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.pattern !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToPattern;
                expect(isErrorStateApplied).toEqual(false);
            });
        });

        describe('display parameter applyFilterOnBlur', function () {
            it('display the value with filter when apply-filter-on-blur="number:2" and modal value is a valid value "1234"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textFieldModel = 1234;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var valueAfterFilterIsApplied = $(element).find('input.appname-text-field__input-field').val();
                var isFilterAppliedProperly = (valueAfterFilterIsApplied === '1,234.00');
                expect(isFilterAppliedProperly).toEqual(true);
            });
        });


        describe('display parameter additionalBusinessValidation', function () {
            it('do not trigger additional business validation after interacting with input field when additional-business-validation-on-blur="false"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.additionalBusinessValidation = false;
                $rootScope.vm.textFieldModel = 1234;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val('12345').trigger('change').blur();
                var areAdditionalBusinessValidationTriggered = additionalBusinessValidationOnBlur && additionalBusinessValidationOnChange;
                expect(areAdditionalBusinessValidationTriggered).toEqual(false);
            });
            it('trigger additional business validation after interacting with input field when additional-business-validation-on-blur="false"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateMaxlength = undefined;
                $rootScope.vm.textField.additionalBusinessValidation = true;
                $rootScope.vm.textFieldModel = 1234;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                $(element).find('input.appname-text-field__input-field').val('12345').trigger('change').blur();
                var areAdditionalBusinessValidationTriggered = additionalBusinessValidationOnBlur && additionalBusinessValidationOnChange;
                expect(areAdditionalBusinessValidationTriggered).toEqual(true);
            });
        });

        describe('display parameter validateDisable', function () {
            it('do not highlight with "red" border on load when validate-type="number" and validate-max-length="4" and modal value is a valid value "12345" and validate-disable="true"', function () {
                $rootScope.vm.textField.requiredLength = undefined;
                $rootScope.vm.textField.validateMaxValue = undefined;
                $rootScope.vm.textField.validateDisable = true;
                $rootScope.vm.textFieldModel = 12345;
                // Compile a piece of HTML containing Header
                var element = $compile('<form name="vm.testForm"><appname-text-field name="{{vm.textField.name}}" type="{{vm.textField.type}}" model="vm.textFieldModel" error-msg="{{vm.textField.errorMsg}}" is-invalid="{{vm.isFieldInvalid(vm.textField.name)}}" group-prefix="{{vm.textField.groupPrefix}}" label="{{vm.textField.label}}" is-disabled="{{vm.textField.isDisabled}}" locked-tooltip-msg="{{vm.textField.lockedTooltipMsg}}" locked-tooltip-position="{{vm.textField.lockedTooltipPosition}}" placeholder-text="{{vm.textField.placeholderText}}" validate-type="{{vm.textField.validateType}}" validate-max-value="{{vm.textField.validateMaxValue}}" validate-maxlength="{{vm.textField.validateMaxlength}}" validate-disable="{{vm.textField.validateDisable}}" validate-pattern="{{vm.textField.validatePattern}}" validate-pattern-on-blur="{{vm.textField.validatePatternOnBlur}}" apply-filter-on-blur="{{vm.textField.applyFilterOnBlur}}" additional-business-validation="{{vm.textField.additionalBusinessValidation}}" required-length="{{vm.textField.requiredLength}}" validate-required="{{vm.textField.validateRequired}}" regex-flags="{{vm.textField.regexFlags}}" additional-business-validation-on-change="vm.onCommonValidateChange(fieldName, model, isFieldValid, isKeyPressed)" additional-business-validation-on-blur="vm.onCommonValidateBlur()"></appname-text-field></form>')($rootScope);
                $rootScope.$digest();
                var hasWarningClass = $(element).find('.appname-text-field').hasClass('has-warning');
                var isErrorSpecificToMaxLength = (Object.keys($rootScope.vm.testForm.$error).length === 1) && ($rootScope.vm.testForm.$error.maxlength !== undefined);
                var isErrorStateApplied = hasWarningClass && isErrorSpecificToMaxLength;
                expect(isErrorStateApplied).toEqual(false);
            });
        });


        /*afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });*/
    });
});
