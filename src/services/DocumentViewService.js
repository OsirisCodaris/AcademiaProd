const { Documents, documentsViews } = require('../models')
const ServerError = require('../config/ServerError')
// const sequelize = require('sequelize')

module.exports = {
  async viewDoc(file, user) {
    try {
      const document = await Documents.findOne({ where: { pathfile: file } })
      const docView = await documentsViews.findOne({
        where: { idusers: user.idusers, iddocuments: document.iddocuments },
      })
      if (docView) {
        await docView.update({
          countviews: docView.countviews + 1,
        })
      } else {
        await document.addUserViews(user)
      }
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
}
