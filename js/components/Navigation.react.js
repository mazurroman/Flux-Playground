var React = require('react'),
	NavigationMixin = require('react-router').Navigation;

var Navigation = React.createClass({
	mixins: [NavigationMixin],

	render: function() {
		return (
			<div>
				<span onClick={this._navigateTo.bind(this, 'users')}>[Users]</span>
				<span onClick={this._navigateTo.bind(this, 'another-page')}>[Another Page]</span>
			</div>
		);
	},

	_navigateTo: function (pageName) {
		this.transitionTo('/' + pageName);
	}

});

module.exports = Navigation;