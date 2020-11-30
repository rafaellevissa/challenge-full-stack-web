const knex = require('../database/index')

module.exports = {
  async index(req, res, next) {
    try {
      const modules = await knex('module').select('*')
      return res.json(modules)
    } catch (error) {
      next(error)
    }
  },
  async create(req, res, next) {
    try {
      const { name } = req.body
      const [id] = await knex('module').select('*')
        .where({ name })

      if (!id) {
        await knex('module').insert({
          name
        })

        const module = { id, name }
        return res.status(201).json({ msg: 'Successful registration a new module', module })
      }

      return res.status(409).json({ msg: 'Module already registered' })

    } catch (error) {
      next(error)
    }

  },
  async update(req, res, next) {
    try {
      const { id } = req.params

      const {
        name = null,
      } = req.body

      const moduleFromDatabase = await knex('module').select('*').where({
        id
      }).first()

      if (moduleFromDatabase) {
        const moduleNameHasExists = await knex('module').select('*').where({
          name
        }).first()
        if (moduleNameHasExists) {
          return res.status(409).json({ msg: 'Name already registered' })
        }
        moduleFromDatabase.name = name === null ? moduleFromDatabase.name : name
        const newmodule = await knex('module').update(moduleFromDatabase).where({
          id
        })
        if (newmodule === 1) {
          return res.status(200).json({ msg: 'Module update successfully!' })
        }
        return res.status(500).json({ msg: 'Internal server error' })
      }
      return res.status(404).json({ msg: 'module not found' })
    } catch (error) {
      next(error)
    }
  },
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const moduleFromDatabase = await knex('module').select('*').where({
        id
      }).first()

      if (moduleFromDatabase) {
        await knex('module').where({
          id
        }).delete()
        await knex('module').where({ id }).delete()
        return res.status(201).json({ msg: 'Successfully deleted module', moduleFromDatabase })
      }

      return res.status(404).json({ msg: 'Module not found' })

    } catch (error) {
      next(error)
    }
  }
}