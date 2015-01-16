var React = require('react/addons');
var UserActions = require('../actions/UserActions.js');
var assign = require('object-assign');

var Filter = React.createClass({

	getInitialState: function () {
		return this.props.config;
	},

	render: function() {
		return (
			<div>
				Drinks coffee: 
				<input checked={this.props.config.drinksCoffee} 
						ref="checkboxFilter" 
						type="checkbox" 
						onChange={this._onDrinksCoffeeChanged} /><br />
				Name: 
				<input value={this.props.config.userName}
						ref="textFilter"
						type="text"
						onChange={this._onUserNameChanged}
						placeholder="filter" /><br />
				<button onClick={this._resetFilter}>Reset filter</button>
			</div>
		);
	},

    _resetFilter: function () {
    	// this.state = this.props.config;
    	UserActions.filterReset();
    },

    _onUserNameChanged: function (event) {
		this._onFilterChanged(assign({}, this.props.config, {
			userName: event.target.value
		}));
    },

    _onDrinksCoffeeChanged: function(event) {
		this._onFilterChanged(assign({}, this.props.config, {
			drinksCoffee: event.target.checked
		}));
    },

    _onFilterChanged: function (newFilterData) {
		UserActions.filterUsers(newFilterData);
    }
});

module.exports = Filter;