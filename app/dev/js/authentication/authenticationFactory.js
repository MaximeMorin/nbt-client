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
		var promise = authenticationService.deauthenticate({ "token" : factory.getToken().value }).$promise;
		
		promise.then(function(results) {
			authenticationCacheService.clear();
		}, function(results) {
			alert('Failed to deauthenticate');
		});	
		
		return promise;
	};
	
	factory.getDisplayName = function() {
		return authenticationCacheService.getDisplayName();
	};
	
	factory.isAuthenticated = function() {
		return authenticationCacheService.isAuthenticated();
	};
	
	factory.getToken = function() {
		return authenticationCacheService.getToken();
	};
	
	return factory;
}]);