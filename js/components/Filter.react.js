var React = require('react/addons');
var UserActions = require('../actions/UserActions.js');

var Filter = React.createClass({

	getInitialState: function () {
		return this.props.config;
	},

	render: function() {
		return (
			<div>
				Drinks coffee: 
				<input checked={this.state.drinksCoffee} 
						ref="checkboxFilter" 
						type="checkbox" 
						onChange={this._onDrinksCoffeeChanged} /><br />
				Name: 
				<input value={this.state.userName}
						ref="textFilter"
						type="text"
						onChange={this._onUserNameChanged}
						placeholder="filter" /><br />
				<button onClick={this._resetFilter}>Reset filter</button>
			</div>
		);
	},

    _resetFilter: function () {
    	this.state = this.props.config;
    	UserActions.filterReset();
    },

    _onUserNameChanged: function (event) {
		this.setState({ userName: event.target.value });
		this._onFilterChanged();
    },

    _onDrinksCoffeeChanged: function(event) {
		this.setState({ drinksCoffee: event.target.checked });
		this._onFilterChanged();
    },

    _onFilterChanged: function () {
		UserActions.filterUsers(this.state);
    }
});

module.exports = Filter;