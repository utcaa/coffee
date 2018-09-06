module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
				"INSERT INTO `coffee_request_status` VALUES \
				(1,'started'),(2,'pending'),(3,'completed');"
			)
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
				'DELETE FROM coffee_request_status where id > 0;'
			)
	}
}