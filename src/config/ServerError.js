class ServerError extends Error {
  constructor(errors) {
    super("Une erreur s'est produite")
    this.name = 'ServerError'
    this.stack = errors
    this.status = 500
  }
}
module.exports = ServerError
