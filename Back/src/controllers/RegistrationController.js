const knex = require('../database/index')

module.exports = {
  async index(req, res, next) {
    try {
      const modules = await knex('module_student')
        .join('student', 'student.id', '=', 'module_student.student_id')
        .join('module', 'module.id', '=', 'module_student.module_id')
        .select([
          'student.RA',
          'module.name',
          'module_student.module_id',
          'module_student.id',
        ])

      if (modules.length === 0) {
        return res.status(404).json(modules)
      }

      const moduleResponse = modules.map(modules => {
        student_RA = modules.RA
        module_name = modules.name
        module_id = modules.id
        module_registration_id = modules.module_id
        return { student_RA, module_name, module_id, module_registration_id }
      })
      return res.status(200).json(moduleResponse)
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

      const userRegistered = await knex('module_student').where({
        module_id: moduleInDatabase.id,
        student_id: studentInDatabase.id
      }).first()

      if (userRegistered) {
        return res.status(409).json({ msg: 'Student already registered' })
      }
      await knex('module_student').insert({
        module_id: moduleInDatabase.id,
        student_id: studentInDatabase.id
      })
      return res.json({ msg: 'User successfully registered' })
    } catch (error) {
      next(error)
    }
  },
  async listAUniqueStudentRegistration(req, res, next) {
    try {
      const { RA } = req.params

      const studentInDatabase = await knex('student').select('*')
        .where({ RA }).first()

      if (!studentInDatabase) {
        return res.status(404).json({ msg: 'Student not found' })
      }

      const modulesInDatabase = await knex('module_student').select('module.name')
        .where({
          student_id: studentInDatabase.id
        })
        .join('module', 'module.id', '=', 'module_student.module_id')

      if (modulesInDatabase.length === 0) {
        return res.status(406).json({ msg: 'Modules not registered' })
      }
      const studentAndModules = [{ studentName: studentInDatabase.name }, ...modulesInDatabase]
      return res.status(200).json(studentAndModules)
    } catch (error) {
      next(error)
    }
  },
  async listAllStudentRegistration(req, res, next) {
    try {
      const { module_name } = req.params

      const moduleInDatabase = await knex('module').select('*')
        .where({ name: module_name }).first()

      if (!moduleInDatabase) {
        return res.status(404).json({ msg: 'Module not found' })
      }

      const studentsInDatabase = await knex('module_student').select('student.name', 'student.email', 'student.RA', 'student.cpf')
        .where({
          module_id: moduleInDatabase.id
        })
        .join('student', 'student.id', '=', 'module_student.student_id')

      if (studentsInDatabase.length === 0) {
        return res.status(406).json({ msg: 'Students not registered' })
      }

      const studentAndModules = [{ moduleName: moduleInDatabase.name }, ...studentsInDatabase]
      return res.status(200).json(studentAndModules)
    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const registration = await knex('module_student').select('*').where({
        id
      }).first()

      if (registration) {
        await knex('module_student').where({
          id
        }).delete()
        await knex('module_student').where({ id }).delete()
        return res.status(200).json({ msg: 'Successfully deleted registration', registration })
      }

      return res.status(404).json({ msg: 'Registration not found' })

    } catch (error) {
      next(error)
    }
  }
}