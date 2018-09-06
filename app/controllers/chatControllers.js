import express from 'express'
import chatServices from '../services/chatServices'
const csvParser = require("csvtojson")

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
							{ secondaryIndustryId: req.body.second_interest_industry_id,
									goal: req.body.goal, comments: req.body.comments, 
									challenge: req.body.challenge })
	.then(function(result) {
		res.response = {result:result}
		next()
	}).catch(function(err) {
		console.log(err)
		res.response = {result:false, exception: err.message}
		next()
	})
})

router.post('/request/from-csv', function(req, res, next) {
	const csvData = []
	let count = 0
	csvParser({delimiter: "|"}).fromFile('./app/files/request.bsv')
	.then(data => {
		chatServices.buldRequest(data)
		res.response = {result: data.length}
		next()
	})
})

export default router