// Generated by grunt: browserify-imports
(function moduleInit_dmcCommon() {
	'use strict';

	// Add require for other modules here
	// require('../my.other.module');

	// Grunt browserify-imports require all components with an index.js here
	// StartRequire
	require('./footer');
	require('./header');
	require('./modal');
	var modules = ["dmc.common.footer","dmc.common.header","dmc.common.modal"];
	// EndRequire

	// Add your angular module dependencies here
	// modules.push('my.other.module');

	angular.module('dmc.common', modules);
})();
