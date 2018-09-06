'use strict'

module.exports = {

up: function(queryInterface, Sequelize) {
	return queryInterface.createTable(
		'roles', {
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
		'industries', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		name: {
			type: Sequelize.STRING(45),
			allowNull: false
		}
	})}).then(function() {
		return queryInterface.createTable(
		'work_experience', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		industry_id: {
			type: Sequelize.INTEGER(11),
			isUnique: false,
			allowNull: false,
			references: {
				model: 'industries',
				key: 'id'
			}
		},
		company: {
			type: Sequelize.STRING(180),
			allowNull: false,
			defaultValue: ''
		},
		user_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		role_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'roles',
				key: 'id'
			}
		},
		location_id: {
			type: Sequelize.INTEGER(11),
			allowNull: false
		},
		start_year: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		start_month: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		end_year: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		end_month: {
			type: Sequelize.STRING(45),
			allowNull: false
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
	return queryInterface.dropTable('work_experience')
	.then(queryInterface.dropTable('industries'))
	.then(queryInterface.dropTable('roles'))
}
}