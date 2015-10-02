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