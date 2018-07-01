import entities from '../entities'

export default function(sequelize, Sequelize) {
	let Continents = sequelize.define('Continents', {
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
	}, {
		tableName: 'continents',
		timestamps: false,
		underscoredAll: true
	})

	Continents.associate = function(entities) {
		Continents.hasMany(entities.Countries)
	}

	Continents.list = function() {
		return Continents.findAll()
	}

	/**above are DB settings of the entity. below are 
	the business logics of Continent entity.
	**/
	Continents.listAllCountries = function(continentId) {
		return Continents.findAll(
		{where: {id: continentId}, 
			include: [{model: entities.Countries,
				order: ['name']
		}]})
	}

	return Continents
}