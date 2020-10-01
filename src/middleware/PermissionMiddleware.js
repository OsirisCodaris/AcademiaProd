exports.OnlyUserOrAdminCanDothis = (req, res, next) => {
  if (
    req.user.idusers === parseInt(req.params.userId, 10) ||
    req.user.role === 'ADMIN'
  ) {
    return next()
  }
  return res.status(403).send({
    error: 'unauthorized',
    status: 403,
  })
}
