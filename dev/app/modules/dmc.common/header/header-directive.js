(function dmcHeaderDirective() {
    'use strict';
    angular.module('dmc.common.header').directive('dmcHeader', Header);

    Header.$inject = [];

    function Header() {
        var directive = {
            restrict: 'EA',
            template: require('./header-template.html'),
            scope: {
                step: "="
            },
            controller: Controller,
            controllerAs: 'vm',
            bindToController: true,
            link: linkFunc
        };

        function linkFunc(scope, el, attr, ctrl) {}

        return directive;
    }

    Controller.$inject = ['brandswitchFactory','userFactory', 'contentManagementFactory'];

    function Controller(brandswitchFactory,userFactory, contentManagementFactory) {
        var vm = this;
        vm.user = userFactory;
        vm.cmLabels = contentManagementFactory.header;
        var brand = brandswitchFactory.selectedBrand || 'STG';
        vm.telephoneNumber = contentManagementFactory.telephoneNumber[brand.toLowerCase()];
        var homePageURLs = contentManagementFactory.brandHomePageURLs;
        vm.homePageURL = homePageURLs[brand.toLowerCase()];
        vm.maintainPreferences = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference]);
        };

        vm.enablePreferences = function () {
            return (vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainPreference] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.maintainRole] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.brandSwap] || vm.user.currentUserDetails.permissions[vm.user.accessBasedOnPermissions.subBrandSwap]);
        };
    }
})();
