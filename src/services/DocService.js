const fs = require('fs')
const path = require('path')
const {
  Documents,
  typeDocs,
  docAnswers,
  Notions,
  subjectsHasClasses,
} = require('../models')
const config = require('../config/config')
// const sequelize = require('sequelize')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')

module.exports = {
  async created(req, res, next) {
    try {
      const { name } = req.body
      const docVerif = await Documents.findOne({
        where: {
          name,
        },
      })
      const typeDocVerif = await typeDocs.findByPk(req.body.idtypedocs)
      if (!typeDocVerif) {
        fs.unlink(path.join(config.doc.path, req.body.pathfile), (err) => {
          if (err) {
            /* do something */
          }
        })
        const error = new RequestError('Catégories')
        error.notExistOrDelete()
        throw error
      }
      if (docVerif) {
        // suppression des fichier transfererdans le serveur au cas ou la création n'aboutit pas
        fs.unlink(path.join(config.doc.path, req.body.pathfile), (err) => {
          if (err) {
            /* do something */
          }
        })
        const error = new RequestError('Nom')
        error.Exist()
        throw error
      }
      const doc = await Documents.create(req.body)
      req.doc = doc
      return next()
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
  async showAll(req, res, next) {
    try {
      const docs = await Documents.findAndCountAll({
        order: [['iddocuments', 'DESC']],
        include: [
          {
            model: docAnswers,
          },
          {
            model: Notions,
          },
        ],
      })
      return res.send(docs)
    } catch (errors) {
      return next(new ServerError(errors))
    }
  },

  async show(req, res, next) {
    try {
      const doc = await Documents.findByPk(req.params.id, {
        include: [
          {
            model: docAnswers,
          },
          {
            model: subjectsHasClasses,
            as: 'docInSubjectClasses',
          },
          {
            model: Notions,
          },
        ],
      })
      if (!doc) {
        const error = new RequestError('Document')
        error.notExistOrDelete()
        throw error
      }
      /* if (doc.price) {
        // on verifie si l'utilisateur a le droit de lire le document
        const { user } = req
        const userHasSubscribe = user.Subscription.expiredDate() // true si l'utilisateur est a un abonnement valide
        const usercanReadit = await user.hasUserBuy(doc) // true s'il a payer le livre
        if (!userHasSubscribe && !usercanReadit) {
          // On entre ici s'il ne peut pas consulter le document c-a-d l'abonnement n'est plus valide et il n'a pas payer le document
          return res.status(403).send({
            error:
              'Désolée vous ne pouvez pas accéder a cette ressource sans abonnement ou achat effectuer',
          })
        }
        // enregistre la lecture de l'utilisateur
        await doc.addDocumentsRead(user)
      } */
      return res.send({ doc })
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
  async updated(req, res, next) {
    try {
      const docVerif = await Documents.findByPk(req.params.id)
      if (!docVerif) {
        const error = new RequestError('Document')
        error.notExistOrDelete()
        throw error
      }
      await Documents.update(req.body, {
        where: { iddocuments: req.params.id },
      })
      req.doc = docVerif
      return next()
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
  async deleted(req, res, next) {
    try {
      const doc = await Documents.destroy({
        where: {
          iddocuments: req.params.id,
        },
      })
      if (doc) {
        return res.sendStatus(204)
      }
      const error = new RequestError('Document')
      error.notExistOrDelete()
      throw error
    } catch (errors) {
      if (errors instanceof RequestError) {
        return next(errors)
      }
      return next(new ServerError(errors))
    }
  },
}
