/* eslint-disable no-undef */
const { assert } = require('chai')
const mocha = require('mocha')
const RequestError = require('../config/RequestError')
const ServerError = require('../config/ServerError')
const StudentService = require('../services/StudentService') // Import the service we want to test

mocha.describe('Student Service', () => {
  mocha.describe('Creer un Student', () => {
    it('Test Studentcreate est une fonction', () => {
      assert.isFunction(StudentService.create)
    })
    it('Test insertion correct', async () => {
      const student = await StudentService.create({
        user: {
          fullname: 'Brunel ngbwa11',
          phone: '074723469',
          email: 'brunel1@gmail.com',
          password: '12345678',
        },
        student: {
          idclasses: 1,
        },
      })
      assert.isNumber(student.idstudents)
    })
    it('Test insertion erreur classe incorrect', async () => {
      try {
        await StudentService.create({
          user: {
            fullname: 'Brunel ngbwa1',
            phone: '074723469',
            email: 'brunel1@gmail.com',
            password: '12345678',
          },
          student: {
            idclasses: 189, // classe qui n'existe pas
          },
        })
        // assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, RequestError)
        assert.equal(error.message, 'Classe: supprimé·e ou introuvable')
      }
    })
    it('Test erreur sur le serveur- information incomplète', async () => {
      // omission exprèsse d'un paramètre email en occurence
      try {
        await StudentService.create({
          fullname: 'Brunel ngbwa',
          phone: '074723469',
          password: '12345678',
        })
        // assert.isNumber(user.idusers)
      } catch (error) {
        assert.instanceOf(error, ServerError)
        assert.equal(error.message, "Une erreur s'est produite")
      }
    })
  })
})
