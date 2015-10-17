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
angular.module('nbt.authentication').factory('authenticationCacheService', [function() {
	var service = this;		
				
	service.cache = function(data) {
		try {
			localStorage.setItem('authentication', JSON.stringify(data));
		} catch (e) {
			console.error('Failed to cache authentication data.');
		}				
	};
	
	service.clear = function() {
		localStorage.removeItem('authentication');
	};	
		
	service.getDisplayName = function() {
		var displayName = null;
		
		if (service.isAuthenticated()) {
			displayName = service._getData().displayName;
		}
		
		return displayName;
	};
	
	service.getToken = function() {
		var token = null;
		
		if (service.isAuthenticated()) {
			var data = service._getData();
			token = {
				"value" : data.value,
				"expiry" : data.expiry,
				"valid" : data.valid
			};
		}
				
		return token;
	};
	
	service.isAuthenticated = function() {
		return service._getData() !== null;
	};
		
	service._getData = function() {
		var data = localStorage.getItem('authentication');
		
		if (data !== null) {
			data = JSON.parse(data);
		}
		
		return data;
	};	
	
	return service;
}]);
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
		var promise = authenticationService.deauthenticate().$promise;
		
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
angular.module('nbt.authentication').factory('authenticationService', ['$resource', function ($resource) {
	return $resource('http://api-dev.netbattletech.com/security/tokens/', null, {
		'authenticate': { method: 'POST', params: null, isArray: false },
		'deauthenticate': { method: 'DELETE', params: null, isArray: false }
	});
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
		
	ctrl.getDisplayName = function() {
		return authenticationFactory.getDisplayName();
	};
	
	ctrl.isAuthenticated = function() {
		return authenticationFactory.isAuthenticated();
	};
	
	return ctrl;
}]);