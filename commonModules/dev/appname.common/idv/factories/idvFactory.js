(function() {
    'use strict';

    angular
        .module('appname.common.factories.idvFactory', [])
        .factory('idvFactory', IDV);

    IDV.$inject = [];

    /**
     * Customer Model that provides core
     * @returns {{}}
     * @constructor
     */
    function IDV() {
        IDV.idvRefData = {};
        IDV.evDocDetails = {
            aupassport: {},
            aulicence: {},
            otherpassport: {},
            ageproof: {},
            otherlicence: {},
            birthcert: {},
            pension: {},
            govtcard: {},
            marriagecert: {},
            medicare: {},
            utilcard: {}

        };

		IDV.idvConsent = null;

        // IDV.storeIdDoc = function() {
        //     var deferred = $q.defer();
        //
        //     baseRestangularFactory.setDefaultHttpheaders(userFactory.currentUserDetails);
        //     var customerRest = baseRestangularFactory.invokeRESTCall('idvDocs', IDV.createPayLoad(), "POST");
        //     customerRest.then(function(response) {
        //         logger.log("Response from IDV", response);
        //         if (response.status.toLowerCase() === 'success') {
        //             if (response.data && response.data.errors.length === 0) {
        //                 logger.log("IDV success", "IDV success");
        //                 deferred.resolve();
        //             } else {
        //                 deferred.reject();
        //             }
        //         } else {
        //             deferred.reject();
        //         }
        //     }, function(response) {
        //         //deferred.reject();
        //
        //         /* workaround to do account opening for stg to be removed once ce+ sol+ will be up*/
        //         deferred.resolve();
        //     });
        //     return deferred.promise;
        // };

        // IDV.createPayLoad = function() {
        //     var evDocs = IDV.evDocDetails;
        //     var personal = createCustomerFactory.createCustomerDetails;
        //     var payLoad = {
        //         "isEmployeeUpdated": "Y",
        //         "entityType": "INDV",
        //         "verificationStandard": "WBC",
        //         "cisKey": "",
        //         "modId": "",
        //         "roleType": "Customer",
        //         "idvstatus": "",
        //         "entitySubType": "INDV",
        //         "precommencementFlag": "",
        //         "effectiveIDVStatus": "",
        //         "effectiveIDVStandard": "",
        //         "lastName": personal.surname,
        //         "firstName": personal.givenName,
        //         "middleName": "",
        //         "dateOfBirth": formatDate(personal.DateOfBirth),
        //         "soleTraderFlag": "N",
        //         "noABN": "",
        //         "noTradingName": "",
        //         "abn": "",
        //         "businessClassification": "",
        //         "employmentType": personal.employmentType,
        //         "occupation": "8000",
        //         "deprecatedOccupation": false,
        //         "addressIsSameFlag": "",
        //         "disableSoleTraderRadioButton": false,
        //         "residentialStreetAddress": personal.address.addressLine1,
        //         "residentialStreetAddress2": personal.address.addressLine2,
        //         "residentialSuburb": personal.address.city,
        //         "residentialState": personal.address.state,
        //         "residentialPostcode": personal.address.postCode,
        //         "residentialCountryCode": "AU",
        //         "effectiveRecordDummy": false,
        //         "idvidnoverrideTypeCode": "",
        //         "idvexceptionTypeCode": "",
        //         "idvstandard": "WBC",
        //         "idvidnnumber": "",
        //         "idvconductedBy": "",
        //         "idvdetailsRecordKey": "",
        //         "effectiveIDVId": "",
        //         "activeFlag": "",
        //         "externalAgentOrBrokerType": "",
        //         "externalPlannerName": "",
        //         "externalCompanyName": "",
        //         "engagementChannel": "FACE TO FACE",
        //         "externalReferenceNumber": "",
        //         "reIdv": false,
        //         "userId": "",
        //         "addWarningMessage": false,
        //         "documents": [],
        //         "errors": [],
        //         "roId": "     ",
        //         "discrepancyComments": "",
        //         "selectedVerificationStandard": "WBC",
        //         "involvedPartyIdentifiers": [{
        //             "involvedPartyId": createCustomerFactory.cisKey,
        //             "identificationScheme": {
        //                 "identificationScheme": "GHSKey",
        //                 "sourceSystem": "GHS"
        //             }
        //         }, {
        //             "involvedPartyId": createCustomerFactory.cisKey,
        //             "identificationScheme": {
        //                 "identificationScheme": "GCISKey",
        //                 "sourceSystem": null
        //             }
        //         }],
        //         "pOBRDetails": [{
        //             "code": "PB000001"
        //         }],
        //         "sOFDetails": getSofSowList(personal.sourceOfFund),
        //         "sOWDetails": getSofSowList(personal.sourceOfWealth),
        //         "identificationProvided": "FACE TO FACE",
        //         "processConfirmedBy": "Y",
        //         "externalIDVDate": "",
        //         "requestAction": "Save Validate and Identify",
        //         "deIdvReason": "",
        //         "assessmentSubMethod": "ACE"
        //     };
        //     payLoad.documents = [];
        //
        //     if (evDocs.aupassport.selected) {
        //         var aupassport = {
        //             "docTypeCode": "AUSPASSPORT-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.aupassport.radio),
        //             "indIdvDocDateOfIssue": formatDate(evDocs.aupassport.issueDate),
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.aupassport.expiryDate),
        //             "indIdvDocRefNum": evDocs.aupassport.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //         payLoad.documents.push(aupassport);
        //     }
        //     if (evDocs.otherpassport.selected) {
        //         var otherpassport = {
        //             "docTypeCode": "FOREIGNPASSPORT-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.otherpassport.radio),
        //             "indIdvDocIssuerCode": evDocs.otherpassport.country,
        //             "indIdvDocDateOfIssue": formatDate(evDocs.otherpassport.issueDate),
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.otherpassport.expiryDate),
        //             "indIdvDocRefNum": evDocs.otherpassport.number,
        //             "indIdvDocAccreditedEnglishTranslationFlg": evDocs.otherpassport.translateConsent ? "Y" : "N",
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocIssuerCode",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocAccreditedEnglishTranslationFlg",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //         payLoad.documents.push(otherpassport);
        //     }
        //     if (evDocs.aulicence.selected) {
        //         var aulicence = {
        //             "docTypeCode": "LICENCEDRIVER-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.aulicence.radio),
        //             "indIdvDocIssuerCode": evDocs.aulicence.state,
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.aulicence.expiryDate),
        //             "indIdvDocRefNum": evDocs.aulicence.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocIssuerCode",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(aulicence);
        //     }
        //     if (evDocs.ageproof.selected) {
        //         var ageOfProof = {
        //             "docTypeCode": "18PLUS-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.ageproof.radio),
        //             "indIdvDocIssuerCode": evDocs.ageproof.state,
        //             "indIdvDocRefNum": evDocs.ageproof.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocIssuerCode",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(ageOfProof);
        //     }
        //     if (evDocs.otherlicence.selected) {
        //         var otherlicence = {
        //             "docTypeCode": "LICENSEDRIVERFRGN-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.otherlicence.radio),
        //             "indIdvDocIssuerCode": evDocs.otherlicence.country,
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.otherlicence.expiryDate),
        //             "indIdvDocNoExpiryDateFlg": evDocs.otherlicence.noExpiry ? "Y" : "N",
        //             "indIdvDocDateOfIssue": formatDate(evDocs.otherlicence.issueDate),
        //             "indIdvDocRefNum": evDocs.otherlicence.number,
        //             "indIdvDocAccreditedEnglishTranslationFlg": evDocs.otherlicence.translateConsent ? "Y" : "N",
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocIssuerCode",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocNoExpiryDateFlg",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocAccreditedEnglishTranslationFlg",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(otherlicence);
        //     }
        //     if (evDocs.birthcert.selected) {
        //         var birthcert = {
        //             "docTypeCode": "BIRTHCERTAUS-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.birthcert.radio),
        //             "indIdvDocRefNum": evDocs.birthcert.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(birthcert);
        //     }
        //     if (evDocs.pension.selected) {
        //         var pension = {
        //             "docTypeCode": "PENSIONCARDCLINK-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.pension.radio),
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.pension.expiryDate),
        //             "indIdvDocNoExpiryDateFlg": evDocs.pension.noExpiry ? "Y" : "N",
        //             "indIdvDocDateOfIssue": formatDate(evDocs.pension.issueDate),
        //             "indIdvDocRefNum": evDocs.pension.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocNoExpiryDateFlg",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(pension);
        //     }
        //     if (evDocs.medicare.selected) {
        //         var medicare = {
        //             "docTypeCode": "MEDICARE-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.medicare.radio),
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.medicare.expiryDate),
        //             "indIdvDocRefNum": evDocs.medicare.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(medicare);
        //     }
        //     if (evDocs.marriagecert.selected) {
        //         var marriagecert = {
        //             "docTypeCode": "MARRIAGECERT-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.marriagecert.radio),
        //             "indIdvDocDateOfIssue": formatDate(evDocs.marriagecert.issueDate),
        //             "indIdvDocRefNum": evDocs.marriagecert.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(marriagecert);
        //     }
        //     if (evDocs.govtcard.selected) {
        //         var govtcard = {
        //             "docTypeCode": "CARDUNDERLAW-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.govtcard.radio),
        //             "indIdvDocIssuer": evDocs.govtcard.issuedBy,
        //             "indIdvDocDateOfIssue": formatDate(evDocs.govtcard.issueDate),
        //             "indIdvDocDateOfExpiry": formatDate(evDocs.govtcard.expiryDate),
        //             "indIdvDocRefNum": evDocs.govtcard.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocIssuer",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocDateOfExpiry",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(govtcard);
        //     }
        //     if (evDocs.utilcard.selected) {
        //         var utilcard = {
        //             "docTypeCode": "UTILNOTICE-WBC",
        //             "indIdvDocVerifiedFrom": getYorN(evDocs.utilcard.radio),
        //             "indIdvDocIssuer": evDocs.utilcard.issuedBy,
        //             "indIdvDocDateOfIssue": formatDate(evDocs.utilcard.issueDate),
        //             "indIdvDocRefNum": evDocs.utilcard.number,
        //             "fieldNames": ["indIdvDocVerifiedFrom",
        //                 "indIdvDocIssuer",
        //                 "indIdvDocDateOfIssue",
        //                 "indIdvDocRefNum",
        //                 "indIdvDocSearchDetails"
        //             ]
        //         };
        //
        //         payLoad.documents.push(utilcard);
        //     }
        //
        //     // setting occupation code for under 15
        //     if (personal.under15) {
        //         payLoad.occupation = "6200";
        //     }
        //
        //
        //     return payLoad;
        // };

        // function formatDate(date) {
        //     if (brandconfigFactory.getBrandConfig().code === 'WBC') {
        //         return date;
        //     }
        //     if (date) {
        //         return date.split('/').reverse().join('-');
        //     }
        // }

        function getYorN(value) {
            var data = "Y";
            if (value.toLowerCase() === "no") {
                data = "N";
            }
            return data;
        }

        // function getSofSowList(list) {
        //     var expectedList = [];
        //     for (var i = 0; i < list.length; i++) {
        //         var temp = {
        //             "code": list[i].value
        //         };
        //         if (brandconfigFactory.getBrandConfig().code === 'WBC') {
        //             expectedList.push(list[i].value);
        //         } else {
        //             expectedList.push(temp);
        //         }
        //     }
        //     return expectedList;
        // }

        return IDV;
    }


})();
