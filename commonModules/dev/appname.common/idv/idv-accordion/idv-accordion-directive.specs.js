describe('appname.common.idv', function() {
	var $compile,
	$rootScope;

	// Load the module, which contains Idv-accordion
	beforeEach(angular.mock.module('appname.common.idv'));

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	// example nested describe
	describe('display parameter myParam', function() {


	});

});
