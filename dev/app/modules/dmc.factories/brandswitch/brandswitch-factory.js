/**
* Brandswitch Model to fetch the Brandswitch details.
*/
(function () {
	'use strict';

	angular.module('dmc.factories.brandswitch', []).factory('brandswitchFactory', Brandswitch);
	Brandswitch.$inject = ['$timeout', '$q', '$rootScope', 'angularLoad', 'referenceDataFactory'];

	function Brandswitch($timeout, $q, $rootScope, angularLoad, referenceDataFactory) {
		var brands = referenceDataFactory.global.brands;
		var defaultBrand = referenceDataFactory.global.defaultBrand;

		var disableAllBrands = function () {
			for (var index = 0; index < brands.length; index++) {
				if ($('link[href*=' + brands[index] + ']').length) {
					if (Brandswitch.selectedBrand !== brands[index]) {
						$('link[href*=' + brands[index] + ']').prop('disabled', true);
					}
				}
			}
		};

		Brandswitch.selectedBrand = "";
		
		Brandswitch.switchBrandStyling = function (brand) {
			var deferred = $q.defer();

			if (!brand) {
				brand = defaultBrand;
			}

			Brandswitch.selectedBrand = brand;
			if ($('link[href*=' + Brandswitch.selectedBrand + ']').length) {
				disableAllBrands();
				$('link[href*=' + Brandswitch.selectedBrand + ']').prop('disabled', false);
				$timeout(function () {
					deferred.resolve();
				}, 0, false);
			} else {
				// init grunticon with the user brand
				grunticon(['app/build/' + Brandswitch.selectedBrand + '/css/symbols.data.svg.css', 'app/build/' + Brandswitch.selectedBrand + '/css/symbols.data.png.css', 'app/build/' + Brandswitch.selectedBrand + '/css/symbols.fallback.css'], grunticon.svgLoadedCallback);

				if($('link[rel=icon]').length) {
					$('link[rel=icon]').attr("href", 'img/' + Brandswitch.selectedBrand + '-favicon.ico');
				}
				// dynamically load the css for the correct brand
				angularLoad.loadCSS('app/build/' + Brandswitch.selectedBrand + '/css/dmc.app.css').then(function () {
					disableAllBrands();
					deferred.resolve();
				}).catch(function () {
					deferred.reject();
				});
			}
			return deferred.promise;
		};


		return Brandswitch;
	}
})();
