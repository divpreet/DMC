(function appnameIdvNonphotoPensionDirective() {
	'use strict';
	angular.module('appname.common.idv.idvNonphotoPension').directive('appnameIdvNonphotoPension', idvNonphotoPension);

	idvNonphotoPension.$inject = [];

	function idvNonphotoPension() {
		var directive = {
			require: "^appnameIdvLayout",
			restrict: 'EA',
			template: require('./idv-nonphoto-pension-template.html'),
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
		vm.idv.pension = idvFactory.evDocDetails.pension;
		logger.log("vm.idv.pension", vm.idv.pension);

		vm.cmError = contentManagementFactory.createCustomer.validationErrorMsg;

		vm.checkExpiryDate = function () {
			if (vm.idv.pension.noExpiry) {
				vm.idv.pension.expiryDate = undefined;
			}
		};

	}

})();
