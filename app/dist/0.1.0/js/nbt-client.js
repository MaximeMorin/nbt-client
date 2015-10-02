'use strict';

angular.module('nbt.main', []);
angular.module('nbt.authentication', []);
angular.module('nbt', [
	'ngRoute',
	'ngResource',
	'ngSanitize',
	'nbt.main',
	'nbt.authentication'
]);

angular.module('nbt').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);
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
angular.module('nbt.authentication').controller('loginController', ['authenticationFactory', function(authenticationFactory) {
	var ctrl = this;
		
	ctrl.visible = false;
	ctrl.data = {
		"username" : "",
		"password" : ""
	};
	
	ctrl.isVisible = function() {
		return ctrl.visible;
	};
	
	ctrl.show = function() {
		ctrl.visible = true;
	};
	
	ctrl.hide = function() {
		ctrl.visible = false;
	};
	
	ctrl.doLogin = function() {
		authenticationFactory.authenticate(ctrl.data.username, ctrl.data.password);
		ctrl.hide();
	};
	
	ctrl.doLogout = function() {
		authenticationFactory.deauthenticate();
	};
	
	return ctrl;
}]);
angular.module('nbt.main').controller('mainController', ['authenticationFactory', function(authenticationFactory) {
	var ctrl = this;
		
	ctrl.getUsername = function() {
		return authenticationFactory.getUsername();
	};
	
	ctrl.isAuthenticated = function() {
		return authenticationFactory.isAuthenticated();
	};
	
	return ctrl;
}]);