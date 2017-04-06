(function appnameIdvPrimaryOtherpassportDirective() {
    'use strict';
    angular.module('appname.common.idv.idvPrimaryOtherpassport').directive('appnameIdvPrimaryOtherpassport', idvPrimaryOtherpassport);

    idvPrimaryOtherpassport.$inject = [];

    function idvPrimaryOtherpassport() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-primary-otherpassport-template.html'),
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
        vm.idv.otherpassport = idvFactory.evDocDetails.otherpassport;
        logger.log("vm.idv.otherpassport", vm.idv.otherpassport);

        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
        vm.countryList = referenceDataFactory.IDV.countries;
    }

})();
