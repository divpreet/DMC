(function appnameIdvSecondaryMedicareDirective() {
    'use strict';
    angular.module('appname.common.idv.idvSecondaryMedicare').directive('appnameIdvSecondaryMedicare', idvSecondaryMedicare);

    idvSecondaryMedicare.$inject = [];

    function idvSecondaryMedicare() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-secondary-medicare-template.html'),
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
        vm.idv.medicare = idvFactory.evDocDetails.medicare;
        logger.log("vm.idv.medicare", vm.idv.medicare);

        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
         vm.imageUrls = contentManagementFactory.imageUrls;
    }

})();
