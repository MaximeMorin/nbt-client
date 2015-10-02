angular.module('nbt.authentication').factory('authenticationFactory', [function() {
	var factory = this;
		
	factory.authenticate = function(username, password) {
		localStorage.setItem('user', JSON.stringify({ "username" : username }));
	};
	
	factory.deauthenticate = function() {
		localStorage.removeItem('user');
	};
	
	factory.getUser = function() {
		return JSON.parse(localStorage.getItem('user'));
	};
	
	factory.getUsername = function() {
		var user = factory.getUser();
		var username = null;
		
		if (angular.isObject(user)) {
			username = user.username;
		}
		
		return username;
	};
	
	factory.isAuthenticated = function() {
		return angular.isObject(factory.getUser());
	};
	
	return factory;
}]);