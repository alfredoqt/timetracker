
exports.up = function (knex) {
    knex.schema.createTable('tags', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('workspace_id').references('workspaces.id').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('tags');
};
