(function dmcAppLayoutDirective() {
	'use strict';
	angular.module('dmc.app.appLayout').directive('dmcAppLayout', appLayout);

	appLayout.$inject = [];

	function appLayout() {
		var directive = {
			restrict: 'EA',
			template: require('./app-layout-template.html'),
			scope: {},
			link: linkFunc,
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {}
	}

	Controller.$inject = [];

	function Controller() {
		var vm = this;
	}

})();
