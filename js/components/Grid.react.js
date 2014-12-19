var React = require('react/addons');


var Grid = React.createClass({

	render: function () {
		var tableItems = [],
				users = this.props.users;

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
		);
	}
});

module.exports = Grid;