export default function(sequelize, Sequelize) {
	let AccountActionTypes = sequelize.define('AccountActionTypes', {
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
		timestamps: false,
		underscoredAll: true
	})

	AccountActionTypes.associate = function(entities) {
		AccountActionTypes.hasMany(entities.UserHistory)
	}

	/**above are DB settings of the entity. below are 
	the business logics of AccountActionType entity.
	**/
	AccountActionTypes.get = function(value) {
		return AccountActionTypes.find({where: {name: value}})
	}

	return AccountActionTypes
}