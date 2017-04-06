describe('dmc.debitcardapp', function() {
	var $compile,
		$rootScope,httpBackend,controller,debitCardFactory;

	// Load the module, which contains Landing-page
	beforeEach(module('ui.router'));
	beforeEach(module('dmc.factories'));
	beforeEach(module('angularLoad'));
	beforeEach(angular.mock.module('dmc.debitcardapp'));

	var currentCustomerPreAuthData = {
		"status": "Success",
		"customerDetails": {
			"customerName": "Westpac",
			"accountHolderName": "Westpac Inc",
			"accountType": "Everyday Banking",
			"accountOpenDate": "01/01/2017",
			"mobileNumber": "61*******98"
		}
	};
	var mfaGenerate = {
		"status": "success",
		"noofattempts": "1",
		"credentialId": "1234563234354"
	};
	var mfaValidate = {
		"status": "Success",
		"customerDetails": {
			"customerName": "Westpac",
			"accountHolderName": "Westpac Inc",
			"accountType": "Everyday Banking",
			"accountOpenDate": "01/01/2017",
			"mobileNumber": "61*******98",
			"bsb": "123-456",
			"accountNumber": "12345678",
			"businessName": "Westpac Inc",
			"deliveryAddress": "10 Crown St. REDFERN NSW 2000"
		}
	};
	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_,$injector,_dmcDebitcardapp_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		httpBackend = $injector.get('$httpBackend');
		debitCardFactory = _dmcDebitcardapp_;
		debitCardFactory.setId('12345');
		debitCardFactory.currentCustomerPreAuthData = currentCustomerPreAuthData.customerDetails;
		var elem = $compile('<dmc-landing-page></dmc-landing-page>')($rootScope);
		controller = elem.controller('dmcLandingPage');
	}));



	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
	});

	describe('landing page directive',function(){
		it('should go to confirmation page if approval success',inject(function($state){
			spyOn($state,'go').and.callFake(function(state, params) {
				// This replaces the 'go' functionality for the duration of your test
			});
			controller.navigateToConfirmOrder();
			expect($state.go).toHaveBeenCalledWith('home.confirmOrder');
		}));
		it('should invoke MFA Generate service when sendAccessCode method is invoked',inject(function($q){
			var deferred = $q.defer();
			deferred.resolve(mfaGenerate);
			spyOn(debitCardFactory,'mfaGenerate').and.returnValue(deferred.promise);
			controller.sendAccessCode();
			$rootScope.$digest();
			expect(debitCardFactory.mfaGenerate).toHaveBeenCalled();
		}));
		it('should invoke MFA validate service and go to confirm Order page when verifyAccessCode method is invoked',inject(function($q,$state){
			var deferred = $q.defer();
			deferred.resolve(mfaValidate);
			spyOn($state,'go').and.callFake(function(state, params) {
				// This replaces the 'go' functionality for the duration of your test
			});
			controller.customer.accessCode = "12345";
			spyOn(debitCardFactory,'mfaValidate').and.returnValue(deferred.promise);
			controller.verifyAccessCode();
			$rootScope.$digest();
			expect(debitCardFactory.mfaValidate).toHaveBeenCalled();
			expect($state.go).toHaveBeenCalledWith('home.confirmOrder');
		}));


		it('should have customerName not empty', function() {
			expect(controller.customer.firstName).toBe("Westpac");
		});

		it('should have accountHolderName not empty', function() {
			expect(controller.customer.accountHolderName).toBe("Westpac Inc");
		});

		it('should have accountType not empty', function() {
			expect(controller.customer.accountType).toBe("Everyday Banking");
		});

		it('should have accountOpenDate not empty', function() {
			expect(controller.customer.accountOpenDate).toBe("01/01/2017");
		});

		it('should have mobileNumber not empty', function() {
			expect(controller.customer.contactMasked).toBe("61*******98");
		});

	});

});
