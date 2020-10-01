const { Teachers, Subjects } = require('../models')

module.exports = {
  async create(req, res) {
    try {
      const subject = await Subjects.findByPk(req.body.teacher.idsubjects)
      if (!subject) {
        return res.status(400).send({
          error: "La matière n'existe pas ou a été supprimé",
          status: 400,
        })
      }

      await Teachers.create({
        city: req.body.teacher.city,
        classes: req.body.teacher.classes,
        phone2: req.body.teacher.phone2,
        tutor: req.body.teacher.tutor,
        idsubjects: subject.idsubjects,
        idteachers: req.user.idusers,
      })
      return res.status(201).send({
        idusers: req.user.idusers,
      })
    } catch (errors) {
      return res
        .status(500)
        .send({ error: `Une erreur s'est produite`, status: 500 })
    }
  },
}
