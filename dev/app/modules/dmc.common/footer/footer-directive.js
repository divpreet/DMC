(function dmcFooterDirective() {
    'use strict';
    angular.module('dmc.common.footer').directive('dmcFooter', Footer);

    Footer.$inject = ['contentManagementFactory','brandswitchFactory'];

    function Footer(contentManagementFactory,brandswitchFactory) {
        var directive = {
            restrict: 'EA',
            template: require('./footer-template.html'),
            scope: {
                brand: '='
            },
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
            scope.cmLabels = contentManagementFactory.footer;
            scope.brand = brandswitchFactory.selectedBrand || 'STG';
            scope.securityInfoURL = contentManagementFactory.infoSecurity[scope.brand.toLowerCase()];
        }
    }

})();
