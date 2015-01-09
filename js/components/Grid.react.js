var React = require('react/addons');

var Grid = React.createClass({

	// TODO: validacni funkce do propTypes, grid umi pracovat jenom kdyz tam jsou data

	render: function () {
		var gridItems = [],
				data = this.props.data;

		for (var dataItemId in data) {
			if (data.hasOwnProperty(dataItemId)) {
				gridItems.push(
					<tr key={data[dataItemId].id}>
						<td>{data[dataItemId].userName}</td>
						<td>{data[dataItemId].drinksCoffee ? 'yes' : 'no'}</td>
						<td>{data[dataItemId].phone}</td>
					</tr>
				);
			}
		}

		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>User Name</th>
							<th>Drinks Coffee</th>
							<th>Phone Number</th>
						</tr>
					</thead>
					<tbody>
						{gridItems}
					</tbody>
				</table>
			</div>
		);
	}
});

module.exports = Grid;