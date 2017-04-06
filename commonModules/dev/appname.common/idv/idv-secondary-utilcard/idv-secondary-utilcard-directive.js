(function appnameIdvSecondaryUtilcardDirective() {
    'use strict';
    angular.module('appname.common.idv.idvSecondaryUtilcard').directive('appnameIdvSecondaryUtilcard', idvSecondaryUtilcard);

    idvSecondaryUtilcard.$inject = [];

    function idvSecondaryUtilcard() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-secondary-utilcard-template.html'),
            scope: {
                myParam: '@'
            },
            link: linkFunc,
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.form = ctrl.form;
            scope.idv = ctrl.idv;
        }
    }

    Controller.$inject = ["contentManagementFactory", "idvFactory", "Logger"];

    function Controller(contentManagementFactory, idvFactory, logger) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.idv = {};
        vm.idv.utilcard = idvFactory.evDocDetails.utilcard;
        logger.log("vm.idv.utilcard", vm.idv.utilcard);

        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
    }

})();
