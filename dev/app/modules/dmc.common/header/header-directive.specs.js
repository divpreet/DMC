describe('header', function() {

	var $compile,
		$rootScope,
		homeURL,telephone,brandswitchFactory;

	beforeEach(module('dmc.common'));
	beforeEach(module('dmc.factories'));
	beforeEach(module('angularLoad'));

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_,_brandswitchFactory_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		brandswitchFactory = _brandswitchFactory_;
		//Testing against STG details
		brandswitchFactory.selectedBrand = 'STG';
		homeURL = 'https://www.stgeorge.com.au/';
		telephone = '133 800';
	}));
	it('should contain home page URL based on Brand as href attr in the logo',function(){
		var node = $compile('<dmc-header></dmc-header>')($rootScope);
		$rootScope.$digest();
		expect(node.find('a.dmc-header__logo').attr('href')).toContain(homeURL);
	});
	it('should contain brand based help contact as href attr in the contact us section',function(){
		var node = $compile('<dmc-header></dmc-header>')($rootScope);
		$rootScope.$digest();
		expect(node.find('a.dmc-header__contact-us').attr('href')).toContain(telephone);
	});
});
