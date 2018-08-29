import express from 'express'
import bodyParser from 'body-parser'
import corsFilter from 'cors'
import cuid from 'cuid'
import appLogger from './util/logger'
import indexControllers from './controllers/indexControllers'
import chatControllers from './controllers/chatControllers'
import userControllers from './controllers/userControllers'

const app = express()
let router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(corsFilter())
app.options('*', corsFilter())

app.use(function(req, res, next) {
	req.requestId = cuid()
	appLogger.info("request id: " + req.requestId + " request url: " + req.originalUrl)
	appLogger.info("request id: " + req.requestId + " request verb: " + req.method)
	appLogger.info("request id: " + req.requestId + " request headers: " + JSON.stringify(req.headers))
	appLogger.info("request id: " + req.requestId + " request data: " + JSON.stringify(req.body))
	next()
})

router.use('/', indexControllers)
router.use('/users', userControllers)
router.use('/chat', chatControllers)
app.use('/coffee', router)

app.use(function(req, res, next) {
	res.json(res.response)
	appLogger.info("request id: " + req.requestId + " response: " + JSON.stringify(res.statusCode))
	appLogger.info("request id: " + req.requestId + " response: " + JSON.stringify(res.response))
	next()
})

// error handlers
app.use(function(err, req, res, next) {
	appLogger.error(err)
	if (err.status === 404) {
		res.status(404)
		res.json({result: false, data:"Resource does not exist, or you do not have permission to access it."})
	} else {
		res.status(err.status || 500)
		res.json({result: false, data:"Internal server error."})
	}
})

export default app