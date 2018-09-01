'use strict'

module.exports = {
up: function(queryInterface, Sequelize) {
	return queryInterface.createTable(
		'user_types', {
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
		return queryInterface.sequelize.query(
			"INSERT INTO `user_types` VALUES \
			(1,'professional'),(2,'student'),(3,'admin');"
		)
	}).then(function() {
		return queryInterface.addColumn(
		'users',
		'user_type_id',
		{
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: 1,
			references: {
				model: 'user_types',
				key: 'id'
			}
		}
		)
	}).then(function() {
		return queryInterface.removeColumn('users', 'user_type')
	})
},

down: function(queryInterface, Sequelize) {
	return queryInterface.addColumn('users', "user_type", {
		type: Sequelize.STRING(45),
		allowNull: false
	}).then(function() {
		return queryInterface.removeColumn('users', 'user_type_id')
	.then(function() {
		return queryInterface.dropTable('user_types')
	})
	})
}
}