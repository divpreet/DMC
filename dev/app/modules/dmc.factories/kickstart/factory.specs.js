describe('factories', function() {
	// Load the module, which contains Confirmation-page
	var brandswitchFactory,
		kickstartFactory,
		debitCardFactory,
		scope,
		httpBackend,
		location;
	var testId = '12345';
	var mockPreAuthJson = {
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
	var postAuthSuccess = {
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
	beforeEach(angular.mock.module('dmc.factories'));
	beforeEach(angular.mock.module('angularLoad'));
	beforeEach(inject(function(_$rootScope_, _brandswitchFactory_,_dmcDebitcardapp_,_kickstartFactory_,$injector,_$location_){
		// The injector unwraps the underscores from around the parameter names when matching

		// Generate a new scope
		scope = _$rootScope_.$new();
		// Expose the factory to the tests
		brandswitchFactory = _brandswitchFactory_;
		debitCardFactory = _dmcDebitcardapp_;
		kickstartFactory = _kickstartFactory_;
		location = _$location_;
		httpBackend = $injector.get('$httpBackend');
		spyOn(location, 'host').and.returnValue('ibank.stgeorge.com.au');
		spyOn(location, 'search').and.returnValue({'id':'12345'});
		httpBackend.whenGET(/.*?api\/customer\/fetchCustomerPreAuthData\/12345?.*/g).respond(200,mockPreAuthJson);
		//httpBackend.expectGET(/.*?api\/customer\/fetchCustomerPreAuthData\/12345?.*/g);
		httpBackend.whenPOST(/.*?oregon\/sbgovdc\/api\/authenticate\/v1\/mfagenerate?.*/g).respond(200,mfaGenerate);
		//httpBackend.expectPOST(/.*?oregon\/sbgovdc\/api\/authenticate\/v1\/mfagenerate?.*/g);
		httpBackend.whenPOST(/.*?oregon\/sbgovdc\/api\/authenticate\/v1\/mfavalidate?.*/g).respond(200,mfaValidate);
		httpBackend.whenPOST(/.*?oregon\/sbgovdc\/api\/approve\/ordercard?.*/g).respond(200,postAuthSuccess);
	}));
	describe('kickstart', function() {
		it('should call brandswitchFactory.switchBrandStyling with brand based on the domain URL', inject(function ($q) {
			var deferredSuccess = $q.defer();
			deferredSuccess.resolve();
			spyOn(brandswitchFactory, 'switchBrandStyling').and.returnValue(deferredSuccess.promise);
			kickstartFactory.getAppData();
			scope.$digest();
			expect(brandswitchFactory.switchBrandStyling).toHaveBeenCalledWith('STG');
		}));
		it('should call dmcDebitcardapp.getCustomer with id based on the URL parameters', inject(function ($q) {
			var deferredSuccess = $q.defer();
			var deferredSuccess1 = $q.defer();
			spyOn(brandswitchFactory, 'switchBrandStyling').and.returnValue(deferredSuccess.promise);
			spyOn(debitCardFactory, 'getCustomer').and.returnValue(deferredSuccess1.promise);
			deferredSuccess.resolve();
			deferredSuccess1.resolve();
			kickstartFactory.getAppData();
			scope.$digest();
			expect(debitCardFactory.getCustomer).toHaveBeenCalledWith('12345');
		}));
		it('should set id in debitcard factory', function () {
			kickstartFactory.getAppData();
			expect(debitCardFactory.getId()).toBe("12345");
			scope.$digest();
		});
	});
	describe('brandSwitch Factory', function() {
		it('should resolve brand if brand is passed to switchBrandStyling method', function () {
			brandswitchFactory.switchBrandStyling('BOM');
			scope.$digest();
			expect(brandswitchFactory.selectedBrand).toBe('BOM');
		});
		it('should resolve brand as STG when called without parameter', function () {
			brandswitchFactory.switchBrandStyling();
			scope.$digest();
			expect(brandswitchFactory.selectedBrand).toBe('STG');
		});
	});
	describe('Debitcard Factory', function() {
		it('should set generic error if getCustomer is called without id value', function () {
			debitCardFactory.getCustomer();
			expect(debitCardFactory.isError).toBe("genericError");
			scope.$digest();
		});
		it('should resolve customer details when called with a id', function () {
			debitCardFactory.getCustomer(testId);
			httpBackend.flush();
			expect(debitCardFactory.currentCustomerPreAuthData).not.toBe({});
			expect(debitCardFactory.currentCustomerPreAuthData.customerName).toBe("Westpac");
			scope.$digest();
		});
		it('should set credentialId when mfaGenerate is called and returns a success response and has a valid id',function(){
			var customer = {"contactMasked":"61*******98"};
			debitCardFactory.setId(testId);
			debitCardFactory.mfaGenerate(customer);
			httpBackend.flush();
			expect(debitCardFactory.credentialId).toBe("1234563234354");
		});
		it('should set customer post auth details when mfaValidate is called and returns a success response and has a valid id',function(){
			var customer = {"contactMasked":"61*******98","accessCode":"12345"};
			debitCardFactory.setId(testId);
			debitCardFactory.credentialId = "1234563234354";
			debitCardFactory.mfaValidate(customer);
			httpBackend.flush();
			expect(debitCardFactory.currentCustomerPostAuthData).not.toBe({});
			expect(debitCardFactory.currentCustomerPostAuthData.customerName).toBe("Westpac");
		});
		it('should set current Customer Post Approval Data when submitApprovalRequest is called and returns a success response and has a valid id',function(){
			debitCardFactory.setId(testId);
			debitCardFactory.submitApprovalRequest();
			httpBackend.flush();
			expect(debitCardFactory.currentCustomerPostApprovalData).not.toBe({});
			expect(debitCardFactory.currentCustomerPostApprovalData.customerName).toBe("Westpac");
		});
	});
});