(function appnameComponentValidate() {
    'use strict';
    angular.module('appname.common.validate').directive('appnameValidate', Validate);
    Validate.$inject = ['$filter'];

    function Validate($filter) {
        var directive = {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                var isKeyPressed = false;
                if (element.attr('type') === 'text') {
                    attrs.$set('ngTrim', "false");
                }
                if (!ngModelCtrl) {
                    return;
                }

                var validatePatternFunction;
                initialize();

                var unregister = scope.$watch(function () {
                    return ngModelCtrl.$modelValue;
                }, initializeModal);


                function initializeModal(val) {
                    unregister();
                    if (!val) {
                        val = '';
                    }
                    var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                    ngModelCtrl.$dirty = true;
                    runFormatters(ngModelCtrl);
                    if (ngModelCtrl.$invalid && !ngModelCtrl.$error.required) {
                        ngModelCtrl.$touched = true;
                    } else {
                        ngModelCtrl.$touched = false;
                    }
                }

                var fromTriggerParsers = false;

                function triggerParsers(ngModelCtrl) {
                    fromTriggerParsers = true;
                    var val = ngModelCtrl.$modelValue;
                    ngModelCtrl.$setViewValue(null);
                    ngModelCtrl.$setViewValue(val);
                    fromTriggerParsers = false;
                }

                function runFormatters(ngModelCtrl) {
                    // this function is a copy of the internal formatter running code.
                    // https://github.com/angular/angular.js/issues/3407#issue-17469647

                    var modelValue = ngModelCtrl.$modelValue;
                    var formatters = ngModelCtrl.$formatters;
                    var idx = formatters.length;
                    var viewValue = modelValue;

                    while (idx--) {
                        viewValue = formatters[idx](viewValue);
                    }

                    if (ngModelCtrl.$viewValue !== viewValue) {
                        ngModelCtrl.$viewValue = ngModelCtrl.$$lastCommittedViewValue = viewValue;
                        ngModelCtrl.$render();
                        ngModelCtrl.$$runValidators(modelValue, viewValue, angular.noop);
                    }
                }

                function initialize() {
                    var requiredLength;
                    if (attrs.requiredLength !== undefined) {
                        if ($.trim(attrs.requiredLength) !== '') {
                            requiredLength = attrs.requiredLength;
                        }
                        attrs.$observe('requiredLength', function () {
                            if ($.trim(attrs.requiredLength) !== '') {
                                requiredLength = attrs.requiredLength;
                                var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                                if (!isValid && ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && $.trim(ngModelCtrl.$modelValue) !== '') {
                                    ngModelCtrl.$touched = true;
                                } else {
                                    ngModelCtrl.$touched = false;
                                }
                            }
                        });
                    }

                    var validateType;
                    if (attrs.validateType !== undefined) {
                        validateType = attrs.validateType;
                        attrs.$observe('validateType', function () {
                            validateType = attrs.validateType;
                            if (attrs.validateType === 'currency' || attrs.validateType === 'number') {
                                triggerParsers(ngModelCtrl);
                                runFormatters(ngModelCtrl);
                            }
                            var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                            if (!isValid && ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && $.trim(ngModelCtrl.$modelValue) !== '') {
                                ngModelCtrl.$touched = true;
                            } else {
                                ngModelCtrl.$touched = false;
                            }
                        });
                    }

                    var validateMaxValue;
                    if (attrs.validateMaxValue !== undefined) {
                        if ($.trim(attrs.validateMaxValue) !== '') {
                            validateMaxValue = parseFloat(attrs.validateMaxValue).toFixed(2);
                        }
                        attrs.$observe('validateMaxValue', function () {
                            if ($.trim(attrs.validateMaxValue) !== '') {
                                validateMaxValue = parseFloat(attrs.validateMaxValue).toFixed(2);
                                var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                                if (!isValid && ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && $.trim(ngModelCtrl.$modelValue) !== '') {
                                    ngModelCtrl.$touched = true;
                                } else {
                                    ngModelCtrl.$touched = false;
                                }
                            }
                        });
                    }

                    var validatePattern;
                    if (attrs.validatePattern !== undefined) {
                        validatePattern = attrs.validatePattern;
                        attrs.$observe('validatePattern', function () {
                            validatePattern = attrs.validatePattern;
                            var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                            if (!isValid && ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && $.trim(ngModelCtrl.$modelValue) !== '') {
                                ngModelCtrl.$touched = true;
                            } else {
                                ngModelCtrl.$touched = false;
                            }
                        });
                    }

                    var validatePatternOnBlur;
                    if (attrs.validatePatternOnBlur !== undefined) {
                        validatePatternOnBlur = attrs.validatePatternOnBlur;
                        attrs.$observe('validatePatternOnBlur', function () {
                            validatePatternOnBlur = attrs.validatePatternOnBlur;
                            var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                            if (!isValid && ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && $.trim(ngModelCtrl.$modelValue) !== '') {
                                ngModelCtrl.$touched = true;
                            } else {
                                ngModelCtrl.$touched = false;
                            }
                        });
                    }

                    var validateRequired;
                    if (attrs.validateRequired !== undefined) {
                        validateRequired = (attrs.validateRequired === 'true' || attrs.validateRequired === true);
                        attrs.$observe('validateRequired', function () {
                            validateRequired = (attrs.validateRequired === 'true' || attrs.validateRequired === true);
                            validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                        });
                    }

                    var validateMaxlength;
                    if (attrs.validateMaxlength !== undefined) {
                        if ($.trim(attrs.validateMaxlength) !== '') {
                            validateMaxlength = parseInt(attrs.validateMaxlength);
                        }
                        attrs.$observe('validateMaxlength', function () {
                            if ($.trim(attrs.validateMaxlength) !== '') {
                                validateMaxlength = parseInt(attrs.validateMaxlength);
                                var isValid = validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                                if (!isValid && ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && $.trim(ngModelCtrl.$modelValue) !== '') {
                                    ngModelCtrl.$touched = true;
                                } else {
                                    ngModelCtrl.$touched = false;
                                }
                            }
                        });
                    }

                    var validateDisable;
                    if (attrs.validateDisable !== undefined) {
                        validateDisable = (attrs.validateDisable === 'true' || attrs.validateDisable === true);
                        attrs.$observe('validateDisable', function () {
                            validateDisable = (attrs.validateDisable === 'true' || attrs.validateDisable === true);
                            if (validateDisable) {
                                ngModelCtrl.$setValidity('pattern', true);
                                if (requiredLength !== undefined) {
                                    ngModelCtrl.$setValidity('length', true);
                                }
                                if (validateRequired !== undefined) {
                                    ngModelCtrl.$setValidity('required', true);
                                }
                                if (validateMaxlength !== undefined) {
                                    ngModelCtrl.$setValidity('maxlength', true);
                                }
                                if (validateMaxValue !== undefined) {
                                    ngModelCtrl.$setValidity('maxvalue', true);
                                }
                                if (attrs.validateType && attrs.validateType.indexOf('date') > -1) {
                                    ngModelCtrl.$setValidity('validDate', true);
                                }
                                if (attrs.additionalBusinessValidation === 'true' || attrs.additionalBusinessValidation === true) {
                                    if (scope.vm) {
                                        if ((attrs.onCommonValidateChange !== undefined && (attrs.onCommonValidateChange === true || attrs.onCommonValidateChange === 'true')) || (attrs.onCommonValidateChange === undefined && scope.vm.onCommonValidateChange)) {
                                            ngModelCtrl.$setValidity('customBusinessValidation', true);
                                        }
                                    }
                                }
                                unBindEvents();
                            } else {
                                validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                            }
                        });
                    }

                    var applyFilterOnBlur = attrs.applyFilterOnBlur;
                    if (applyFilterOnBlur !== undefined) {
                        attrs.$observe('applyFilterOnBlur', function () {
                            applyFilterOnBlur = attrs.applyFilterOnBlur;
                            runFormatters(ngModelCtrl);
                        });
                    }

                    var handleInputFocus = function (me) {
                        ngModelCtrl.$touched = false;
                        ngModelCtrl.$dirty = false;
                        var start = me.selectionStart,
                            end = me.selectionEnd;
                        if (applyFilterOnBlur !== undefined) {
                            ngModelCtrl.$setViewValue(ngModelCtrl.$modelValue);
                            ngModelCtrl.$render();
                        }
                        me.setSelectionRange(start, end); //Fix for cursor positioning issue on IE
                    };

                    element.bind('focus', function (event) {
                        var me = this;
                        handleInputFocus(me);
                        event.stopPropagation();
                    });

                    element.bind('click', function (event) {
                        event.stopPropagation();
                    });

                    var handleInputBlur = function (val) {
                        ngModelCtrl.$dirty = true;
                        ngModelCtrl.$touched = true;
                        runFormatters(ngModelCtrl);
                        scope.$apply();
                    };

                    element.bind('blur', function () {
                        handleInputBlur(ngModelCtrl.$modelValue);
                        isKeyPressed = false;
                        if (attrs.additionalBusinessValidation === 'true' || attrs.additionalBusinessValidation === true) {
                            if (scope.vm) {
                                if ((attrs.onCommonValidateBlur !== undefined && (attrs.onCommonValidateBlur === true || attrs.onCommonValidateBlur === 'true')) || (attrs.onCommonValidateBlur === undefined && scope.vm.onCommonValidateBlur)) {
                                    scope.vm.onCommonValidateBlur();
                                }
                            }
                        }
                    });

                    var handleEnterKey = function (event) {
                        if (event.which === 13 || event.keyCode === 13) {
                            validatePatternFunction(ngModelCtrl.$modelValue, true, false);
                            ngModelCtrl.$touched = true;
                        }
                    };

                    element.bind('keydown', function (event) {
                        isKeyPressed = true;
                        handleEnterKey(event);
                    });

                    element.bind('paste', function () {
                        isKeyPressed = true;
                    });

                    element.bind('cut', function () {
                        isKeyPressed = true;
                    });

                    validatePatternFunction = function (val, shouldApplyValidity, isOnChange) {
                        var isValid = true;
                        if (!validateDisable) {
                            if (val === null || val === undefined || (val !== undefined && val !== null && $.trim(val) === '')) {
                                val = '';
                            }
                            var clean = $.trim(val);
                            var isPatternValid = true;
                            var isLengthValid = true;
                            var isRequireValid = true;
                            var isMaxlengthValid = true;
                            var isMaxValueValid = true;
                            var isDateValid = true;
                            var isCustomBusinessValid = true;
                            var patt;
                            if (validatePatternOnBlur && (attrs.regexFlags)) {
                                patt = new RegExp(validatePatternOnBlur, attrs.regexFlags);
                            } else if (validatePatternOnBlur) {
                                patt = new RegExp(validatePatternOnBlur);
                            } else {
                                patt = new RegExp(validatePattern);
                            }
                            if (!(patt.test(clean))) {
                                isPatternValid = false;
                            } else {
                                isPatternValid = true;
                            }

                            if (requiredLength) {
                                var requireLengthArray = requiredLength.split(':');
                                for (var index = 0; index < requireLengthArray.length; index++) {
                                    if (val !== null && val !== undefined && (val.toString().length !== parseInt(requireLengthArray[index]))) {
                                        isLengthValid = false;
                                        break;
                                    } else {
                                        isLengthValid = true;
                                    }
                                }
                            } else {
                                isLengthValid = true;
                            }

                            if (validateRequired) {
                                if (val === '') {
                                    isRequireValid = false;
                                } else {
                                    isRequireValid = true;
                                }
                            }

                            if (validateMaxlength) {
                                if (val !== null && val !== undefined && val.toString().length > validateMaxlength) {
                                    isMaxlengthValid = false;
                                } else {
                                    isMaxlengthValid = true;
                                }
                            }

                            if (validateMaxValue !== undefined) {
                                var convertedValue;
                                if (attrs.validateType === 'currency' && val) {
                                    convertedValue = parseFloat(val).toFixed(2);
                                } else if (attrs.validateType === 'number' && val) {
                                    convertedValue = parseFloat(val);
                                }
                                if (convertedValue !== undefined) {
                                    if (parseFloat(convertedValue) > parseFloat(validateMaxValue)) {
                                        isMaxValueValid = false;
                                    }
                                } else {
                                    isMaxValueValid = true;
                                }
                            }

                            isValid = isPatternValid && isLengthValid && isRequireValid && isMaxlengthValid && isMaxValueValid && isCustomBusinessValid;

                            if (isValid && (attrs.validateType && attrs.validateType.indexOf('date') > -1) && ngModelCtrl.$modelValue) {
                                var currentDate = moment().format('DD/MM/YYYY');
                                var isValidDate = moment(ngModelCtrl.$modelValue, 'DD/MM/YYYY').isValid();
                                var dateComparisionParm;
                                if (isValidDate) {
                                    if (attrs.validateType.indexOf(':') > -1) {
                                        dateComparisionParm = attrs.validateType.split(':');
                                        if (dateComparisionParm[1] === 'before') {
                                            if (moment(ngModelCtrl.$modelValue, 'DD/MM/YYYY').isBefore(moment(currentDate, 'DD/MM/YYYY'))) {
                                                isDateValid = true;
                                            } else {
                                                isDateValid = false;
                                            }
                                        } else if (dateComparisionParm[1] === 'after') {
                                            if (moment(ngModelCtrl.$modelValue, 'DD/MM/YYYY').isAfter(moment(currentDate, 'DD/MM/YYYY'))) {
                                                isDateValid = true;
                                            } else {
                                                isDateValid = false;
                                            }
                                        }
                                    } else {
                                        isDateValid = true;
                                    }
                                } else {
                                    isDateValid = false;
                                }
                            }

                            if (isOnChange && attrs.additionalBusinessValidation === 'true' || attrs.additionalBusinessValidation === true) {
                                if (scope.vm) {
                                    if ((attrs.onCommonValidateChange !== undefined && (attrs.onCommonValidateChange === true || attrs.onCommonValidateChange === 'true')) || (attrs.onCommonValidateChange === undefined && scope.vm.onCommonValidateChange)) {
                                        var isValidAfterCustomValidation = scope.vm.onCommonValidateChange(ngModelCtrl.$name, val, isValid, isKeyPressed);
                                        if (isValidAfterCustomValidation === false) {
                                            isCustomBusinessValid = false;
                                        } else {
                                            isCustomBusinessValid = true;
                                        }
                                    }
                                }
                            }
                            if (shouldApplyValidity && !validateDisable) {
                                if (val !== null && val !== undefined && $.trim(val) !== '') {
                                    ngModelCtrl.$setValidity('pattern', isPatternValid);
                                    ngModelCtrl.$setValidity('length', isLengthValid);
                                    ngModelCtrl.$setValidity('maxlength', isMaxlengthValid);
                                    ngModelCtrl.$setValidity('maxvalue', isMaxValueValid);
                                    ngModelCtrl.$setValidity('validDate', isDateValid);
                                    ngModelCtrl.$setValidity('customBusinessValidation', isCustomBusinessValid);
                                } else {
                                    ngModelCtrl.$setValidity('pattern', true);
                                    ngModelCtrl.$setValidity('length', true);
                                    ngModelCtrl.$setValidity('maxlength', true);
                                    ngModelCtrl.$setValidity('maxvalue', true);
                                    ngModelCtrl.$setValidity('validDate', true);
                                    ngModelCtrl.$setValidity('customBusinessValidation', true);
                                }
                                ngModelCtrl.$setValidity('required', isRequireValid);
                            } else if (validateDisable) {
                                ngModelCtrl.$setValidity('pattern', true);
                                ngModelCtrl.$setValidity('length', true);
                                ngModelCtrl.$setValidity('maxlength', true);
                                ngModelCtrl.$setValidity('maxvalue', true);
                                ngModelCtrl.$setValidity('validDate', true);
                                ngModelCtrl.$setValidity('customBusinessValidation', true);
                                ngModelCtrl.$setValidity('required', true);
                            }
                            return isValid && isDateValid && isCustomBusinessValid;
                        } else {
                            return isValid;
                        }
                    };

                    var processParsers = function (val) {
                        if (!validateDisable) {
                            var convertedValue;
                            if (val === null || val === undefined || (val !== undefined && val !== null && $.trim(val) === '')) {
                                val = '';
                            }
                            //var clean = $.trim(val);
                            ngModelCtrl.$touched = false;
                            var clean = val;
                            var patt = new RegExp(validatePattern);
                            if (!(patt.test(val))) {
                                isKeyPressed = false;
                                clean = ngModelCtrl.$modelValue;
                            } else {
                                if (validateMaxlength !== undefined && !fromTriggerParsers) {
                                    if ((val !== null && val !== undefined && val.toString().length > validateMaxlength) && (ngModelCtrl.$modelValue !== null && ngModelCtrl.$modelValue !== undefined && val.toString().length > ngModelCtrl.$modelValue.toString().length)) {
                                        clean = val.toString().substring(0, validateMaxlength);
                                    }
                                }
                                if (attrs.validateType === 'currency' && val) {
                                    convertedValue = parseFloat(val).toFixed(2);
                                } else if (attrs.validateType === 'number' && val) {
                                    convertedValue = parseFloat(val);
                                }
                                if (validateMaxValue !== undefined && !fromTriggerParsers) {
                                    if (convertedValue !== undefined) {
                                        if (parseFloat(convertedValue) > parseFloat(validateMaxValue)) {
                                            clean = ngModelCtrl.$modelValue;
                                        }
                                    }
                                }
                                if (clean === ngModelCtrl.$modelValue) {
                                    isKeyPressed = false;
                                }
                                validatePatternFunction(val, true, true);
                            }

                            if (angular.isUndefined(clean) || clean === null || clean === undefined) {
                                clean = '';
                            }

                            if (val != clean.toString()) {
                                ngModelCtrl.$setViewValue(clean.toString());
                                ngModelCtrl.$render();
                            } else {
                                if (convertedValue !== undefined) {
                                    clean = parseFloat(convertedValue);
                                }
                            }
                            return clean;
                        } else {
                            return val;
                        }
                    };

                    var processFormatters = function (val) {
                        if (!validateDisable) {
                            if (val === null || val === undefined || (val !== undefined && val !== null && $.trim(val) === '')) {
                                val = '';
                            }
                            var clean = val;
                            var isValid = validatePatternFunction(val, true, true);
                            if (applyFilterOnBlur && isValid && (val !== undefined && val !== null && $.trim(val) !== '')) {
                                if (applyFilterOnBlur.indexOf(':') > -1) {
                                    var parametersForFilter = applyFilterOnBlur.split(':');
                                    var filterName = parametersForFilter.splice(0, 1);
                                    parametersForFilter.unshift(val);
                                    clean = $filter(filterName[0]).apply(this, parametersForFilter);
                                } else {
                                    clean = $filter(applyFilterOnBlur)(val);
                                }
                            }
                            return clean;
                        } else {
                            return val;
                        }
                    };

                    ngModelCtrl.$formatters.push(function (val) {
                        return processFormatters(val);
                    });

                    ngModelCtrl.$parsers.push(function (val) {
                        return processParsers(val);
                    });

                    element.on('$destroy', function () {
                        unBindEvents();
                    });

                    function unBindEvents() {
                        element.unbind('blur');
                        element.unbind('focus');
                        element.unbind('keydown');
                        element.unbind('paste');
                        element.unbind('cut');
                        element.unbind('click');
                    }

                    //validatePatternFunction(ngModelCtrl.$modelValue, true);

                }


            }
        };

        return directive;
    }

})();
