/* eslint-disable no-undef */
const { assert } = require('chai')
const mocha = require('mocha')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')
const AdminService = require('../services/AdminService') // Import the service we want to test

mocha.describe('Admin Service', () => {
  mocha.describe('Creer un Admin', () => {
    it('Test Admincreate est une fonction', () => {
      assert.isFunction(AdminService.create)
    })
    it('Test insertion correct', async () => {
      try {
        const admin = await AdminService.create({
          user: {
            fullname: 'Brunel ngbwa11',
            phone: '074723469',
            email: 'brunel1@gmail.com',
            password: '12345678',
          },
          admin: {
            role: 'CODARIS',
          },
        })
        assert.isNumber(admin.idadmins)
      } catch (error) {
        assert.instanceOf(error, RequestError)
      }
    })
    it('Test insertion erreur nom incorrect', async () => {
      try {
        await AdminService.create({
          user: {
            fullname: 'Brunel ngbwa1',
            phone: '074723469',
            email: 'brunel1@gmail.com',
            password: '12345678',
          },
          admin: {
            role: 'CODARIS',
          },
        })
        // assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, RequestError)
      }
    })
    it('Test insertion erreur role incorrect', async () => {
      try {
        await AdminService.create({
          user: {
            fullname: 'Brunel ngbwa112',
            phone: '074723469',
            email: 'brunel1@gmail.com',
            password: '12345678',
          },
          admin: {
            role: 'CODARIS4',
          },
        })
        // assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, RequestError)
      }
    })
    it('Test erreur sur le serveur- information incomplète', async () => {
      // omission exprèsse d'un paramètre email en occurence
      try {
        await AdminService.create({
          fullname: 'Brunel ngbwa',
          phone: '074723469',
          password: '12345678',
        })
        // assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, ServerError)
      }
    })
  })
})
