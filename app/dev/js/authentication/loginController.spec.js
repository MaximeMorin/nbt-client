describe('Login Controller', function () {

	var ctrl;

	beforeEach(module('ngResource'));	
	beforeEach(module('nbt.authentication'));	
	beforeEach(inject(function ($controller, $injector) {
		ctrl = $controller('loginController', {
			"authenticationFactory" : $injector.get('authenticationFactory')
		});
	}));

	it('should have an empty username & password', function () {
		expect(ctrl.data.username).toBe("");		
		expect(ctrl.data.password).toBe("");		
	});

	it('should not show login by default', function () {
		expect(ctrl.isVisible()).toBeFalsy();		
	});

	it('should show login', function () {
		// given
		// when
		ctrl.show();
		
		// then
		expect(ctrl.isVisible()).toBeTruthy();		
	});

	it('should hide login', function () {
		// given
		// when
		ctrl.hide();
		
		// then
		expect(ctrl.isVisible()).toBeFalsy();		
	});

});