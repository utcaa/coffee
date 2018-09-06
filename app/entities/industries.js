export default function(sequelize, Sequelize) {
	let Industries = sequelize.define('Industries', {
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
		tableName: 'industries',
		timestamps: false,
		underscoredAll: true
	})

	/**above are DB settings of the entity. below are 
	the business logics of AccountActionType entity.
	**/
	Industries.getByName = async function(value) {
		return Industries.find({where: {name: value}})
	}

	Industries.getById = function(id) {
		return Industries.find({where: {id}})
	}

	Industries.list = function() {
		return Industries.findAll();
	}

	return Industries
}