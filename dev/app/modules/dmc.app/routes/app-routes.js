(function () {
	'use strict';

	angular.module('dmc').config(StateConfig);
	StateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

	/**
	 * State Configuration. This is the base configuration. Each module should have its own configuration
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 * @constructor
	 **/
	function StateConfig($stateProvider, $urlRouterProvider) {


		$stateProvider


			////////////////
			// Base state //
			////////////////


			.state('home', {
				name: 'home',
				'abstract': true,
				resolve: {
					data: ['kickstartFactory', function (kickstartFactory) {
						return kickstartFactory.getAppData();
					}]
				},
				views: {
					/** Find the views named in index.html and inject the named views**/
					'header': {
						template: '<dmc-header></dmc-header>'
					},
					'footer': {
						template: '<dmc-footer brand="$root.brand"></dmc-footer>'
					},
					'content': {
						template: '<div class="dmc-app-layout__main" ui-view></div>'
					}
				}
			})

			///////////////////
			// Index state //
			///////////////////


			.state('home.index', {
				url: '/index',
				template: '<dmc-index class="dmc-app-layout__main__center-main-panel"></dmc-index>'
			})


			///////////////////
			// Welcome state //
			///////////////////


			.state('home.welcome', {
				url: '/welcome',
				template: '<dmc-landing-page class="dmc-app-layout__main__center-main-panel"></dmc-landing-page>'
			})

			///////////////////
			// Confirmation page state //
			///////////////////


			.state('home.confirmation', {
				url: '/order-complete',
				template: '<dmc-confirmation-page class="dmc-app-layout__main__center-main-panel"></dmc-confirmation-page>'
			})

			///////////////////
			// Confirm order state //
			///////////////////


			.state('home.confirmOrder', {
				url: '/confirm-details',
				template: '<dmc-confirm-order class="dmc-app-layout__main__center-main-panel"></dmc-confirm-order>'
			})

			///////////////////
			// Sorry page state //
			///////////////////


			.state('home.sorryPage', {
				url: '/sorry',
				template: '<dmc-sorry-page class="dmc-app-layout__main__center-main-panel"></dmc-sorry-page>'
			});


		//////////
		// Else //
		//////////


		$urlRouterProvider.when('/', '/index');
		$urlRouterProvider.when('', '/index');

	}
})();
