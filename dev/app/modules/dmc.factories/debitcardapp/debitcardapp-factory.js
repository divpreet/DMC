(function dmcDebitcardappFactory() {
	'use strict';

	angular.module('dmc.factories.debitcardapp',[]).factory('dmcDebitcardapp', debitcardapp);
	debitcardapp.$inject = ['$q','baseRestangularFactory', 'coreGenericFactory'];

	function debitcardapp($q,baseRestangularFactory,coreGenericFactory) {
		debitcardapp.isError = "";
		debitcardapp.credentialId = "";
		debitcardapp.userId = "";
		debitcardapp.currentCustomerPreAuthData = {};
		debitcardapp.currentCustomerPostAuthData = {};

		debitcardapp.setId = function (userHash) {
			debitcardapp.userId = userHash;
		};
		debitcardapp.getId = function (){
			return debitcardapp.userId;
		};

		debitcardapp.getCustomer = function (userHash) {
			var deferred = $q.defer();
			debitcardapp.isError = "";
			var isLocal = coreGenericFactory.isLocal();
			if(!userHash){
				debitcardapp.isError = "genericError";
				deferred.resolve();
			}else {
				var userRest = baseRestangularFactory.fetchAll('fetchCustomerData');
				var resp = userRest.customGET(isLocal? "" : userHash);
				resp.then(function (response) {
					if(response) {
						if (response.status && response.status.toLowerCase() === 'success') {
							debitcardapp.currentCustomerPreAuthData = response.customerDetails;
							deferred.resolve();
						} else if (response.failureReasonCode == 'INVALID_LINK') {
							debitcardapp.isError = "linkExpiredMsg";
							deferred.resolve();

						} else if (response.failureReasonCode == 'EXPIRED_LINK') {
							debitcardapp.isError = "linkExpiredMsg";
							deferred.resolve();

						} else if (response.failureReasonCode == 'AUTHENTICATION_FAILED_LINK') {
							debitcardapp.isError = "tooManySMSMsg";
							deferred.resolve();

						} else {
							debitcardapp.isError = "genericError";
							deferred.resolve();
						}
					}else{
						debitcardapp.isError = "genericError";
						deferred.resolve();
					}
				}, function () {
					debitcardapp.isError = "genericError";
					deferred.resolve();
				});
			}
			return deferred.promise;
		};

		debitcardapp.mfaGenerate = function (customer) {
			var deferred = $q.defer();
			var userRest = baseRestangularFactory.fetchAll('mfaGenerate');
			var payload = createPayloadForMFAGenerate(customer);
			var resp = userRest.customPOST(payload);
			debitcardapp.isError = "";
			resp.then(function (response) {
				if(response) {
					if (response.status && response.status.toLowerCase() === 'success') {
						debitcardapp.credentialId = response.credentialId;
						deferred.resolve(response);
					} else {
						debitcardapp.isError = "genericError";
						deferred.resolve(response);
					}
				}else{
					debitcardapp.isError = "genericError";
					deferred.reject();
				}
			}, function () {
				debitcardapp.isError = "genericError";
				deferred.reject();
			});
			return deferred.promise;
		};

		debitcardapp.mfaValidate = function (customer) {
			var deferred = $q.defer();
			var userRest = baseRestangularFactory.fetchAll('mfaValidate');
			var payload = createPayloadForMFAValidate(customer);
			var resp = userRest.customPOST(payload);
			debitcardapp.isError = "";
			resp.then(function (response) {
				if(response) {
					if (response.status && response.status.toLowerCase() === 'success') {
						debitcardapp.currentCustomerPostAuthData = response.customerDetails;
						deferred.resolve(response);
					} else if (response.errorDetails && response.errorDetails.code) {
						//debitcardapp.isError = "genericError";
						deferred.resolve(response);
					} else {
						//debitcardapp.isError = "genericError";
						deferred.resolve(response);
					}
				}else{
					debitcardapp.isError = "genericError";
					deferred.reject();
				}
			}, function () {
				debitcardapp.isError = "genericError";
				deferred.reject();
			});
			return deferred.promise;
		};

		debitcardapp.submitApprovalRequest = function () {
			var deferred = $q.defer();
			var userRest = baseRestangularFactory.fetchAll('approveCardRequest');
			var payload = { "requestId" : debitcardapp.getId() };
			var resp = userRest.customPOST(payload);
			debitcardapp.isError = "";
			resp.then(function (response) {
				if(response) {
					if (response.status && response.status.toLowerCase() === 'success') {
						debitcardapp.currentCustomerPostApprovalData = response.customerDetails;
						/*baseRestangularFactory.setDefaultHttpheaders(response.data);*/
						deferred.resolve(response);
					} else {
						debitcardapp.isError = "genericError";
						deferred.resolve(response);
					}
				}else{
					debitcardapp.isError = "genericError";
					deferred.reject();
				}
			}, function () {
				debitcardapp.isError = "genericError";
				deferred.reject();
			});
			return deferred.promise;
		};

		function createPayloadForMFAGenerate(customer){
			var payload = {};
			payload.requestId = debitcardapp.getId();
			payload.requestAction = "GENERATE";
			payload.credentialId = debitcardapp.credentialId;
			payload.accessCode = customer.accessCode;
			return payload;
		}

		function createPayloadForMFAValidate(customer){
			var payload = {};
			payload.requestId = debitcardapp.getId();
			payload.requestAction = "VALIDATE";
			payload.credentialId = debitcardapp.credentialId;
			payload.accessCode = customer.accessCode;
			return payload;
		}

		return debitcardapp;
	}

})();
