describe('dmc.debitcardapp', function() {
	var $compile,
	$rootScope,httpBackend,controller;
	beforeEach(module('ui.router'));
	beforeEach(module('dmc.factories'));
	beforeEach(module('angularLoad'));

	// Load the module, which contains Confirmation-page
	beforeEach(angular.mock.module('dmc.debitcardapp'));
	var currentCustomerPostApprovalData = {
		"status": "Success",
		"customerDetails": {
			"customerName": "Westpac",
			"email": "andrew.smith@gmail.com",
			"deliveryAddress": "10 Crown St. REDFERN NSW 2000"
		}
	};
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$rootScope_, $controller, $injector,_$compile_,dmcDebitcardapp){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		httpBackend = $injector.get('$httpBackend');
		dmcDebitcardapp.currentCustomerPostApprovalData = currentCustomerPostApprovalData.customerDetails;
		var node = $compile('<dmc-confirmation-page></dmc-confirmation-page>')($rootScope);
		controller = node.controller('dmcConfirmationPage');
	}));
	afterEach(function() {
		//httpBackend.verifyNoOutstandingExpectation();
	});

	// example nested describe
	describe('Confirmation page', function() {


		it('should have customerName as not empty', function() {
			expect(controller.customer.firstName).toBe("Westpac");
		});

		it('should have email as not empty', function() {
			expect(controller.customer.userEmail).toBe("andrew.smith@gmail.com");
		});

		it('should have  deliveryAddress not empty', function() {
			expect(controller.customer.address).toBe("10 Crown St. REDFERN NSW 2000");
		});
	});

});
