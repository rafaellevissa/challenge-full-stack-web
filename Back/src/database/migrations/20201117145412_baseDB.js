exports.up = async function (knex) {
  await knex.schema.createTable('module', table => {
    table.increments('id')
    table.string('name').notNullable();
    table.charset('utf8')
    table.engine('InnoDB')
    table.collate('utf8_unicode_ci')
  })



  await knex.schema.createTable('student', table => {
    table.increments('id')
    table.string('name').notNullable().unique();
    table.string('email').notNullable().unique();
    table.integer('RA').notNullable().unique();
    table.integer('cpf').notNullable().unique();
    table.charset('utf8')
    table.engine('InnoDB')
    table.collate('utf8_unicode_ci')
  })

  await knex.schema.createTable('module_student', table => {
    table.increments('id')
    table.integer('module_id').unsigned().notNullable();
    table.integer('student_id').unsigned().notNullable();
    table.charset('utf8')
    table.engine('InnoDB')
    table.collate('utf8_unicode_ci')
  })
};
exports.down = async function (knex) {
  await knex.schema.dropTable('module_student')
  await knex.schema.dropTable('student')
  await knex.schema.dropTable('module')
};