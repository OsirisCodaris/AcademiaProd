/* eslint-disable no-undef */
const { assert } = require('chai')
const mocha = require('mocha')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')
const UserService = require('../services/UserService') // Import the service we want to test

mocha.describe('User Service', () => {
  mocha.describe('Creer un User', () => {
    it('Test Usercreate est une fonction', () => {
      assert.isFunction(UserService.create)
    })
    it('Test insertion correct', async () => {
      try {
        const user = await UserService.create({
          fullname: 'Brunel ngbwa1',
          phone: '074723469',
          email: 'brunel1@gmail.com',
          password: '12345678',
        })
        assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, RequestError)
      }
    })
    it('Test insertion erreur nom incorrect', async () => {
      try {
        await UserService.create({
          fullname: 'Brunel ngbwa',
          phone: '074723469',
          email: 'brunel1@gmail.com',
          password: '12345678',
        })
        // assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, RequestError)
      }
    })
    it('Test erreur sur le serveur- information incomplète', async () => {
      // omission exprèsse d'un paramètre email en occurence
      try {
        await UserService.create({
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
