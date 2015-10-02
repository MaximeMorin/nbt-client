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