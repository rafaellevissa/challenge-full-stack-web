
exports.up = async function(knex) {
    await knex.schema.table('module_student', table => {
        table.foreign('module_id').references('module.id')
        table.foreign('student_id').references('student.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      })
};

exports.down = async function(knex) {
  await knex.schema.table('module_student', table => {
    table.dropForeign('module_id')
    table.dropForeign('student_id')
    })
};
