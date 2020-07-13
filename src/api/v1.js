'use stricts'

const authentification = require('./authentification')

module.exports = (app) => {
  app.use('/v1', authentification)
}
