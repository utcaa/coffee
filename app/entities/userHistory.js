export default function(sequelize, Sequelize) {
	let UserHistory = sequelize.define('UserHistory', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		userId: {
			type: Sequelize.INTEGER(11),
			isUnique: false,
			allowNull: false,
			field: "user_id"
		},
		actionTypeId: {
			type: Sequelize.INTEGER,
			isUnique: false,
			allowNull: false,
			field: "action_type_id"
		}
	}, {
		tableName: 'user_history',
		timestamps: true,
		createdAt: 'latest_action_at',
		updatedAt: false,
		underscoredAll: true
	})
	
	UserHistory.associate = function(entities) {
		UserHistory.belongsTo(entities.AccountActionTypes)
		UserHistory.belongsTo(entities.Users)
	}

	/**above are DB settings of the entity. below are 
	the business logics of UserHistory entity.
	**/
	UserHistory.add = function(userId, actionTypeId) {
		let newData = {
			userId: userId,
			actionTypeId: actionTypeId
		}
		return UserHistory.create(newData)
	}

	return UserHistory
}