import entities from '../entities'
import { addDays } from '../utils/dateHandlers'
import logger from '../utils/logger'

export function isAuthenticated(uuId, email, sessionId) {
	let authenticateAction = new Promise((resolve, reject) => {
		if (!uuId || !email || !sessionId) {
			logger.error('user authentication info is not provided.')
			reject(new Error('user authentication info is not provided.'))
		} else {
			const emailData = email.replace("%40", "@")
			entities.UserSessions.findActiveSessionsByUser(emailData, uuId, sessionId)
			.then(function(session) {
				if (!session) {
					logger.error("No active session for given user of uuid: " + uuId)
					reject(new Error("No active session for given user of uuid: " + uuId))
				} else {
					session.update({expireAt:addDays(new Date(), 2)})
					.then(function() {
						logger.info("session " + sessionId + " for user " + uuId + " is now refreshed.")
						resolve(true)
					})
				}
			})
			.catch(function(err) {
				reject(new Error(err))
			})
		}
	})
	return authenticateAction
}

export function isWhiteListRequest(url) {
	let whiteListedEndpoints = [
		'/users/signin',
		'/users/signup'
	]
	for (let endpoint of whiteListedEndpoints) {
		if (url.indexOf(endpoint) === 0) {
			return true
		}
	}
	if (url === '/') {
		return true
	}
	return false
}