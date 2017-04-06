(function appnameIdvSecondaryGovtcardDirective() {
    'use strict';
    angular.module('appname.common.idv.idvSecondaryGovtcard').directive('appnameIdvSecondaryGovtcard', idvSecondaryGovtcard);

    idvSecondaryGovtcard.$inject = [];

    function idvSecondaryGovtcard() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-secondary-govtcard-template.html'),
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
        vm.idv.govtcard = idvFactory.evDocDetails.govtcard;
        logger.log("vm.idv.govtcard", vm.idv.govtcard);

        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
    }

})();
