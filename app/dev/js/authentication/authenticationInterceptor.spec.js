describe('Authentication Interceptor', function () {

	var interceptor;
	var cacheService;

	beforeEach(module('nbt.authentication'));	
	beforeEach(inject(function ($injector) {		
		interceptor = $injector.get('authenticationInterceptor');
		cacheService = $injector.get('authenticationCacheService');
	}));
	
	afterEach(function() {
		localStorage.clear();
	});

	it('should not inject token by default', function () {
		// given
		var config = {};
		
		// when
		var newConfig = interceptor.request(config);
		
		// then
		expect(newConfig.headers).toEqual({});
	});

	it('should inject the token when valid', function () {
		// given
		var config = {};
		var tokenData = {
			"displayName" : "Bobby",
			"value" : "123456",
			"expiry" : "never",
			"valid" : true
		};
		cacheService.cache(tokenData);
		
		// when		
		var newConfig = interceptor.request(config);
		
		// then
		expect(newConfig.headers).toEqual({ "X-NBT-Token" : "123456" });
	});

	it('should not inject the token when it\'s invalid', function () {
		// given
		var config = {};
		var tokenData = {
			"displayName" : "Bobby",
			"value" : "123456",
			"expiry" : "never",
			"valid" : false
		};
		cacheService.cache(tokenData);
		
		// when		
		var newConfig = interceptor.request(config);
		
		// then
		expect(newConfig.headers).toEqual({});
	});

});