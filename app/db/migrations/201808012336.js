'use strict';

module.exports = {
	up: function (queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
				"INSERT INTO `industries` VALUES \
				(1,'Investment Management'),(2,'Exact Minerals/Metals'),(3,'Investment Banking/Brokerage/Securities'),\
				(4,'Retail'),(5,'Diversified Financial Services'),(6,'Accounting'),\
				(7,'Transportation Services'),(8,'Entertainment/Leisure'),(9,'Education'),\
				(10,'Manufacturing'),(11,'Auto'),(12,'Media, Journalism'),\
				(13,'Risk Management'),(14,'Software, designer'),(15,'Media, Journalism'),\
				(16,'Telecom'),(17,'Consulting'),(18,'Insurance'),\
				(19,'Data Analytics'),(20,'Energy'),(21,'Computer - Related Services'),\
				(22,'Government');"
			).then(function() {
				return queryInterface.sequelize.query(
					"INSERT INTO `roles` VALUES \
					(1,'Engineering'),(2,'Accounting'),(3,'Service Marketing, Car Lease'),\
					(4,'Nonprofit, Journalist'),(5,'Finance'),(6,'Strategic Planning, Designer and developer'),\
					(7,'Consulting'),(8,'Human Resources'),(9,'Investment Management'),\
					(10,'Finance, Data Management'),(11,'Business Development'),(12,'Administration'),\
					(13,'Operations'),(14,'General Management'),(15,'Auditing'), (16,'Finance - Group Treasury'), \
					(17,'Investment Banking'), (18, 'Product Management, Data Science');"
				)
			})
	},

	down: function (queryInterface, Sequelize) {
		return queryInterface.sequelize.query(
				'DELETE FROM roles where id > 0 and id < 16;'
			).then(function() {
				return queryInterface.sequelize.query(
				'DELETE FROM industries where id > 0 and id < 23;'
			)
			})
	}
}