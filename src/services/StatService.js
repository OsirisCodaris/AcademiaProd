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
  async dasboard(req, res) {
    try {
      const countAdmins = await Admins.count()
      const countStudents = await Students.count()
      const countTeachers = await Teachers.count()
      const countClasses = await Classes.count()
      const countSubjects = await Subjects.count()
      const countDocuments = await Documents.count()
      const countDocAnswers = await docAnswers.count()

      return res.status(201).send({
        countAdmins,
        countStudents,
        countTeachers,
        countClasses,
        countSubjects,
        countDocuments,
        countDocAnswers,
      })
    } catch (errors) {
      return res
        .status(400)
        .send({ error: "Une erreur s'est produite", status: 400 })
    }
  },
}
