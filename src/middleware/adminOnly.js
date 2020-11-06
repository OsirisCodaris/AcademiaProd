module.exports = (req, res, next) => {
  if (req.user.role === 'ACADEMIA' || req.user.role === 'CODARIS') {
    return next()
  }
  return res.status(403).send({
    error: 'Unauthorized',
    status: 403,
  })
}
