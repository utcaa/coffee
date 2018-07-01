const { Op } = require('sequelize')
import entities from '../entities'
import { addDays } from '../utils/dateHandlers'

export default function(sequelize, Sequelize) {
	let UserSessions = sequelize.define('UserSessions', {
		id: {
			type: Sequelize.INTEGER(11),
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
		email: {
			type: Sequelize.STRING(45),
			isUnique: true,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		sessionId: {
			type: Sequelize.STRING(120),
			allowNull: false,
			defaultValue: false,
			field: "session_id"
		},
		active: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		expireAt: {
			type: Sequelize.DATE,
			allowNull: false,
			field: 'expire_at'
		}
	}, {
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false,
		underscoredAll: true
	})

	UserSessions.associate = function(entities) {
		UserSessions.belongsTo(entities.Users)
	}

	/**above are DB settings of the entity. below are 
	the business logics of userSessions entity.
	**/
	UserSessions.findActiveSessionsByUser = function(email, uuId, sessionId) {
		const now = new Date()
		let findAction = new Promise((resolve, reject) => {
			entities.Users.getByEmailAndUUId(email, uuId).then(function(user) {
				if (!user) {
					reject(Error('User does not exist.'))
				} else{
					UserSessions.find({where: {
						userId: user.id,
						email: email,
						sessionId: sessionId,
						active: true,
						expireAt: {
							[Op.gt]: now
						}
					}}).then(function(session) {
						resolve(session)
					}).catch(function(err) {
						reject(Error(err))
					})
				}
			})
		})
		return findAction
	}

	UserSessions.add = function(userId, email) {
		const expiry = addDays(new Date(), 2)
		const sessionId = generateSessionId()
		return UserSessions.create({
			userId: userId,
			email: email,
			sessionId: sessionId,
			active: true,
			expireAt: expiry
		})
	}

	UserSessions.deactivateAllSessions = function(userId) {
		let deactivateSessions = new Promise((resolve, reject) => {
			UserSessions.findAll({where:{userId, active: true}})
			.then(function(sessions) {
				if (sessions !== undefined && sessions.length > 0) {
					let sessionsCount = 0
					for(let session of sessions) {
						session.active = false
						session.update({active: false})
						.then(function() {
							sessionsCount++
							if (sessionsCount === sessions.length - 1) {
								resolve(true)
							}
						}).catch(function(err) {
							reject(Error(err))
						})
						entities.AccountActionTypes.get('signout')
						.then(function(aat) {
							entities.UserHistory.add(session.user_id, aat.id)
						})
					}
				}
			}).catch(function(err) {
				reject(Error(err))
			})
		})
		return deactivateSessions
	}

	UserSessions.deactivateSession = function(userId, sessionId) {
		const now = new Date()
		let deactivateSessions = new Promise((resolve, reject) => {
			UserSessions.find({where:{userId, sessionId, active: true}})
			.then(function(session) {
				if (!session) {
					reject(Error('Requested session does not exist.'))
				} else {
					session.active = false
					session.update({active: false})
					.then(function() {
						resolve(true)
					}).catch(function(err) {
						reject(Error(err))
					})
					entities.AccountActionTypes.get('signout')
					.then(function(aat) {
						entities.UserHistory.add(session.user_id, aat.id)
					})
				}
			}).catch(function(err) {
				reject(Error(err))
			})
		})
		return deactivateSessions
	}

	return UserSessions
}

let generateSessionId = function() {
	let secondsNow = (new Date().getTime()) / 1000;
	function v4() {
		return Math.floor((secondsNow + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return v4() + v4() + '-' + v4() + '-' + v4() + '-' +
		v4() + '-' + v4() + v4() + v4();
}