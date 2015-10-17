angular.module('nbt.authentication').factory('authenticationInterceptor', ['authenticationCacheService', function(authenticationCacheService) {
	var factory = this;
	
	factory.request = function(config) {
		config.headers = config.headers || {};

		if (authenticationCacheService.isAuthenticated()) {
			var token = authenticationCacheService.getToken();
			if (token.valid) {
				config.headers['X-NBT-Token'] = token.value;
			}
		}

		return config;		
	};

	factory.response = function(response) {
		if (response.status === 401) {
			// Login required.
		}

		return response;		
	};

	return factory;
}]);

angular.module('nbt.authentication').config(["$httpProvider", function($httpProvider) {
	$httpProvider.interceptors.push('authenticationInterceptor');
}]);