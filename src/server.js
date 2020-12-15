const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const winston = require('./config/winston')
require('custom-env').env('developpment')
const db = require('./models')
const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(morgan('combined', { stream: winston.stream }))

require('./config/passport')
require('./api/v1')(app)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
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
})

app.get('/', (req, res) => {
	return res.send('its ok213s')
})

db.sequelize.sync().then(() => {
 app.listen()
})
