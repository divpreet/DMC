describe('dmc.debitcardapp', function() {
	var $compile,
	$rootScope;

	// Load the module, which contains Main-panel
	beforeEach(angular.mock.module('dmc.debitcardapp'));

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	// example nested describe
	describe('transclude element behavior', function() {
		it('transclude the text Hello world', function() {
			var transcludedContent = 'Hello world';
			var node = $compile('<dmc-main-panel>' + transcludedContent + '</dmc-main-panel>')($rootScope);

			expect(node.find('div[ng-transclude]').html()).toContain(transcludedContent);
		});
	});

});
