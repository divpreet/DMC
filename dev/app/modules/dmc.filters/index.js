// Generated by grunt: browserify-imports
(function moduleInit_dmcFilters() {
    'use strict';

    // Add require for other modules here
    // require('./casing/casing-filter.js');

    // Grunt browserify-imports require all components with an index.js here
    // StartRequire
	require('./casing');
	require('./trusthtml');
	var modules = ["dmc.filters.casing","dmc.filters.trusthtml"];
	// EndRequire

    // Add your angular module dependencies here
    // modules.push('dmc.filters.casing');

    angular.module('dmc.filters', modules);
})();