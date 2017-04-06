describe('dmc.debitcardapp', function() {
	var $compile,$rootScope;
	beforeEach(module('ui.router'));
	beforeEach(module('dmc.factories'));

	// Load the module, which contains Index
	beforeEach(angular.mock.module('dmc.debitcardapp'));

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_,_$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	// example nested describe
	describe('Index page', function() {
		it('should navigate to Welcome page if no error', inject(function($state){
			spyOn($state, 'go');
			var node = $compile('<dmc-index></dmc-index>')($rootScope);
			// Call something that eventually hits $state.go
			expect($state.go).toHaveBeenCalledWith('home.welcome');
		}));
		it('should navigate to Sorry page if error', inject(function($state,dmcDebitcardapp){
			spyOn($state, 'go');
			dmcDebitcardapp.isError = "genericError";
			var node = $compile('<dmc-index></dmc-index>')($rootScope);
			// Call something that eventually hits $state.go
			expect($state.go).toHaveBeenCalledWith('home.sorryPage');
		}));

	});

});
