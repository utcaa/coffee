import express from 'express'
import entities from '../entities'
import userService from '../services/userService'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../util/cookieHelpers'

let router = express.Router()

router.post('/signup', function(req, res, next) {
	if (!req.body.email) {
		console.log('Email is required but not given.')
		res.response = {result:false, exception: "Email is required but not given."}
		next()
	} if (!req.body.password) {
		console.log('Password is required but not given.')
		res.response = {result:false, exception: "Password is required but not given."}
		next()
	} if (!req.body.first_name) {
		console.log('First name is required but not given.')
		res.response = {result:false, exception: "First name is required but not given."}
		next()
	} if (!req.body.last_name) {
		console.log('Last name is required but not given.')
		res.response = {result:false, exception: "Last name is required but not given."}
		next()
	} if (!req.body.consented) {
		console.log('User consent is required but not given.')
		res.response = {result:false, exception: "User consent is required but not given."}
		next()
	} if (!req.body.phone) {
		console.log('User phone is required but not given.')
		res.response = {result:false, exception: "User phonenumber is required but not given."}
		next()
	} if (!req.body.user_type) {
		console.log('User type is required but not given.')
		res.response = {result:false, exception: "User type is required but not given."}
		next()
	}
	const data = req.body
	entities.Users.signup(data.email, data.password, data.first_name, data.last_name, data.consented, data.phone, data.user_type, data.preferred_name)
	.then(function(result) {
		res.response = {result:true}
		next()
	}).catch(function(err) {
		console.log(err)
		res.response = {result:false, exception: err.message}
		next()
	})
})

router.post('/:user_id/professional_experience', function(req, res, next) {
	const userId = req.params.userId;
	if (!req.body.role_id) {
		console.log('Role id is required but not given.')
		res.response = {result:false, exception: "Role id is required but not given."}
		next()
	}
	if (!req.body.location_id) {
		console.log('Location id is required but not given.')
		res.response = {result:false, exception: "Location id is required but not given."}
		next()
	}
	if (!req.body.industry_id) {
		console.log('Industry id is required but not given.')
		res.response = {result:false, exception: "Industry id is required but not given."}
		next()
	}
	if (!req.body.start_year || isNaN(req.body.start_year)) {
		console.log('Start year is required but not given.')
		res.response = {result:false, exception: "Start year is required but not given."}
		next()
	}
	if (!req.body.start_month || isNaN(req.body.start_month)) {
		console.log('Start month is required but not given.')
		res.response = {result:false, exception: "Start month is required but not given."}
		next()
	}
	const data = req.body
	userService.addWorkExperience(data.industry_id, req.params.user_id, data.role_id, data.location_id, 
									data.start_year, data.start_month, data.end_year, data.end_month)
		.then(result => {
			res.response = {result:true}
			next()
		}).catch(err => {
			console.log(err)
			res.response = {result:false, exception: err.message}
			next()
		})
})

export default router