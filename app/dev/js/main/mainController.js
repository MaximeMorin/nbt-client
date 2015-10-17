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