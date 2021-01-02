const { ValidationError, Op } = require('sequelize')
const { Users } = require('../models')
const userUtils = require('../utils/UserUtils')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async create(User) {
    try {
      const userExist = await Users.findOne({
        where: {
          [Op.or]: [{ fullname: User.fullname }, { email: User.email }],
        },
      })
      if (userExist) {
        // si une instance de cet utilisateur existe déja on renvoie une erreur
        if (await userUtils.UserRole(userExist)) {
          const errorMessage =
            userExist.fullname === User.fullname ? 'nom' : 'email'
          const error = new RequestError(`Utilisateur - ${errorMessage}`)
          error.Exist()
          throw error
          // return { error: `${errorMessage} existe déja`, success: false }
        }
        await userExist.destroy()
      }
      const user = await Users.create(User)
      return user
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async update(id, User) {
    try {
      const userExist = await Users.findByPk(id)
      if (!userExist) {
        // si une instance de cet utilisateur existe déja on renvoie une erreur
        const error = new RequestError(`Utilisateur`)
        error.notExistOrDelete()
        throw error
      }
      await userExist.update(User)
      return User
    } catch (errors) {
      if (errors instanceof ValidationError) {
        const errorMessage =
          errors.errors[0].path === 'fullname' ? 'nom' : 'email'
        const error = new RequestError(`Utilisateur - ${errorMessage}`)
        error.Exist()
        throw error
      }
      throw new ServerError(errors)
    }
  },
}
