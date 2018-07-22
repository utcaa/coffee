'use strict'

module.exports = {

up: function (queryInterface, Sequelize) {
	return [
		queryInterface.addColumn(
		'users',
		'user_type',
		{
			type: Sequelize.STRING,
			allowNull: false
		}
		),
		queryInterface.addColumn(
		'users',
		'phone',
		{
			type: Sequelize.STRING,
			allowNull: false
		}
		),
		queryInterface.addColumn(
		'users',
		'preferred_name',
		{
			type: Sequelize.STRING,
			allowNull: false
		}
		),
		queryInterface.removeColumn(
		'users',
		'middle_name'
		)
	];
},

down: function (queryInterface, Sequelize) {
	return [
		queryInterface.addColumn(
		'users',
		'middle_name',
		{
			type: Sequelize.STRING,
			allowNull: false
		}
		),
		queryInterface.removeColumn('users', 'preferred_name'),
		queryInterface.removeColumn('users', 'phone'),
		queryInterface.removeColumn('users', 'user_type')
	];
	}
};