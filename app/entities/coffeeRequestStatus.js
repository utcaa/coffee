export default function(sequelize, Sequelize) {
	let CoffeeRequestStatus = sequelize.define('CoffeeRequestStatus', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false,
			field: "name"
		}
	}, {
		tableName: 'coffee_request_status',
		timestamps: false,
		underscoredAll: true
	})

	CoffeeRequestStatus.associate = function(entities) {
		CoffeeRequestStatus.hasMany(entities.CoffeeRequests)
	}

	/**above are DB settings of the entity. below are 
	the business logics of AccountActionType entity.
	**/
	CoffeeRequestStatus.getByName = function(value) {
		return CoffeeRequestStatus.find({where: {name: value}})
	}

	CoffeeRequestStatus.getById = function(id) {
		return CoffeeRequestStatus.find({where: {id}})
	}

	return CoffeeRequestStatus
}