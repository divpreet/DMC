(function () {
	'use strict';

	angular.module('dmc').run(RunConfig);
	RunConfig.$inject = ['$rootScope','dmcDebitcardapp','$state','$location'];

	/**
	 * State Configuration. This is the base configuration. Each module should have its own configuration
	 * @param $rootScope
	 * @param debitcardapp
	 * @param $state
	 * @param $location
	 * @constructor
	 **/
	function RunConfig($rootScope,debitcardapp,$state,$location) {
		var locationSearch = {};

		$rootScope.$on('$stateChangeStart',
			function (event, toState, toParams, fromState, fromParams) {
				if(toState.name!='home.sorryPage' && toState.name!='home.index' && toState.name!='home.welcome' && !debitcardapp.getId()){
					event.preventDefault();
					debitcardapp.isError = "";
					$state.go('home.sorryPage');
				}else {
					//save location.search so we can add it back after transition is done
					locationSearch = $location.search();
				}
			}
		);

		$rootScope.$on('$stateChangeSuccess',
			function (event, toState, toParams, fromState, fromParams) {
				if(toState.name!='home.sorryPage') {
					//restore search term to url
					$location.search(locationSearch);
				}
			}
		);
	}
})();