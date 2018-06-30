import express from 'express'

let router = express.Router()

let heartbitCount = 0

router.get('/', function(req, res, next) {
	res.response = {count: ++heartbitCount}
	next()
})

export default router