const jwt = require('jsonwebtoken')
const { Users } = require('../models')
const config = require('../config/config')

function jwtSignUser(user, expires) {
  return jwt.sign(user, config.JWT_SECRET, {
    expiresIn: expires,
  })
}
module.exports = {
  async token(req, res) {
    try {
      const currentUser = req.user
      if (req.body.token === currentUser.refreshtoken) {
        const userJson = {
          idusers: currentUser.idusers,
          fullname: currentUser.fullname,
          role: currentUser.role,
        }
        const refreshToken = jwtSignUser(userJson, config.JWT_REFRESH)
        currentUser.refreshtoken = refreshToken
        await currentUser.save()
        return res.send({
          token: jwtSignUser(userJson, config.JWT_TOKEN),
          refreshToken,
        })
      }
      return res.status(401).send({
        error: `Veuillez vous reconnectez`,
        status: 401,
      })
    } catch (err) {
      return res.status(500).send({
        error: `Une s'est produite sur le serveur !${err}`,
      })
    }
  },
  async login(req, res) {
    try {
      const { fullname, password } = req.body
      const user = await Users.findOne({
        where: {
          fullname,
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
        user.role = 'ADMIN'
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
}
