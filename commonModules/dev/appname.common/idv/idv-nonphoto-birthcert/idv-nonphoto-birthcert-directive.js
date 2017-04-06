(function appnameIdvNonphotoBirthcertDirective() {
    'use strict';
    angular.module('appname.common.idv.idvNonphotoBirthcert').directive('appnameIdvNonphotoBirthcert', idvNonphotoBirthcert);

    idvNonphotoBirthcert.$inject = [];

    function idvNonphotoBirthcert() {
        var directive = {
            require: "^appnameIdvLayout",
            restrict: 'EA',
            template: require('./idv-nonphoto-birthcert-template.html'),
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

    Controller.$inject = ["contentManagementFactory", "idvFactory"];

    function Controller(contentManagementFactory, idvFactory) {
        var vm = this;

        activate();

        function activate() {

        }

        vm.idv = {};
        vm.idv.birthcert = idvFactory.evDocDetails.birthcert;


        vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
    }

})();
