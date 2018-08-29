import express from 'express'
import chatServices from '../services/chatServices'

let router = express.Router()

let heartbitCount = 0

router.post('/request', function(req, res, next) {
	if (!req.body.student_id) {
		console.log('student_id id is required but not given.')
		res.response = {result:false, exception: "student_id is required but not given."}
		next()
	}
	if (!req.body.interest_industry_id) {
		console.log('interest_industry_id id is required but not given.')
		res.response = {result:false, exception: "interest_industry_id is required but not given."}
		next()
	}
	if (!req.body.second_interest_industry_id) {
		console.log('student_id id is required but not given.')
		res.response = {result:false, exception: "student_id is required but not given."}
		next()
	}
	if (!req.body.interest_role_id) {
		console.log('interest_role_id id is required but not given.')
		res.response = {result:false, exception: "interest_role_id is required but not given."}
		next()
	}
	if (!req.body.location_id) {
		console.log('location_id id is required but not given.')
		res.response = {result:false, exception: "location_id is required but not given."}
		next()
	}
	chatServices.request(req.body.student_id, req.body.interest_industry_id, 
							req.body.interest_role_id, req.body.location_id, 
							req.body.second_interest_industry_id)
})

export default router