(function dmcConfirmOrderDirective() {
	'use strict';
	angular.module('dmc.debitcardapp.confirmOrder').directive('dmcConfirmOrder', confirmOrder);

	confirmOrder.$inject = [];

	function confirmOrder() {
		var directive = {
			restrict: 'EA',
			template: require('./confirm-order-template.html'),
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

	Controller.$inject = ['$scope', '$state', 'brandswitchFactory', 'dmcDebitcardapp', 'coreGenericFactory',
		'contentManagementFactory','$anchorScroll','$window'];

	function Controller($scope, $state, brandswitchFactory, debitcardapp, coreGenericFactory,
	                    contentManagementFactory,$anchorScroll,$window) {
		$anchorScroll();
		if(!debitcardapp.currentCustomerPostAuthData || !debitcardapp.currentCustomerPostAuthData.customerName){
			$state.go('home.sorryPage');
		}
		var vm = this;
		var brand = brandswitchFactory.selectedBrand || 'STG';
		vm.disableProceed = false;
		$scope.telephoneNumber = contentManagementFactory.telephoneNumber[brand.toLowerCase()];
		vm.cancelModalHeader = "Are you sure?";
		vm.cancelModalBody = "This will discontinue the card ordering process. You can proceed again later using the same link from your email.";
		// get the username from the userFactory
		// We are getting the user data during the resolve of the base route
		// so the user factory is already populated

		//vm.firstName = userFactory.current.userName;
		$scope.brandName = contentManagementFactory.brandName[brand.toLowerCase()];
		vm.isLocal = coreGenericFactory.isLocal();
		vm.customer = {};
		vm.cancelModal = false;
		vm.customer.firstName = debitcardapp.currentCustomerPostAuthData.customerName;
		vm.customer.accountHolderName = debitcardapp.currentCustomerPostAuthData.accountHolderName;
		vm.customer.contactMasked = debitcardapp.currentCustomerPostAuthData.mobileNumber;
		vm.customer.accountType = debitcardapp.currentCustomerPostAuthData.accountType;
		vm.customer.accountOpenDate = debitcardapp.currentCustomerPostAuthData.accountOpenDate;
		vm.customer.accountBsb = debitcardapp.currentCustomerPostAuthData.bsb;
		vm.customer.accountNumber = debitcardapp.currentCustomerPostAuthData.accountNumber;
		vm.customer.nameOnCard = debitcardapp.currentCustomerPostAuthData.businessName;
		vm.customer.address = debitcardapp.currentCustomerPostAuthData.deliveryAddress;

		if(!vm.customer.address){
			vm.disableProceed = true;
		}
		var tcURLs = contentManagementFactory.tcURLs;
		var brandTCURLs = tcURLs[brand.toLowerCase()];
		var homePageURLs = contentManagementFactory.brandHomePageURLs;
		$scope.homePageURL = homePageURLs[brand.toLowerCase()];
		if(vm.customer.accountType) {
			$scope.tcURL = brandTCURLs[vm.customer.accountType.toLowerCase()];
		}

		vm.navigateToConfirmation = function(){
			vm.isLoading = true;
			debitcardapp.isError = "";
			debitcardapp.submitApprovalRequest().then(function (response){
				vm.isLoading = false;
				if(response.status && response.status.toLowerCase() == "success"){
					$state.go('home.confirmation');
				}else{
					debitcardapp.isError = "genericError";
					$state.go('home.sorryPage');
				}
			},function(){
				debitcardapp.isError = "genericError";
				$state.go('home.sorryPage');
			});
		};

		vm.cancelOrder = function(){
			vm.cancelModal = true;
		};
		vm.cancelFlow = function(){
			$window.location.href = $scope.homePageURL;
		};
	}

})();
