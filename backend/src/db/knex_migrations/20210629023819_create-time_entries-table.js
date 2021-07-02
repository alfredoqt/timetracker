
exports.up = function (knex) {
    return knex.schema.createTable('time_entries', function (table) {
        table.increments();
        table.string('description');
        table.datetime('start', { useTz: false }).notNullable();
        table.datetime('stop', { useTz: false });
        table.specificType('tag_ids', 'integer[]').notNullable().defaultTo('{}');
        table.integer('user_id').notNullable();
        table.integer('workspace_id').notNullable();
        table.integer('project_id');
        table.integer('task_id');
        table.foreign('user_id').references('users.id');
        table.foreign('workspace_id').references('workspaces.id');
        table.foreign('project_id').references('projects.id');
        table.foreign('task_id').references('tasks.id');
        table.timestamps();
        table.index(['workspace_id', 'user_id', 'created_at'], 'user_main_workspace_view-timetracker-time_entries');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('time_entries');
};
