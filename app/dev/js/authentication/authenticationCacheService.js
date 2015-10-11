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