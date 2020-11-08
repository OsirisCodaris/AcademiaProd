class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }

  noNameOrInvalid() {
    this.message = `${this.message}: Le nom ne peut être vide et doit contenir au moins 3 caractères`
    this.status = 400
  }

  noEmailOrInvalid() {
    this.message = `${this.message}: Vous avez entrez une adresse mail non valide`
    this.status = 400
  }

  noPasswordOrInvalid() {
    this.message = `${this.message}: Le mot de passe doit contenir entre 8 et 32 caratères`
    this.status = 400
  }

  noPhoneOrInvalid() {
    this.message = `${this.message}: Le numéro de téléphone  est incorrect`
    this.status = 400
  }

  default() {
    this.message = `${this.message}: Les informations que vous avez entrées sont incorrects`
    this.status = 400
  }
}
module.exports = ValidationError
