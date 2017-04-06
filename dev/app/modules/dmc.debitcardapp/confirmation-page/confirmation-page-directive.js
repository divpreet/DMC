(function dmcConfirmationPageDirective() {
	'use strict';
	angular.module('dmc.debitcardapp.confirmationPage').directive('dmcConfirmationPage', confirmationPage);

	confirmationPage.$inject = [];

	function confirmationPage() {
		var directive = {
			restrict: 'EA',
			template: require('./confirmation-page-template.html'),
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

	Controller.$inject = ['$scope', 'brandswitchFactory', '$state', 'dmcDebitcardapp', 'coreGenericFactory','contentManagementFactory','$anchorScroll'];

	function Controller($scope, brandswitchFactory, $state, debitcardapp, coreGenericFactory,contentManagementFactory,$anchorScroll) {
		var vm = this;
		if(!debitcardapp.currentCustomerPostApprovalData || !debitcardapp.currentCustomerPostApprovalData.customerName){
			$state.go('home.sorryPage');
		}
		var brand = brandswitchFactory.selectedBrand || 'STG';
		$anchorScroll();
		// get the username from the userFactory
		// We are getting the user data during the resolve of the base route
		// so the user factory is already populated

		//vm.firstName = userFactory.current.userName;
		$scope.brandName = contentManagementFactory.brandName[brand.toLowerCase()];
		$scope.telephoneNumber = contentManagementFactory.telephoneNumber[brand.toLowerCase()];
		var homePageURLs = contentManagementFactory.brandHomePageURLs;
		$scope.homePageURL = homePageURLs[brand.toLowerCase()];
		vm.isLocal = coreGenericFactory.isLocal();
		vm.customer = {};
		vm.customer.firstName = debitcardapp.currentCustomerPostApprovalData.customerName;
		vm.customer.nameOnCard = debitcardapp.currentCustomerPostApprovalData.businessName;
		vm.customer.address = debitcardapp.currentCustomerPostApprovalData.deliveryAddress;
		vm.customer.userEmail = debitcardapp.currentCustomerPostApprovalData.email;

	}

})();
