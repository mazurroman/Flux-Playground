var React = require('react/addons');
var UserStore = require('../stores/UserStore.js'); // TODO: Store bude mit parent a ja to dostanu jako props nebo atribut
var UserActions = require('../actions/UserActions.js');
var Grid = require('./Grid.react.js');

getUsersState = function () {
	return {
		users: UserStore.getAll()
	}
}

var Users = React.createClass({

	// getInitialState: function () {
	// 	return getUsersState();
	// },

	componentDidMount: function () {
		UserStore.addChangeListener(this._onChange);
		UserActions.loadUsers();
	},

	componentWillUnmount: function () {
		UserStore.removeChangeListener(this._onChange);
	},

	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<div>
				<h1>Users</h1>
				<Grid users={UserStore.getAll()} />
				<button onClick={this._addNewItem}>Add Item</button>
			</div>
		);
	},

	_addNewItem: function () {
		UserActions.create('Roman');
	},

	_onChange: function () {
		this.setState(getUsersState());
	}
});

module.exports = Users;