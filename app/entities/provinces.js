export default function(sequelize, Sequelize) {
	let Provinces = sequelize.define('Provinces', {
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
		shortName: {
			type: Sequelize.STRING(4),
			allowNull: false,
			field: "short_name"
		},
		countryId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "country_id"
		}
	}, {
		tableName: 'provinces',
		timestamps: false,
		underscoredAll: true
	})

	Provinces.associate = function(entities) {
		Provinces.belongsTo(entities.Countries)
		Provinces.hasMany(entities.Cities)
	}
	return Provinces
}