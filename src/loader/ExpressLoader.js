const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const compression = require('compression')

const config = require('../config/config')
const routes = require('../api/v1')
require('../config/passport')
const winston = require('../config/winston')

class ExpressLoader {
  constructor() {
    const app = express()

    app.use(compression())
    app.use(bodyParser.json())
    app.use(cors())

    app.use(morgan('combined', { stream: winston.stream }))

    // Pass app to routes
    // Setup error handling, this must be after all other middleware

    routes(app)
    app.use(ExpressLoader.errorHandler)
    // Start application
    this.server = app.listen(config.port, () => {
      winston.info(`Express running, now listening on port ${config.port}`)
    })
  }

  get Server() {
    return this.server
  }

  /**
   * @description Default error handler to be used with express
   * @param err Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  // eslint-disable-next-line no-unused-vars
  static errorHandler(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    const user = req.user
      ? JSON.stringify({
          name: req.user.fullname,
          email: req.user.email,
          role: req.user.role,
        })
      : 'guest'
    // add this line to include winston logging
    if (err.status === 500) {
      winston.error(
        `500 - ${err.message} - ${err.stack} - ${req.originalUrl} - ${req.method} - ${req.ip} -  ${user}`
      )
    } else {
      winston.warn(
        `${err.status}- ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} -  ${user}`
      )
    }

    const status = err.status || 500
    return res.status(status).send({
      error: err.message,
      status: err.status,
    })
  }
}

module.exports = ExpressLoader
