(function appnameIdvAccordionDirective() {
    'use strict';
    angular.module('appname.common.idv.idvAccordion').directive('appnameIdvAccordion', idvAccordion);

    idvAccordion.$inject = [];

    function idvAccordion() {
        var directive = {
            restrict: 'EA',
            template: require('./idv-accordion-template.html'),
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
            scope.message = 'Welcome';
        }
    }

    Controller.$inject = ['idvFactory'];

    function Controller(idvFactory) {
        var vm = this;

        activate();

        function activate() {
            // var hasNonPhoto = false;
            // if (!idvFactory.evDocDetails.aupassport.number && !idvFactory.evDocDetails.aulicence.number &&
            //     !idvFactory.evDocDetails.otherpassport.number && !idvFactory.evDocDetails.ageproof.number && !idvFactory.evDocDetails.otherlicence.number) {
            //
            //     if (idvFactory.evDocDetails.birthcert.number || idvFactory.evDocDetails.birthcert.number) {
            //         resetTabs();
            //         hasNonPhoto = true;
            //         angular.element('#nonprimaryHeader').addClass('is-active');
            //         angular.element('#nonprimaryContent').addClass('is-open');
            //     }
            //
            //     if (!hasNonPhoto && (idvFactory.evDocDetails.utilcard.number || idvFactory.evDocDetails.govtcard.number || idvFactory.evDocDetails.marriagecert.number || idvFactory.evDocDetails.medicare.number)) {
            //         resetTabs();
            //         angular.element('#secondaryHeader').addClass('is-active');
            //         angular.element('#secondaryContent').addClass('is-open');
            //     }
            // }
            vm.idv = idvFactory.evDocDetails;
        }



        function resetTabs() {
            angular.element('#primaryHeader').removeClass('is-active');
            angular.element('#nonprimaryHeader').removeClass('is-active');
            angular.element('#secondaryHeader').removeClass('is-active');
            angular.element('#primaryContent').removeClass('is-open');
            angular.element('#nonprimaryContent').removeClass('is-open');
            angular.element('#secondaryContent').removeClass('is-open');
        }

        vm.toggleTabs = function(target, tabId) {
            resetTabs();
            // logger.log("IDV Accordion", target, tabId);
            angular.element('#' + tabId).addClass('is-active');
            angular.element('#' + target).addClass('is-open');
        };
    }

})();
