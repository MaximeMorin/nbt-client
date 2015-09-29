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