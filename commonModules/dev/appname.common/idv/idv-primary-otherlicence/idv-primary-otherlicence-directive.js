(function appnameIdvPrimaryOtherlicenceDirective() {
	'use strict';
	angular.module('appname.common.idv.idvPrimaryOtherlicence').directive('appnameIdvPrimaryOtherlicence', idvPrimaryOtherlicence);

	idvPrimaryOtherlicence.$inject = [];

	function idvPrimaryOtherlicence() {
		var directive = {
			require: "^appnameIdvLayout",
			restrict: 'EA',
			template: require('./idv-primary-otherlicence-template.html'),
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

		vm.idv = {};
		vm.idv.otherlicence = idvFactory.evDocDetails.otherlicence;
		logger.log("vm.idv.otherlicence", vm.idv.otherlicence);

		vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;
		vm.countryList = referenceDataFactory.IDV.countries;

		vm.checkExpiryDate = function () {
			if (vm.idv.otherlicence.noExpiry) {
				vm.idv.otherlicence.expiryDate = undefined;
			}
		};
	}

})();
