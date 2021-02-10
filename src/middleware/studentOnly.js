module.exports = (req, res, next) => {
  if (req.user.role === 'STUDENT') {
    return next()
  }
  return res.status(400).send({
    error: 'Seuls les apprenants peuvent effectués cette requête ',
    status: 400,
  })
}
