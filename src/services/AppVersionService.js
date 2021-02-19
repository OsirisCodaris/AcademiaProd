const { appVersions } = require('../models')
// const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async showLast() {
    try {
      const appversion = await appVersions.findOne({
        order: [['createdAt', 'DESC']],
      })
      return appversion
    } catch (errors) {
      console.log(errors)
      return new ServerError(errors)
    }
  },
}
