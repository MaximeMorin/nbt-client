angular.module('nbt.authentication').controller('loginController', [function() {
	var ctrl = this;
	
	ctrl.data = {
		"username" : ""
	};
	
	return ctrl;
}]);