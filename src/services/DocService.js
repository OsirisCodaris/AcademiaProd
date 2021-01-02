const fs = require('fs')
const path = require('path')
const DocAnswserService = require('./DocAnsService')
const NotionService = require('./NotionService')
const DocHasSubjectHasClass = require('./DocHasSubjectHasClass')
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
  async create(DocCreate) {
    try {
      const { name } = DocCreate
      const docVerif = await Documents.findOne({
        where: {
          name,
        },
      })
      const typeDocVerif = await typeDocs.findByPk(DocCreate.idtypedocs)
      if (!typeDocVerif) {
        fs.unlink(path.join(config.doc.path, DocCreate.pathfile), (err) => {
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
        fs.unlink(path.join(config.doc.path, DocCreate.pathfile), (err) => {
          if (err) {
            /* do something */
          }
        })
        const error = new RequestError('Document - nom')
        error.Exist()
        throw error
      }
      const doc = await Documents.create(DocCreate)
      await DocAnswserService.create(doc, DocCreate)
      await NotionService.create(doc, DocCreate)
      const errors = await DocHasSubjectHasClass.associate(doc, DocCreate)

      return { doc, errors }
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async showAll() {
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
      return docs
    } catch (errors) {
      throw new ServerError(errors)
    }
  },

  async show(id) {
    try {
      const doc = await Documents.findByPk(id, {
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
      return doc
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async update(id, DocUpdate) {
    try {
      const docVerif = await Documents.findByPk(id)
      if (!docVerif) {
        const error = new RequestError('Document')
        error.notExistOrDelete()
        throw error
      }
      await Documents.update(DocUpdate, {
        where: { iddocuments: id },
      })
      await DocAnswserService.update(id, DocUpdate)
      await NotionService.update(id, DocUpdate)
      await DocHasSubjectHasClass.associate(docVerif, DocUpdate)
      return docVerif
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
  async delete(id) {
    try {
      const doc = await Documents.destroy({
        where: {
          iddocuments: id,
        },
      })
      if (doc) {
        return true
      }
      const error = new RequestError('Document')
      error.notExistOrDelete()
      throw error
    } catch (errors) {
      if (errors instanceof RequestError) {
        throw errors
      }
      throw new ServerError(errors)
    }
  },
}
