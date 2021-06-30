
exports.up = function (knex) {
    knex.schema.createTable('tasks', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.string('project_id').references('projects.id').notNullable();
        table.string('assignee_id').references('users.id');
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
};
