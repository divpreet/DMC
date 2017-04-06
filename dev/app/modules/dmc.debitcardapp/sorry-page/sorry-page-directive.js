(function dmcSorryPageDirective() {
	'use strict';
	angular.module('dmc.debitcardapp.sorryPage').directive('dmcSorryPage', sorryPage);

	sorryPage.$inject = [];

	function sorryPage() {
		var directive = {
			restrict: 'EA',
			template: require('./sorry-page-template.html'),
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

	Controller.$inject = ['$scope', 'brandswitchFactory', 'contentManagementFactory','$anchorScroll','dmcDebitcardapp'];

	function Controller($scope, brandswitchFactory, contentManagementFactory,$anchorScroll,debitcardapp) {
		var vm = this;
		var brand = brandswitchFactory.selectedBrand || 'STG';
		$anchorScroll();
		var homePageURLs = contentManagementFactory.brandHomePageURLs;
		$scope.homePageURL = homePageURLs[brand.toLowerCase()];
		$scope.brandName = contentManagementFactory.brandName[brand.toLowerCase()];
		$scope.telephoneNumber = contentManagementFactory.telephoneNumber[brand.toLowerCase()];
		$scope.branchLocatorLink = contentManagementFactory.branchLocatorLinks[brand.toLowerCase()];
		var errorMessageMap = {
			"genericError": "We seem to be experiencing problems and could not process your details.",
			"linkExpiredMsg": "Your Business Visa Debit Card approval link is no longer available.",
			"tooManySMSMsg" : "You cannot request a new SMS verification code as you have already exceeded the maximum number of requests."
		};
		var errorCode = (debitcardapp.isError && debitcardapp.isError in errorMessageMap) ? debitcardapp.isError : "genericError";
		vm.errorMsg = errorMessageMap[errorCode];
		debitcardapp.isError = "";
	}

})();
