const emailSender = require('emailjs/email')
const config = require('../config/config')

const connect = () => {
	return emailSender.server.connect({
		user: config.email.user,
		password: config.email.password,
		host: config.email.host,
		port: "587",
		tls: true,
		ssl: false
	})
}

module.exports = { connect }