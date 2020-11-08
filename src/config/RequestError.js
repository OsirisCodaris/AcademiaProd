class RequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'request error'
  }

  Exist() {
    this.message = `${this.message}: exite déja`
    this.status = 400
  }

  notExistOrDelete() {
    this.message += ': supprimé·e ou introuvable'
    this.status = 404
  }
}
module.exports = RequestError
