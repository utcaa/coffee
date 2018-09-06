export default function(sequelize, Sequelize) {
	let Cities = sequelize.define('Cities', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		name: {
			type: Sequelize.STRING(60),
			allowNull: false
		},
		provinceId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "province_id"
		}
	}, {
		tableName: 'cities',
		timestamps: false,
		underscoredAll: true
	});
	
	Cities.associate = function(entities) {
		Cities.belongsTo(entities.Provinces)
		Cities.hasMany(entities.Addresses)
	}

	/**above are DB settings of the entity. below are 
	the business logics of AccountActionType entity.
	**/

	Cities.getById = function(id) {
		return Cities.find({where: {id}})
	}

	Cities.list = function() {
		return Cities.findAll();
	}

	return Cities
}