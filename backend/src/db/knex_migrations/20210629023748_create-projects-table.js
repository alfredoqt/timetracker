
exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('client_id');
        table.integer('workspace_id').notNullable();
        table.foreign('client_id').references('clients.id');
        table.foreign('workspace_id').references('workspaces.id');
        table.datetime('created_at', { useTz: false });
        table.datetime('updated_at', { useTz: false });
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
