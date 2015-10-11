angular.module('nbt.authentication').factory('authenticationService', ['$resource', function ($resource) {
	return $resource('http://api-dev.netbattletech.com/security/tokens/', null, {
		'authenticate': { method: 'POST', params: null, isArray: false },
		'deauthenticate': { method: 'DELETE', params: null, isArray: false }
	});
}]);