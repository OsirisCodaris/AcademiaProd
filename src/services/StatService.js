const { Op } = require('sequelize')
const ServerError = require('../config/ServerError')

const {
  Admins,
  Students,
  Teachers,
  Subjects,
  Classes,
  Documents,
  docAnswers,
} = require('../models')

module.exports = {
  async dashboard() {
    try {
      const countAdmins = await Admins.count()
      const countStudents = (await Students.count()) - 37 // apprenant avant le lancement du 4/12/2020
      const countTeachers = (await Teachers.count()) - 15 // professeur avant le lancement du 4/12/2020
      const countClasses = await Classes.count()
      const countSubjects = await Subjects.count()
      const countDocuments = await Documents.count()
      const countDocAnswers = await docAnswers.count({
        where: {
          iddocuments: { [Op.not]: null },
        },
      })

      return {
        countAdmins,
        countStudents,
        countTeachers,
        countClasses,
        countSubjects,
        countDocuments,
        countDocAnswers,
      }
    } catch (errors) {
      throw new ServerError(errors)
    }
  },
}
