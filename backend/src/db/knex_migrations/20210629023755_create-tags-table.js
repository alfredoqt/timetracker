
exports.up = function (knex) {
    return knex.schema.createTable('tags', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('workspace_id').notNullable();
        table.foreign('workspace_id').references('workspaces.id');
        table.datetime('created_at', { useTz: false });
        table.datetime('updated_at', { useTz: false });
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tags');
};
