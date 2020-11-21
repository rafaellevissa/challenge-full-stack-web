const knex = require('../database/index')

module.exports = {
  async index(req, res, next) {
    try {
      const students = await knex('student').select('*')
      return res.json(students)
    } catch (error) {
      next(error)
    }
  },
  async create(req, res, next) {
    try {
      const { name, email, RA, cpf } = req.body
      const [id] = await knex('student').select('*')
        .where({ name })
        .orWhere({ email })
        .orWhere({ RA })
        .orWhere({ cpf })

      if (!id) {
        await knex('student').insert({
          name, email, RA, cpf
        })
        return res.status(201).json({ msg: 'Successful registration a new student', name, email, RA, cpf })
      }

      return res.status(409).json({ msg: 'Student already registered' })

    } catch (error) {
      next(error)
    }

  },
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const studentFromDatabase = await knex('student').select('*').where({
        id
      }).first()

      if (studentFromDatabase) {
        await knex('module_student').where({
          student_id: id
        }).delete()
        await knex('student').where({ id }).delete()
        return res.status(200).json({ msg: 'Student successfully deleted', studentFromDatabase })
      }

      return res.status(404).json({ msg: 'Student not found' })

    } catch (error) {
      next(error)
    }
  }
}