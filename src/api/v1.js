'use stricts'

const authentification = require('./authentification')
const student = require('./Users/student')
const teacher = require('./Users/teacher')
const admin = require('./Users/admin')

const subject = require('./subject')
const classe = require('./class')

const typedocs = require('./Docs/typedoc')
const documents = require('./Docs/document')
const reader = require('./Docs/reader')

module.exports = (app) => {
  app.use('/v1', authentification)
  app.use('/v1', student)
  app.use('/v1', teacher)
  app.use('/v1', subject)
  app.use('/v1', classe)
  app.use('/v1', typedocs)
  app.use('/v1', documents)
  app.use('/v1', reader)
  app.use('/v1', admin)
}
