const emailServer = require('../util/emailServer')
const logger = require('../util/logger')

const send = (data) => {
	sendWithRetry(data, 0)
}

const sendWithRetry = (data, count) => {
	const retryCount = 3
	emailServer.connect().send(data, (err, msg) => {
		if (err) {
			logger.error(err)
			if (count < retryCount) {
				send(data, count++)
			} else {
				throw err
			}
		}
	})
}

module.exports = { send }