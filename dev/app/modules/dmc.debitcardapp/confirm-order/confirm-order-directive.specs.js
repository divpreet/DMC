describe('dmc.debitcardapp', function() {
	var httpBackend,
		$compile,$rootScope,debitCardFactory,controller;
	beforeEach(module('ui.router'));
	beforeEach(module('dmc.factories'));
	beforeEach(module('angularLoad'));
	// Load the module, which contains Confirm-order
	beforeEach(angular.mock.module('dmc.debitcardapp'));
	var customerPostAuthData = {
		"status": "Success",
		"customerDetails": {
			"customerName": "Westpac",
			"accountHolderName": "Westpac Inc",
			"accountType": "Business Freedom Account",
			"accountOpenDate": "01/01/2017",
			"mobileNumber": "61*******98",
			"bsb": "123-456",
			"accountNumber": "12345678",
			"businessName": "Westpac Inc",
			"deliveryAddress": "10 Crown St. REDFERN NSW 2000"
		}
	};
	var mockApproveCard = {
		"code": 200,
		"status": "Success",
		"customerDetails": {
			"status": "Success",
			"customerName": "Westpac",
			"email" : "andrew.smith@gmail.com",
			"deliveryAddress" : "10 Crown St. REDFERN NSW 2000"
		}
	};
	var mockApproveCardFailure = {
		"status": "Failure",
		"reasonCode": "SYSTEM_ERROR"
	};
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$rootScope_, $controller, $injector,_$compile_,_dmcDebitcardapp_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		httpBackend = $injector.get('$httpBackend');
		debitCardFactory = _dmcDebitcardapp_;
		debitCardFactory.currentCustomerPostAuthData = customerPostAuthData.customerDetails;
		var elem = $compile('<dmc-confirm-order></dmc-confirm-order>')($rootScope);
		controller = elem.controller('dmcConfirmOrder');
		//httpBackend.expectPOST(/.*?oregon\/sbgovdc\/api\/approve\/ordercard?.*/g);
	}));


	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
	});

	describe('confirm order directive',function(){
		it('should go to confirmation page if approval success',inject(function($state){
			httpBackend.whenPOST(/.*?oregon\/sbgovdc\/api\/approve\/ordercard?.*/g).respond(200,mockApproveCard);
			spyOn($state,'go').and.callFake(function(state, params) {
				// This replaces the 'go' functionality for the duration of your test
			});
			controller.navigateToConfirmation();
			httpBackend.flush();
			expect($state.go).toHaveBeenCalledWith('home.confirmation');
		}));
		it('should go to sorry page if approval failure',inject(function($state){
			httpBackend.whenPOST(/.*?oregon\/sbgovdc\/api\/approve\/ordercard?.*/g).respond(200,mockApproveCardFailure);
			spyOn($state,'go').and.callFake(function(state, params) {
				// This replaces the 'go' functionality for the duration of your test
			});
			controller.navigateToConfirmation();
			httpBackend.flush();
			expect($state.go).toHaveBeenCalledWith('home.sorryPage');
		}));
		it('should go to sorry page if approval service down',inject(function($state){
			httpBackend.expectPOST(/.*?oregon\/sbgovdc\/api\/approve\/ordercard?.*/g).respond(500,{});
			spyOn($state,'go').and.callFake(function(state, params) {
				// This replaces the 'go' functionality for the duration of your test
			});
			controller.navigateToConfirmation();
			httpBackend.flush();
			expect($state.go).toHaveBeenCalledWith('home.sorryPage');
		}));
		it('should have first name', function() {
			expect(controller.customer.firstName).toBe("Westpac");
		});

		it('should have account holder name', function() {
			expect(controller.customer.accountHolderName).toBe("Westpac Inc");
		});

		it('should have masked contact', function() {
			expect(controller.customer.contactMasked).toBe("61*******98");
		});

		it('should have account type', function() {
			expect(controller.customer.accountType).toBe("Business Freedom Account");
		});

		it('should have account opening date', function() {
			expect(controller.customer.accountOpenDate).toBe("01/01/2017");
		});

		it('should have account bsb', function() {
			expect(controller.customer.accountBsb).toBe("123-456");
		});

		it('should have account number', function() {
			expect(controller.customer.accountNumber).toBe("12345678");
		});

		it('should have Name on card', function() {
			expect(controller.customer.nameOnCard).toBe("Westpac Inc");
		});

		it('should have address', function() {
			expect(controller.customer.address).toBe("10 Crown St. REDFERN NSW 2000");
		});

	});

});
