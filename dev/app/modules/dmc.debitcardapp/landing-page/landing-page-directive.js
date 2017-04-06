(function dmcLandingPageDirective() {
	'use strict';
	angular.module('dmc.debitcardapp.landingPage').directive('dmcLandingPage', landingPage);

	landingPage.$inject = [];

	function landingPage() {
		var directive = {
			restrict: 'EA',
			template: require('./landing-page-template.html'),
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

	Controller.$inject = [ '$scope','$state','brandswitchFactory','coreGenericFactory','$anchorScroll','dmcDebitcardapp','contentManagementFactory'];

	function Controller( $scope, $state, brandswitchFactory, coreGenericFactory,$anchorScroll,debitcardapp,contentManagementFactory) {
		var vm = this;
		var brand = brandswitchFactory.selectedBrand || 'STG';
		$anchorScroll();
		if(!debitcardapp.getId() || debitcardapp.isError){
			$state.go('home.sorryPage');
		}
		$scope.telephoneNumber = contentManagementFactory.telephoneNumber[brand.toLowerCase()];
		vm.isLoading = false;
		vm.isLoaded = false;
		vm.isCodeVerified = false;
		vm.isCodeIncorrect = false;
		vm.accessCodeCounter = 0;
		vm.accessValidateCounter = 0;
		vm.isVerifying = false;
		vm.isExpired = false;
		// get the username from the userFactory
		// We are getting the user data during the resolve of the base route
		// so the user factory is already populated

		//vm.firstName = userFactory.current.userName;
		vm.isLocal = coreGenericFactory.isLocal();
		vm.customer = {};
		vm.customer.accessCode = "";
		vm.customer.firstName = debitcardapp.currentCustomerPreAuthData.customerName;
		vm.customer.accountHolderName = debitcardapp.currentCustomerPreAuthData.accountHolderName;
		vm.customer.contactMasked = debitcardapp.currentCustomerPreAuthData.mobileNumber;
		vm.customer.accountType = debitcardapp.currentCustomerPreAuthData.accountType;
		vm.customer.accountOpenDate = debitcardapp.currentCustomerPreAuthData.accountOpenDate;
			/*demoFactory.fetchDemoList().then(function(){

				vm.user = demoFactory.demoList;
				vm.firstName = vm.user.userName;
				vm.contact = vm.user.phoneNo;
				vm.contactMasked = vm.contact.substring(0,2)+"XX XXX X"+ vm.contact.substring(8,10);

			},
			function(){
				console.log("error");
			});*/


		vm.sendAccessCode = function (){
			debitcardapp.isError = "";
			vm.isExpired = false;
			vm.isCodeIncorrect = false;
			vm.customer.accessCode = "";
			if(vm.accessCodeCounter >= 3){
				debitcardapp.isError = "tooManySMSMsg";
				$state.go('home.sorryPage');
			}
			vm.isLoading = true;
			vm.isLoaded = false;
			vm.accessValidateCounter = 0;
			debitcardapp.mfaGenerate(vm.customer).then(function (response){
				if(response.status && response.status.toLowerCase() == "success"){
					vm.accessCodeCounter = response.noofattempts;
				}
				vm.isLoading = false;
				vm.isLoaded = true;
			},function(){
				debitcardapp.isError = "genericError";
				$state.go('home.sorryPage');
			});
		};
		vm.verifyAccessCode = function (){
			vm.isCodeIncorrect = false;
			debitcardapp.isError = "";
			if(!vm.customer.accessCode){
				vm.isCodeIncorrect = true;
			}else {
				vm.isExpired = false;
				vm.isVerifying = true;
				debitcardapp.mfaValidate(vm.customer).then(function (response) {
					vm.isVerifying = false;
					if (response.status && response.status.toLowerCase() == "success") {
						vm.isCodeVerified = true;
						vm.navigateToConfirmOrder();
					} else {
						vm.accessValidateCounter++;
						vm.isCodeIncorrect = true;
						if(vm.accessValidateCounter >= 3){
							vm.isExpired = true;
						}
					}
				}, function () {
					debitcardapp.isError = "genericError";
					$state.go('home.sorryPage');
				});
			}
		};
		vm.displaySMSButtonOrMsg = function (){
			if(vm.isLoading){
				return 'displayLoader';
			}else if(vm.isLoaded){
				return 'displayMessage';
			}else if(!vm.isLoaded){
				return 'displayButton';
			}
		};
		vm.navigateToConfirmOrder = function(){
			$state.go('home.confirmOrder');
		};
	}

})();
