import entities from '../entities'
import uuid from 'uuid'

export default function(sequelize, Sequelize) {
	let CoffeeRequests = sequelize.define('CoffeeRequests', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		uuid: {
			type: Sequelize.STRING(45),
			allowNull: false,
			isUnique: true
		},
		studentId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "student_id"
		},
		professionalId: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			field: "professional_id"
		},
		interestedIndustryId: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			field: "interested_industry_id"
		},
		secondaryInterestedIndustryId: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			field: "secondary_interested_industry_id"
		},
		interestedRoleId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "interested_role_id"
		},
		locationId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "location_id"
		},
		statusId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "status_id"
		},
		goal: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		challenge: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
		comments: {
			type: Sequelize.STRING(255),
			allowNull: false,
			defaultValue: ''
		},
	}, {
		tableName: 'coffee_requests',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscoredAll: true
	})
	
	CoffeeRequests.associate = function(entities) {
		CoffeeRequests.belongsTo(entities.CoffeeRequestStatus)
	}
	
	CoffeeRequests.beforeValidate((entity, options) => {
		if (!entity.uuid) entity.uuid = uuid.v4()
	})

	return CoffeeRequests
}