const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
require('custom-env').env('developpment')
const db = require('./models')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./config/passport')
require('./api/v1')(app)

const port = process.env.APP_PORT || 8080

db.sequelize.sync().then(() => {
  app.listen(port)
  console.log(`running at http://localhost:${port}`)
})
