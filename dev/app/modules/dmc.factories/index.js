// Generated by grunt: browserify-imports
(function moduleInit_lalaFactories() {
	'use strict';
	// Add require for other modules here
	require('./core/generic-factory.js');
	require('./reference/reference-factory.js');
	require('./restangular/base-restangular-factory.js');
	require('./kickstart/kickstart-factory.js');
	require('./brandswitch/brandswitch-factory.js');
	require('./contentmgnt/contentmgnt-factory.js');
	require('./user/user-factory.js');
	require('./demo/demo-factory.js');
	require('./debitcardapp/debitcardapp-factory.js');
	require('./project/project-factory.js');
	require('./logger/logger-factory.js');
	require('./util/util-factory.js');
	// Add your angular module dependencies here
	var modules = [];

	modules.push('dmc.factories.core');
	modules.push('dmc.factories.contentmgnt');
	modules.push('dmc.factories.reference');
	modules.push('dmc.factories.restangular');
	modules.push('dmc.factories.kickstart');
	modules.push('dmc.factories.brandswitch');
	modules.push('dmc.factories.user');
	modules.push('dmc.factories.demo');
	modules.push('dmc.factories.debitcardapp');
	modules.push('dmc.factories.project');
	modules.push('dmc.factories.logger');
	modules.push('cccwow.factories.util');

	angular.module('dmc.factories', modules);
})();
