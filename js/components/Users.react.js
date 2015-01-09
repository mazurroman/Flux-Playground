var React = require('react/addons');
var UserStore = require('../stores/UserStore.js'); // TODO: Store bude mit parent a ja to dostanu jako props nebo atribut
var UserActions = require('../actions/UserActions.js');
var Grid = require('./Grid.react.js');
var Filter = require('./Filter.react.js');

getUsersState = function () {
	return {
		users: UserStore.getVisibleUsers()
	}
}

var Users = React.createClass({

	getInitialState: function () {
		return getUsersState();
	},

	componentDidMount: function () {
		UserStore.addChangeListener(this._onChange);
		
	},

	componentWillUnmount: function () {
		UserStore.removeChangeListener(this._onChange);
	},

	/**
	 * @return {object}
	 */
	render: function() {
		if (!this.state.users) {
			return (
				<div>Data not loaded yet</div>
			);
		}

		return (
			<div>
				<h1>Users</h1>
				<Filter onChange={this._onFilterChanged} />
				<Grid data={this.state.users} />
			</div>
		);
	},

	_onFilterChanged: function(filterFunction){
		UserActions.filterUsers(filterFunction);
	},

	_onChange: function () {
		this.setState(getUsersState());
	}
});

module.exports = Users;