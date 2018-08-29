'use strict'

module.exports = {

up: function(queryInterface, Sequelize) {
	return queryInterface.createTable(
		'coffee_request_status', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			isUnique: true,
			allowNull: false
		},
		name: {
			type: Sequelize.STRING(45),
			allowNull: false
		}
	}).then(function() {
		return queryInterface.createTable(
		'coffee_requests', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		student_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		professional_id: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		status_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'coffee_request_status',
				key: 'id'
			}
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
		}
	})
})
},

down: function (queryInterface, Sequelize) {
	return queryInterface.dropTable('coffee_requests')
	.then(queryInterface.dropTable('coffee_request_status'))
}
}