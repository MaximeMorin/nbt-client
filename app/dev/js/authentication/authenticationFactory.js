angular.module('nbt.authentication').factory('authenticationFactory', ['authenticationService', 'authenticationCacheService', function(authenticationService, authenticationCacheService) {
	var factory = this;
		
	factory.authenticate = function(username, password) {
		var promise = authenticationService.authenticate({ "username" : username, "password" : password }).$promise;
		promise.then(function(results) {
			authenticationCacheService.cache(results.data);
		}, function(results) {
			alert('Oh snap!');
		});
		return promise;		
	};
	
	factory.deauthenticate = function() {
		// TODO
		authenticationCacheService.clear();
	};
	
	factory.getDisplayName = function() {
		return authenticationCacheService.getDisplayName();
	};
	
	factory.isAuthenticated = function() {
		return authenticationCacheService.isAuthenticated();
	};
	
	return factory;
}]);