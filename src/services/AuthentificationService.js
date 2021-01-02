const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { Users } = require('../models')
const config = require('../config/config')
const { Mailer } = require('../utils/Mailer')
const RequestError = require('../config/RequestError')

const ValidationError = require('../config/ValidationError')
const ServerError = require('../config/ServerError')

function jwtSignUser(user, expires) {
  return jwt.sign(user, config.JWT_SECRET, {
    expiresIn: expires,
  })
}
module.exports = {
  async token(Token) {
    try {
      jwt.verify(Token.refresh_token, config.JWT_SECRET)

      const currentUser = await Users.findOne({
        where: {
          refreshtoken: Token.refresh_token,
        },
      })
      if (currentUser) {
        const userJson = {
          idusers: currentUser.idusers,
          fullname: currentUser.fullname,
          role: currentUser.role,
        }
        const refreshToken = jwtSignUser(userJson, config.JWT_REFRESH)
        // currentUser.refreshtoken = refreshToken
        await currentUser.update({ refreshtoken: refreshToken })
        return {
          token: jwtSignUser(userJson, config.JWT_TOKEN),
          refreshToken,
        }
      }
      const error = new RequestError(`Utilisateur`)
      error.unAuthorized()
      throw error
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async login(User) {
    try {
      const { fullname, password } = User
      const user = await Users.findOne({
        where: {
          [Op.or]: [{ fullname }, { email: fullname }],
        },
      })
      if (!user) {
        const error = new ValidationError(`Utilisateur`)
        error.default()
        throw error
      }
      const isValidPassword = await user.comparePassword(password)
      if (!isValidPassword) {
        const error = new ValidationError(`Utilisateur`)
        error.default()
        throw error
      }

      const isAdmin = await user.getAdmin()
      const isStudent = await user.getStudent()
      const isTeacher = await user.getTeacher()
      if (isAdmin) {
        user.role = isAdmin.role
      } else if (isStudent) {
        user.role = 'STUDENT'
      } else if (isTeacher) {
        user.role = 'TEACHER'
      } else {
        user.role = 'UNDEFINED'
      }

      const userJson = {
        idusers: user.idusers,
        fullname: user.fullname,
        role: user.role,
      }
      const token = jwtSignUser(userJson, config.JWT_TOKEN)
      const refreshToken = jwtSignUser(userJson, config.JWT_REFRESH)
      user.refreshtoken = refreshToken
      await user.save()
      return {
        idusers: user.idusers,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        // eslint-disable-next-line no-nested-ternary
        module: isStudent
          ? isStudent.idclasses
          : isTeacher
          ? isTeacher.idsubjects
          : undefined,
        role: user.role,
        token,
        refreshToken,
      }
    } catch (errors) {
      if (errors instanceof ValidationError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async resetPassword(email) {
    try {
      const userExist = await Users.findOne({
        where: {
          email,
        },
      })
      if (!userExist) {
        // si une instance de cet utilisateur existe déja on renvoie une erreur
        const error = new RequestError(`Utilisateur - email`)
        error.notExistOrDelete()
        throw error
      }

      if (!userExist.refreshtoken) {
        const userJson = {
          idusers: userExist.idusers,
          fullname: userExist.fullname,
          role: userExist.role,
        }
        const refreshToken = jwtSignUser(userJson, config.JWT_REFRESH)
        userExist.refreshtoken = refreshToken
        await userExist.save()
      }
      const resetToken = userExist.refreshtoken
      const subject = 'ACADEMIA GABON: Réinitialisation du mot de passe'
      const text =
        "Vous recevez cela parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte\n" +
        'Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus\n\n' +
        `${config.FRONT_URL}/password/${resetToken}  \n\n` +
        ` Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé`

      Mailer('administrator@academiagabon.ga', userExist.email, subject, text)
      return true
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async newPassword(User) {
    try {
      const { resetToken, password } = User
      const currentUser = await Users.findOne({
        where: {
          refreshtoken: resetToken,
        },
      })
      if (!currentUser) {
        const error = new RequestError(`Utilisateur`)
        error.expiredKey()
        throw error
      }
      if (password.length < 8) {
        const error = new ValidationError(`Utilisateur`)
        error.noPasswordOrInvalid()
        throw error
      }
      const userJson = {
        idusers: currentUser.idusers,
        fullname: currentUser.fullname,
        role: currentUser.role,
      }
      const refreshToken = jwtSignUser(userJson, config.JWT_REFRESH)
      // currentUser.refreshtoken = refreshToken
      await currentUser.update({
        refreshtoken: refreshToken,
        password,
      })
      return true
    } catch (errors) {
      if (errors instanceof RequestError || errors instanceof ValidationError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
