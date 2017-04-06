(function dmcIndexDirective() {
	'use strict';
	angular.module('dmc.debitcardapp.indexPage').directive('dmcIndex', index);

	index.$inject = [];

	function index() {
		var directive = {
			restrict: 'EA',
			template: require('./index-page-template.html'),
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

	Controller.$inject = ['$state','dmcDebitcardapp'];

	function Controller($state,debitcardapp) {
		var vm = this;
		if(debitcardapp.isError && (debitcardapp.isError == "genericError" || debitcardapp.isError == "linkExpiredMsg")){
			$state.go('home.sorryPage');
		}else{
			$state.go('home.welcome');
		}

	}

})();
