
exports.up = function (knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.boolean('active').notNullable().defaultTo(true);
        table.integer('project_id').notNullable();
        table.integer('assignee_id');
        table.foreign('project_id').references('projects.id');
        table.foreign('assignee_id').references('users.id');
        table.integer('tracked_seconds').notNullable().defaultTo(0);
        table.datetime('created_at', { useTz: false });
        table.datetime('updated_at', { useTz: false });
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tasks');
};
