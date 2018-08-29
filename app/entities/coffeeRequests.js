import entities from '../entities'

export default function(sequelize, Sequelize) {
	let CoffeeRequests = sequelize.define('CoffeeRequests', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
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
		statusId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "status_id"
		}
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
	return CoffeeRequests
}