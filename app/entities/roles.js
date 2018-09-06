export default function(sequelize, Sequelize) {
	let Roles = sequelize.define('Roles', {
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
		tableName: 'roles',
		timestamps: false,
		underscoredAll: true
	})

	Roles.associate = function(entities) {
		Roles.hasMany(entities.WorkExperience)
	}

	/**above are DB settings of the entity. below are 
	the business logics of AccountActionType entity.
	**/
	Roles.getByName = async function(value) {
		return Roles.find({where: {name: value}})
	}

	Roles.getById = function(id) {
		return Roles.find({where: {id}})
	}

	Roles.list = function() {
		return Roles.findAll();
	}

	return Roles
}