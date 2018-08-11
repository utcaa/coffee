import entities from '../entities'

export default function(sequelize, Sequelize) {
	let WorkExperience = sequelize.define('WorkExperience', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		industryId: {
			type: Sequelize.INTEGER(11),
			isUnique: false,
			allowNull: false,
			field: "industry_id"
		},
		userId: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "user_id"
		},
		roleId: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "role_id"
		},
		locationId: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "location_id"
		},
		startYear: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "start_year"
		},
		startMonth: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "start_month"
		},
		endYear: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "end_year"
		},
		endMonth: {
			type: Sequelize.STRING(45),
			allowNull: false,
			field: "end_month"
		}
	}, {
		tableName: 'work_experience',
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		underscoredAll: true
	})
	
	WorkExperience.associate = function(entities) {
		WorkExperience.belongsTo(entities.Industries)
		WorkExperience.belongsTo(entities.Cities, {foreignKey: {
			name: 'location_id',
			// allowNull should be false. known sequelize issue when create with
			// association will fail. https://github.com/sequelize/sequelize/issues/9742
			allowNull: true
		}})
		WorkExperience.belongsTo(entities.Roles)
		WorkExperience.belongsTo(entities.Users)
	}
	return WorkExperience
}