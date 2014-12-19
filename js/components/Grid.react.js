var React = require('react/addons');

var Grid = React.createClass({

	render: function () {
		var gridItems = [],
				data = this.props.data;

		for (var dataItemId in data) {
			if (data.hasOwnProperty(dataItemId)) {
				gridItems.push(
					<tr key={data[dataItemId].id}>
						<td>{data[dataItemId].userName}</td>
						<td>{data[dataItemId].phone}</td>
					</tr>
				);
			}
		}

		return (
			<table>
				<thead>
					<tr>
						<th>User Name</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{gridItems}
				</tbody>
			</table>
		);
	}
});

module.exports = Grid;