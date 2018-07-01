import entities from '../entities'

export default function(sequelize, Sequelize) {
	let Countries = sequelize.define('Countries', {
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
		},
		countryIso3166A2: {
			type: Sequelize.STRING(4),
			allowNull: false,
			field: "country_iso3166_a2"
		},
		countryIso3166A3: {
			type: Sequelize.STRING(4),
			allowNull: false,
			field: "country_iso3166_a3"
		},
		countryIso3166Numeric: {
			type: Sequelize.STRING(4),
			allowNull: false,
			field: "country_iso3166_numeric"
		},
		continentId: {
			type: Sequelize.STRING(45),
			isUnique: true,
			allowNull: false,
			field: "continent_id"
		}
	}, {
		tableName: 'countries',
		timestamps: false,
		underscoredAll: true
	})

	Countries.associate = function(entities) {
		Countries.belongsTo(entities.Continents)
		Countries.hasMany(entities.Provinces)
	}

	/**above are DB settings of the entity. below are 
	the business logics of Continent entity.
	**/

	Countries.listAllProvinces = function(countryId) {
		return Countries.findAll(
			{where: {id: countryId}, 
				include: [{model: entities.Provinces,
					order: ['name']
			}]})
	}

	Countries.getById = function(countryId) {
		return Countries.find(
			{where: {id: countryId}, 
				include: [{model: entities.Continents,
					order: ['name']
			}]})
	}

	return Countries
}