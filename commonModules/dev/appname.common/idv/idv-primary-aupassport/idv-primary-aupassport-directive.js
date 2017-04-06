(function appnameIdvPrimaryAupassportDirective() {
    'use strict';
    angular.module('appname.common.idv.idvPrimaryAupassport').directive('appnameIdvPrimaryAupassport', idvPrimaryAupassport);

    idvPrimaryAupassport.$inject = [];

    function idvPrimaryAupassport() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-primary-aupassport-template.html'),
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
        vm.idv = {};
        vm.idv.aupassport = idvFactory.evDocDetails.aupassport;
        logger.log("vm.idv.aupassport", vm.idv.aupassport);
        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
        vm.imageUrls = contentManagementFactory.imageUrls;
    }

})();
