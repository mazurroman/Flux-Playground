jest.dontMock('../Filter.react.js');
var React = require('react');
var FilterComponent = require('../Filter.react.js');
var TestUtils = React.addons.TestUtils;

describe('Filter component', function () {
	it('filters out users that does not drink coffee', function () {
		// Arrange
		var userToFilter = {
			drinksCoffee: false,
			userName: 'Johns'
		};

		var filterFunction;
		var cb = function(func) {
			filterFunction = func;
		};
		var renderedFilter = React.addons.TestUtils.renderIntoDocument(<FilterComponent onChange={cb} />);

		// Act
		React.addons.TestUtils.Simulate.change(renderedFilter.refs.checkboxFilter.getDOMNode(), {target: {checked: true}});
		
		// Assert
		expect(filterFunction(userToFilter)).toBe(false);

	});

	it('filters in users not drinking coffee', function () {
		var cb = function(filterFunction) { 
			expect(
				filterFunction({drinksCoffee: false, userName: 'Johns'})
			).toBe(true);
		}; 

		var renderedComponent = React.addons.TestUtils.renderIntoDocument(<FilterComponent onChange={cb} />);
	});
});