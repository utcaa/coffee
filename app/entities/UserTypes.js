export default function(sequelize, Sequelize) {
	let UserTypes = sequelize.define('UserTypes', {
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
		tableName: 'user_types',
		timestamps: false,
		underscoredAll: true
	})

	return UserTypes
}