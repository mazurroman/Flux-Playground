var React = require('react');
var UserStore = require('../stores/UserStore.js'); // TODO: Store bude mit parent a ja to dostanu jako props nebo atribut
var UserActions = require('../actions/UserActions.js');

getUsersState = function () {
	return {
		users: UserStore.getAll()
	}
}

var Grid = React.createClass({

	getInitialState: function () {
		return getUsersState();
	},

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

		var tableItems = [],
				users = this.state.users;

		for (var userId in users) {
			if (users.hasOwnProperty(userId)) {
				tableItems.push(
					<tr key={users[userId].id}>
						<td>{users[userId].userName}</td>
						<td>{users[userId].phone}</td>
					</tr>
				);
			}
		}

		return (
			<div>
				<h1>Grid</h1>
				<table>
					<thead>
						<tr>
							<th>User Name</th>
							<th>Phone Number</th>
						</tr>
					</thead>
					<tbody>
						{tableItems}
					</tbody>
				</table>
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

module.exports = Grid;