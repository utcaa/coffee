import express from 'express'
import entities from '../entities'
import { USER_ID_COOKIE, EMAIL_COOKIE, SESSION_ID_COOKIE } from '../util/cookieHelpers'

let router = express.Router()

router.post('users/signup', function(req, res, next) {
	if (!req.body.email === undefined) {
		console.log('Email is required but not given.')
		res.json({result:false, exception: "Email is required but not given."})
	} if (!req.body.password === undefined) {
		console.log('Password is required but not given.')
		res.json({result:false, exception: "Password is required but not given."})
	} if (!req.body.first_name === undefined) {
		console.log('First name is required but not given.')
		res.json({result:false, exception: "Email is required but not given."})
	} else if (!req.body.last_name) {
		console.log('Last name is required but not given.')
		res.json({result:false, exception: "Last name is required but not given."})
	} else if (!req.body.consented) {
		console.log('User consent is required but not given.')
		res.json({result:false, exception: "User consent is required but not given."})
	} else if (!req.body.phone) {
		console.log('User phone is required but not given.')
		res.json({result:false, exception: "User phonenumber is required but not given."})
	} else if (!req.body.user_type) {
		console.log('User type is required but not given.')
		res.json({result:false, exception: "User type is required but not given."})
	} else {
		const data = req.body
		entities.Users.signup(data.email, data.password, data.first_name, data.last_name, data.consented, data.phone, data.user_type, data.preferred_name)
		.then(function(result) {
			res.json({result:true})
		}).catch(function(err) {
			console.log(err)
			res.json({result:false, exception: err.message})
		})
	}
})

export default router