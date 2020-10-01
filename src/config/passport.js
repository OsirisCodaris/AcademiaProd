const passport = require('passport')
// eslint-disable-next-line import/order
const { Users } = require('../models')

const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const config = require('./config')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.JWT_SECRET,
      ignoreExpiration: true,
    },
    async (jwtPayload, done) => {
      try {
        const expirationDate = new Date(jwtPayload.exp * 1000)
        if (expirationDate < new Date()) {
          return done('tokenExpired', false)
        }
        const user = await Users.findOne({
          where: {
            idusers: jwtPayload.idusers,
          },
        })
        if (!user) {
          return done(new Error(), false)
        }
        return done(null, user)
      } catch (err) {
        return done(new Error(), false)
      }
    }
  )
)

module.exports = null
