var React = require('react/addons');

var Filter = React.createClass({

	getInitialState: function () {
		return {
			drinksCoffee: false,
			name: '',
		};
	},

	propTypes: {
		onChange: React.PropTypes.func.isRequired
	},

	componentDidMount: function () {
		this._onChange();
	},

	render: function() {
		return (
			<div>
				Drinks coffee: 
				<input checked={this.state.drinksCoffee} 
						ref="checkboxFilter" 
						type="checkbox" 
						onChange={this._onCheckboxChange} /><br />
				Name: 
				<input value={this.state.name}
						ref="textFilter"
						type="text"
						onChange={this._onInputChange}
						placeholder="filter" />
			</div>
		);
	},

	_filterFunction: function(user) {
        // Get checkbox value
        var checkboxValue = this.state.drinksCoffee;

        // Get input value
        var inputValue = this.state.name;

        return (user.drinksCoffee === checkboxValue) &&
            user.userName.toLowerCase().indexOf(inputValue) > -1;
    },

    _onInputChange: function (event) {
		this.setState({ name: event.target.value });
		this._onChange();
    },

    _onCheckboxChange: function(event) {
		this.setState({ drinksCoffee: event.target.checked });
		this._onChange();
    },

    _onChange: function () {
    	this.props.onChange(this._filterFunction);
    }
});

module.exports = Filter;