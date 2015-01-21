var React = require('react');
var Users = require('./components/Users.react');
var UserActions = require('./actions/UserActions.js');
var router = require('./router');
var RouteHandler = require('react-router').RouteHandler;
var Navigation = require('./components/Navigation.react.js');
var PropTypes = React.PropTypes;

UserActions.loadUsers();

var App = React.createClass({
	propTypes: {
	    params: PropTypes.object.isRequired,
	    query: PropTypes.object.isRequired
	},

	render: function() {
		return (
			<div>
				<Navigation />
				<RouteHandler {...this.props} />
			</div>
		);
	}

});

module.exports = App;