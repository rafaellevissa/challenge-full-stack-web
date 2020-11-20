const knex = require('../database/index')

module.exports = {
  async index(req, res, next) {
    try {
      const modules = await knex('module_student')
        .join('student', 'student.id', '=', 'module_student.student_id')
        .join('module', 'module.id', '=', 'module_student.module_id')
        .select([
          'student.cpf',
          'module.name'
        ])
      return res.json(modules)
    } catch (error) {
      next(error)
    }

  },
  async create(req, res, next) {
    try {
      const { RA, module_name } = req.body

      const studentInDatabase = await knex('student').select('*')
        .where({ RA }).first()


      if (!studentInDatabase) {
        return res.status(404).json({ msg: 'Student not found' })
      }

      const moduleInDatabase = await knex('module').select('*')
        .where({
          name: module_name
        }).first()
      if (!moduleInDatabase) {
        return res.status(404).json({ msg: 'Module not found' })
      }

      const module_student = await knex('module_student').insert({
        module_id: moduleInDatabase.id,
        student_id: studentInDatabase.id
      })
      return res.json(module_student)
    } catch (error) {
      next(error)
    }
  },
  async listAUniqueStudentRegistration(req, res, next) {
    try {
      const { RA } = req.body

      const studentInDatabase = await knex('student').select('*')
        .where({ RA }).first()

      if (!studentInDatabase) {
        return res.status(404).json({ msg: 'Student not found' })
      }

      const modulesInDatabase = await knex('module_student').select('*')
        .where({
          student_id: studentInDatabase.id
        })
        .join('module', 'module.id', '=', 'module_student.module_id')

      if (!!modulesInDatabase) {
        return res.status(404).json({ msg: 'Modules not registered' })
      }

      const studentAndModules = [{ studentName: studentInDatabase.name }, ...modulesInDatabase]
      return res.json(studentAndModules)
    } catch (error) {
      next(error)
    }
  },
  async listAllStudentRegistration(req, res, next) {
    try {
      const { module_name } = req.body

      const moduleInDatabase = await knex('module').select('*')
        .where({ name: module_name }).first()

      if (!moduleInDatabase) {
        return res.status(404).json({ msg: 'Module not found' })
      }

      const studentsInDatabase = await knex('module_student').select('*')
        .where({
          module_id: moduleInDatabase.id
        })
        .join('student', 'student.id', '=', 'module_student.student_id')

      if (!!studentsInDatabase) {
        return res.status(404).json({ msg: 'Students not registered' })
      }

      const studentAndModules = [{ moduleName: moduleInDatabase.name }, ...studentsInDatabase]
      return res.json(studentAndModules)
    } catch (error) {
      next(error)
    }
  }
}