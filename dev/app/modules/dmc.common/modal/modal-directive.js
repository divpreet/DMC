(function dmcModalDirective() {
	'use strict';
	angular.module('dmc.common.modal').directive('dmcModal', modal);

	modal.$inject = [];

	function modal() {
		var directive = {
			restrict: 'EA',
			template: require('./modal-template.html'),
			scope: {
				showModal: '=',
				cancelLabel: '@',
				proceedLabel: '@',
				modalId: '@',
				modalHeader: '@',
				modalBody: '@',
				confirmFlow: '&'
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

	Controller.$inject = ['$scope','$element'];

	function Controller($scope,$element) {
		var vm = this;
		$scope.$watch('vm.showModal',function(newValue){
			if(newValue){
				$element.find('#'+vm.modalId).addClass('is-open');
			}else{
				$element.find('#'+vm.modalId).removeClass('is-open');
			}
		});
		vm.closeModal = function(){
			vm.showModal = false;
		};
	}

})();
