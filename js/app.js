var React = require('react');
var Users = require('./components/Users.react');
var UserActions = require('./actions/UserActions.js');

UserActions.loadUsers();

React.render(
	<Users />,
	document.getElementById('grid')
);