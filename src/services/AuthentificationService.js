const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const { Users } = require('../models')
const config = require('../config/config')
const { Mailer } = require('../utils/Mailer')

function jwtSignUser(user, expires) {
  return jwt.sign(user, config.JWT_SECRET, {
    expiresIn: expires,
  })
}
module.exports = {
  async token(req, res) {
    try {
      jwt.verify(req.body.refresh_token, config.JWT_SECRET)

      const currentUser = await Users.findOne({
        where: {
          refreshtoken: req.body.refresh_token,
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
        return res.status(201).send({
          token: jwtSignUser(userJson, config.JWT_TOKEN),
          refreshToken,
        })
      }
      return res.status(401).send({
        error: `Veuillez vous reconnectez`,
        status: 401,
      })
    } catch (err) {
      return res.status(401).send({
        error: `Une s'est produite sur le serveur !${err}`,
      })
    }
  },
  async login(req, res) {
    try {
      const { fullname, password } = req.body
      const user = await Users.findOne({
        where: {
          [Op.or]: [{ fullname }, { email: fullname }],
        },
      })
      if (!user) {
        return res.status(400).send({
          message: 'Les informations envoyées sont incorrects',
        })
      }
      const isValidPassword = await user.comparePassword(password)
      if (!isValidPassword) {
        return res.status(400).send({
          message: 'Les informations envoyées sont incorrects',
        })
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
      return res.send({
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
      })
    } catch (err) {
      return res.status(500).send({
        error: `une erreur s'est produit réessayer plus tard ${err}`,
      })
    }
  },
  async resetPassword(req, res) {
    try {
      const userExist = await Users.findOne({
        where: {
          email: req.body.email,
        },
      })
      if (!userExist) {
        // si une instance de cet utilisateur existe déja on renvoie une erreur
        return res.status(404).send({
          error: `Cet email n'existe pas!`,
          status: 404,
        })
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
      const subject= 'ACADEMIA GABON: Réinitialisation du mot de passe'
      const text="Vous recevez cela parce que vous (ou quelqu'un d'autre) avez demandé la réinitialisation du mot de passe de votre compte\n" +'Veuillez cliquer sur le lien suivant ou collez-le dans votre navigateur pour terminer le processus\n\n' +`${config.FRONT_URL}/password/${resetToken}  \n\n` +` Si vous ne l'avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé`
    
      Mailer("administrator@academiagabon.ga",userExist.email,subject,text)
      return res.status(200).json({
        message: `Nous vous avons envoyé un mail pour poursuivre la réinitialisation.`,
      })
    } catch (error) {
      return res.status(500).send({
        error: `une erreur s'est produit réessayer plus tard ${error}`,
      })
    }
  },
  async newPassword(req, res) {
    try {
      const { resetToken, password } = req.body
      const currentUser = await Users.findOne({
        where: {
          refreshtoken: resetToken,
        },
      })
      if (!currentUser) {
        return res.status(404).send({
          error: 'la clé de réinitialisation a expiré',
        })
      }
      if (password.lenght < 8) {
        return res.status(400).send({
          error: 'Le mot de passe doit contenir au moins 8 caractères',
        })
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
      return res.status(201).send({
        message: 'le mot de passe a été modifié',
      })
    } catch (err) {
      return res.status(500).send({
        error: `une erreur s'est produit réessayer plus tard ${err}`,
      })
    }
  },
}
