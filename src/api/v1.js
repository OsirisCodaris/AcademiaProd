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

const stats = require('./Stats/stats')

const problem = require('./Forum/problem')
const response = require('./Forum/response')
const statForum = require('./Forum/stats')
const readerfile = require('./Forum/readerfile')
const notification = require('./Chat/notifications')

const update = require('./update')

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
  app.use('/v1', stats)
  app.use('/v1', problem)
  app.use('/v1', response)
  app.use('/v1', statForum)
  app.use('/v1', readerfile)
  app.use('/v1', notification)
  app.use('/v1', update)
}
