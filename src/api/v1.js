'use stricts'

const authentification = require('./authentification')
const student = require('./student')
const teacher = require('./teacher')

const subject = require('./subject')
const classe = require('./class')

module.exports = (app) => {
  app.use('/v1', authentification)
  app.use('/v1', student)
  app.use('/v1', teacher)
  app.use('/v1', subject)
  app.use('/v1', classe)
}
