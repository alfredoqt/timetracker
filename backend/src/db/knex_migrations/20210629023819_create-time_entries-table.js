
exports.up = function (knex) {
    knex.schema.createTable('time_entries', function (table) {
        table.increments();
        table.string('description');
        table.datetime('start', { useTz: false }).notNullable();
        table.datetime('stop', { useTz: false });
        table.specificType('tag_ids', 'integer[]').notNullable().defaultTo([]);
        table.string('user_id').references('users.id').notNullable();
        table.string('workspace_id').references('workspaces.id').notNullable();
        table.string('project_id').references('projects.id');
        table.string('task_id').references('tasks.id');
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('time_entries');
};
