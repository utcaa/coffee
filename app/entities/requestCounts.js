const { Op } = require('sequelize')
import entities from '../entities'

export default function(sequelize, Sequelize) {
	let RequestCounts = sequelize.define('RequestCounts', {
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			isUnique: true
		},
		count: {
			type: Sequelize.INTEGER(3),
			allowNull: false
		},
		userId: {
			type: Sequelize.INTEGER(11),
			allowNull: true,
			field: "user_id"
		},
		userTypeId: {
			type: Sequelize.INTEGER(11),
			allowNull: false,
			defaultValue: 1,
			field: "user_type_id"
		}
	}, {
		tableName: 'user_request_counts',
		timestamps: false,
		underscoredAll: true
	})

	RequestCounts.associate = function(entities) {
		RequestCounts.belongsTo(entities.Users)
		RequestCounts.belongsTo(entities.UserTypes)
	}

	/**above are DB settings of the entity. below are 
	the business logics of userSessions entity.
	**/

	RequestCounts.listRequestCountsByUserIds = async function(userIds) {
		return RequestCounts.findAll({where: {userId: {[Op.in]: userIds}}, order: [['count', 'ASC']]})
	}

	RequestCounts.newRequest = function(userId, userTypeId) {
		return RequestCounts.findOne({where: userId}).then(record => {
			if (!record) {
				RequestCounts.create({ count: 1, userId, userTypeId })
			} else {
				record.update({count: record.count + 1})
			}
		})
	}

	return RequestCounts
}