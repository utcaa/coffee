export default function(sequelize, Sequelize) {
	let Addresses = sequelize.define('Addresses', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		addressLine1: {
			type: Sequelize.STRING(90),
			allowNull: false,
			field: "address_line1"
		},
		addressLine2: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "address_line2"
		},
		postalCode: {
			type: Sequelize.STRING(10),
			allowNull: false,
			field: "postal_code"
		},
		cityId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			field: "city_id"
		}
	}, {
		tableName: 'addresses',
		timestamps: false,
		underscoredAll: true
	})

	Addresses.associate = function(entities) {
		Addresses.belongsTo(entities.Cities)
	}
	return Addresses
};