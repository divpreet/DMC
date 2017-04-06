(function appnameIdvPrimaryAulicenceDirective() {
    'use strict';
    angular.module('appname.common.idv.idvPrimaryAulicence').directive('appnameIdvPrimaryAulicence', idvPrimaryAulicence);

    idvPrimaryAulicence.$inject = [];

    function idvPrimaryAulicence() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-primary-aulicence-template.html'),
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

    Controller.$inject = ["contentManagementFactory", "referenceDataFactory", "idvFactory", "Logger"];

    function Controller(contentManagementFactory, referenceDataFactory, idvFactory, logger) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.idv = {};
        vm.idv.aulicence = idvFactory.evDocDetails.aulicence;
        logger.log("vm.idv.aulicence", vm.idv.aulicence);
        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
        vm.stateList = referenceDataFactory.IDV.states;
        vm.imageUrls = contentManagementFactory.imageUrls;
    }

})();
