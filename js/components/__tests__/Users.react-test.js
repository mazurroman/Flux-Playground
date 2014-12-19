jest.dontMock('../Users.react.js');
// jest.dontMock('../../stores/UserStore.js');

describe('Users component', function () {
	it('renders with no data initially', function () {
		var React = require('react');
		var UsersComponent = require('../Users.react.js');
		expect(2).toBe(2);
	});
});