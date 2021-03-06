// Generated by grunt: browserify-imports
(function moduleInit_dmcApp() {

	// librairies
	require('moment');
	require('angular');
	require('angular-aria');
	require('restangular');
	require('angular-ui-router');

	// ngAnimate
	require('angular-animate');
	// angular load for dynamically loading css after getting the brand
	require('angular-load');
	require('angular-sanitize');

	require('../gui.ng.components');

	// dmc modules
	require('../dmc.common');
	require('../dmc.factories');
	require('../dmc.filters');
	require('./app-layout');
	require('../dmc.debitcardapp');

	var modules = [];

	// libs
	modules.push('restangular');
	modules.push('ngAnimate');
	modules.push('ui.router');
	modules.push('ngAria');
	modules.push('angularLoad');
	modules.push('ngSanitize');

	// common
	modules.push('gui.ng.components');

	// dmc modules
	modules.push('dmc.common');
	modules.push('dmc.factories');
	modules.push('dmc.filters');
	modules.push('dmc.app.appLayout');
	modules.push('dmc.debitcardapp');
	// create dmc app module
	angular.module('dmc', modules);

	// add routes configuration
	require('./routes/app-routes');
	require('./runconfig/app-run-config.js');
})();
