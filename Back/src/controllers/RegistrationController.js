const knex = require('../database/index')

module.exports = {
  async create(req, res, next) {
    return res.json({ msg: 'aluno matriculado' })
  }
}