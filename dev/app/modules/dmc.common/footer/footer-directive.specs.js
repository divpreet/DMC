describe('footer', function() {

	var $compile,
		$rootScope,
		securityURL,
		brandswitchFactory;

	beforeEach(module('dmc.filters'));
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
		securityURL = 'https://webapps.stgeorge.com.au/apply-now/acc_help.asp#security?view=oaf';
	}));
	it('should contain security URL based on Brand as href attr in the security link',function(){
		var node = $compile('<dmc-footer></dmc-footer>')($rootScope);
		$rootScope.$digest();
		expect(node.find('p.dmc-footer__content__text a').attr('href')).toContain(securityURL);
	});
});
