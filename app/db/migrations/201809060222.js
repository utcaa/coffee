'use strict'

module.exports = {
up: function(queryInterface, Sequelize) {
	return queryInterface.createTable(
		'user_request_counts', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			isUnique: true,
			allowNull: false
		},
		count: {
			type: Sequelize.INTEGER(3),
			allowNull: false
		},
		user_id: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		user_type_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: 1,
			references: {
				model: 'user_types',
				key: 'id'
			}
		}
	})
},

down: function(queryInterface, Sequelize) {
	return queryInterface.dropTable('user_request_counts')
}
}