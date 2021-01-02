class RequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'requesterror'
  }

  Exist() {
    this.message = `${this.message}: exite déja`
    this.status = 400
  }

  noRole() {
    this.message = `${this.message}: le role n'est pas défini`
    this.status = 400
  }

  Empty() {
    this.message = `${this.message}: la liste est vide`
    this.status = 400
  }

  notExistOrDelete() {
    this.message += ': supprimé·e ou introuvable'
    this.status = 404
  }

  unAuthorized() {
    this.message += ": Vous n'avez pas le droit d'acceder a cette ressource"
    this.status = 401
  }

  expiredKey() {
    this.message += ': a expiré ou introuvable'
    this.status = 404
  }
}
module.exports = RequestError
