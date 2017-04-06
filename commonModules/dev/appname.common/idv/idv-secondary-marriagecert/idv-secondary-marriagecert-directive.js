(function appnameIdvSecondaryMarriagecertDirective() {
    'use strict';
    angular.module('appname.common.idv.idvSecondaryMarriagecert').directive('appnameIdvSecondaryMarriagecert', idvSecondaryMarriagecert);

    idvSecondaryMarriagecert.$inject = [];

    function idvSecondaryMarriagecert() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-secondary-marriagecert-template.html'),
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
        vm.idv.marriagecert = idvFactory.evDocDetails.marriagecert;
        logger.log("vm.idv.marriagecert", vm.idv.marriagecert);

        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
    }

})();
