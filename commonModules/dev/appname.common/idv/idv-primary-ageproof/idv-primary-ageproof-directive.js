(function appnameIdvPrimaryAgeproofDirective() {
    'use strict';
    angular.module('appname.common.idv.idvPrimaryAgeproof').directive('appnameIdvPrimaryAgeproof', idvPrimaryAgeproof);

    idvPrimaryAgeproof.$inject = [];

    function idvPrimaryAgeproof() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-primary-ageproof-template.html'),
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
        vm.idv.ageproof = idvFactory.evDocDetails.ageproof;
        logger.log("vm.idv.ageproof", vm.idv.ageproof);

        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
        vm.stateList = referenceDataFactory.IDV.states;
        vm.imageUrls = contentManagementFactory.imageUrls;
    }

})();
