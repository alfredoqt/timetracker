
exports.up = function (knex) {
    knex.schema.createTable('projects', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('client_id').references('clients.id');
        table.string('workspace_id').references('workspaces.id').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('projects');
};
