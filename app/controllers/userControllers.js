import express from 'express'
import entities from '../entities'
import userServices from '../services/userServices'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../util/cookieHelpers'
import logger from '../util/logger'

let router = express.Router()

router.post('/signup', function(req, res, next) {
	if (!req.body.email) {
		logger.error('Email is required but not given.')
		res.response = {result:false, exception: "Email is required but not given."}
		next()
	} if (!req.body.password) {
		logger.error('Password is required but not given.')
		res.response = {result:false, exception: "Password is required but not given."}
		next()
	} if (!req.body.first_name) {
		logger.error('First name is required but not given.')
		res.response = {result:false, exception: "First name is required but not given."}
		next()
	} if (!req.body.last_name) {
		logger.error('Last name is required but not given.')
		res.response = {result:false, exception: "Last name is required but not given."}
		next()
	} if (!req.body.consented) {
		logger.error('User consent is required but not given.')
		res.response = {result:false, exception: "User consent is required but not given."}
		next()
	} if (!req.body.phone) {
		logger.error('User phone is required but not given.')
		res.response = {result:false, exception: "User phonenumber is required but not given."}
		next()
	} if (!req.body.user_type_id) {
		logger.error('User type id is required but not given.')
		res.response = {result:false, exception: "User type id is required but not given."}
		next()
	}
	const data = req.body
	entities.Users.signup(data.email, data.password, data.first_name, data.last_name, data.consented, data.phone, data.user_type_id, data.preferred_name)
	.then(function(result) {
		res.response = {result:true}
		next()
	}).catch(function(err) {
		logger.error(err)
		res.response = {result:false, exception: err.message}
		next()
	})
})

router.post('/:user_id/professional_experience', function(req, res, next) {
	const userId = req.params.user_id;
	const workExperiences = req.body.experiences
	for(const experience of workExperiences) {
		if (!experience.role_id) {
			logger.error('Role id is required but not given.')
			res.response = {result:false, exception: "Role id is required but not given."}
			next()
		}
		if (!experience.location_id) {
			logger.error('Location id is required but not given.')
			res.response = {result:false, exception: "Location id is required but not given."}
			next()
		}
		if (!experience.industry_id) {
			logger.error('Industry id is required but not given.')
			res.response = {result:false, exception: "Industry id is required but not given."}
			next()
		}
		if (!experience.start_year || isNaN(experience.start_year)) {
			logger.error('Start year is required but not given.')
			res.response = {result:false, exception: "Start year is required but not given."}
			next()
		}
		if (!experience.start_month || isNaN(experience.start_month)) {
			logger.error('Start month is required but not given.')
			res.response = {result:false, exception: "Start month is required but not given."}
			next()
		}
		experience.user_id = userId
	}
	userServices.addWorkExperiences(workExperiences)
		.then(result => {
			res.response = {result:true}
			next()
		}).catch(err => {
			logger.error(err)
			res.response = {result:false, exception: err.message}
			next()
		})
})

router.post('/professionals/from-csv', function(req, res, next) {
	userServices.importFrom('./app/files/professionals.bsv')
	.then(result => {
		res.response = {result: true, data: result}
		next()
	}).catch(err => {
		logger.error(err)
		res.response = {result:false, exception: err.message}
		next()
	})
})

export default router