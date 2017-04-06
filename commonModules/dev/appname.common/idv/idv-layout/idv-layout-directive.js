(function appnameIdvLayoutDirective() {
	'use strict';
	angular.module('appname.common.idv.idvLayout').directive('appnameIdvLayout', idvLayout);

	idvLayout.$inject = [];

	function idvLayout() {
		var directive = {
			restrict: 'EA',
			template: require('./idv-layout-template.html'),
			scope: {
				myParam: '@'
			},
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

	Controller.$inject = ["idvFactory"];

	function Controller(idvFactory) {
		 var vm = this;

		 activate();

		 function activate() {
			 vm.idv = idvFactory;
		 }
	}

})();
