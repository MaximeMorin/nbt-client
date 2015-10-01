'use strict';

angular.module('nbt.authentication', []);
angular.module('nbt', [
	'ngRoute',
	'ngResource',
	'ngSanitize',
	'nbt.authentication'
]);

angular.module('nbt').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);
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