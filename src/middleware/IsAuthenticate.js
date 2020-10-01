const passport = require('passport')
const userUtils = require('../utils/UserUtils')

module.exports = (req, res, next) => {
  passport.authenticate('jwt', async (err, user) => {
    if (err || !user) {
      if (err === 'tokenExpired') {
        res.status(401).send({
          error: 'le token a expiré',
          status: 401,
        })
      } else {
        res.status(403).send({
          message: `vous n'avez le droit d'accéder a cette ressource`,
        })
      }
    } else {
      req.user = user
      req.user.role = await userUtils.UserRole(user)
      next()
    }
  })(req, res, next)
}
