describe('Authentication Cache Service', function () {

	var service;

	beforeEach(module('nbt.authentication'));	
	beforeEach(inject(function ($injector) {		
		service = $injector.get('authenticationCacheService')
	}));
	
	afterEach(function() {
		localStorage.clear();
	});

	it('should be empty by default', function () {
		expect(service.getDisplayName()).toBe(null);		
		expect(service.getToken()).toBe(null);		
		expect(service.isAuthenticated()).toBeFalsy();		
	});

	it('should cache data', function () {
		// given
		var data = {
			"displayName" : "Bobby",
			"value" : "123456",
			"expiry" : "never",
			"valid" : true
		};
		
		// when
		service.cache(data);
		
		// then			
		expect(service.getDisplayName()).toBe("Bobby");		
		expect(service.getToken().value).toBe("123456");		
		expect(service.getToken().expiry).toBe("never");		
		expect(service.getToken().valid).toBeTruthy();		
		expect(service.isAuthenticated()).toBeTruthy();		
	});

	it('should clear data', function () {
		// given
		var data = {
			"displayName" : "Bobby",
			"value" : "123456",
			"expiry" : "never",
			"valid" : true
		};
		
		// when
		service.cache(data);
		service.clear();
		
		// then			
		expect(service.getDisplayName()).toBe(null);		
		expect(service.getToken()).toBe(null);		
		expect(service.isAuthenticated()).toBeFalsy();		
	});

});