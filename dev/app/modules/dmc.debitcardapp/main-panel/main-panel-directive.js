(function dmcMainPanelDirective() {
	'use strict';
	angular.module('dmc.debitcardapp.mainPanel').directive('dmcMainPanel', mainPanel);

	mainPanel.$inject = [];

	function mainPanel() {
		var directive = {
			restrict: 'EA',
			template: require('./main-panel-template.html'),
			scope: {
				myParam: '@'
			},
			transclude: true,
			link: linkFunc,
			controller: Controller,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;

		function linkFunc(scope, el, attr, ctrl) {
			scope.message = 'Welcome';
		}
	}

	Controller.$inject = [];

	function Controller() {
		 var vm = this;

		 activate();

		 function activate() {

		 }
	}

})();
