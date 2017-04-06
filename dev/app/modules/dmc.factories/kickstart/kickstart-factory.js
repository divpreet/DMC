(function() {
	'use strict';

	angular
		.module('dmc.factories.kickstart', [])
		.factory('kickstartFactory', kickstartFactory);

	kickstartFactory.$inject = ['$q','$location','brandswitchFactory','contentManagementFactory','dmcDebitcardapp'];

	function kickstartFactory($q,$location,brandswitchFactory,cmFactory,dmcDebitcardapp) {
		var service = {
			getAppData: getAppData
		};
		var domain,userHash;
		var brand = "";
		var init;
		function getAppData() {
			var deferred = $q.defer();
			if (!init) {
				domain = $location.host();
				domain = domain.toLowerCase();
				var params = $location.search();
				userHash = params.id;
				var cmDomains = cmFactory.brandDomains;
				for (var key in cmDomains) {
					if (cmDomains.hasOwnProperty(key) && domain.indexOf(cmDomains[key]) > -1) {
						brand = key;
						break;
					}
				}
				//Temporary brand switching for SIT environments
				if(params.brand && cmDomains.hasOwnProperty(params.brand.toUpperCase())){
					brand = params.brand.toUpperCase();
				}
				if(brand == 'WBC'){
					//Dont allow WBC brand
					brand = '';
				}
				dmcDebitcardapp.setId(userHash);
				var promiseList = [];
				promiseList.push(brandswitchFactory.switchBrandStyling(brand));
				promiseList.push(dmcDebitcardapp.getCustomer(userHash));
				$q.all(promiseList).then(function(){
					init = true;
					// resolve the route
					deferred.resolve();
				},function(){
					deferred.resolve();
				});
			}
			return deferred.promise;
		}

		return service;
	}
})();
