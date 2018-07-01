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
	return Cities
}