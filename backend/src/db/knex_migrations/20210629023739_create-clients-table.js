
exports.up = function (knex) {
    return knex.schema.createTable('clients', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('workspace_id').notNullable();
        table.foreign('workspace_id').references('workspaces.id');
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('clients');
};
