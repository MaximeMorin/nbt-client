angular.module('nbt.authentication').controller('loginController', [function() {
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
	
	return ctrl;
}]);