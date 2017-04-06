describe('dmc.app', function() {
	var $compile,
	$rootScope;

	// Load the module, which contains App-layout
	beforeEach(angular.mock.module('dmc.app'));


	// example nested describe
	describe('display parameter myParam', function() {

		// test example
		// it('display "Hello world" when my-param="Hello world"', function() {
		// 	// Compile a piece of HTML containing App-layout
		// 	var element = $compile('<dmc-app-layout my-param="Hello world"></dmc-app-layout>')($rootScope);
		//
		// 	$rootScope.$digest();
		//
		// 	expect(element.html()).toContain('Hello world');
		// });

	});

});
