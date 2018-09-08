'use strict'

module.exports = {

up: function (queryInterface, Sequelize) {
	return[queryInterface.addColumn(
		'coffee_requests',
		'interested_industry_id',
		{
			type: Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'industries',
				key: 'id'
			}
		}),
		queryInterface.addColumn(
		'coffee_requests',
		'secondary_interested_industry_id',
		{
			type: Sequelize.INTEGER(11),
			allowNull: true,
			references: {
				model: 'industries',
				key: 'id'
			}
		}),
		queryInterface.addColumn(
		'coffee_requests',
		'location_id',
		{
			type:Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'cities',
				key: 'id'
			}
		}),
		queryInterface.addColumn(
		'coffee_requests',
		'interested_role_id',
		{
			type:Sequelize.INTEGER(11),
			allowNull: false,
			references: {
				model: 'roles',
				key: 'id'
			}
		})]
},

down: function (queryInterface, Sequelize) {
	return [queryInterface.removeColumn('coffee_requests', 'location_id'),
		queryInterface.removeColumn('coffee_requests', 'interested_role_id'),
		queryInterface.removeColumn('coffee_requests', 'secondary_interested_industry_id'),
		queryInterface.removeColumn('coffee_requests', 'interested_industry_id')]
}
}