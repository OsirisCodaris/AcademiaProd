const winston = require('./config/winston')
require('custom-env').env('developpment')
const db = require('./models')

db.sequelize
  .sync()
  .then(() => {
    winston.info('Database connection successful')

    // Create express instance to setup API
    // eslint-disable-next-line global-require
    const ExpressLoader = require('./loader/ExpressLoader')
    // eslint-disable-next-line no-new
    new ExpressLoader()
  })
  .catch((err) => {
    // eslint-disable-next-line
    console.error(err)
    winston.error(err)
  })
