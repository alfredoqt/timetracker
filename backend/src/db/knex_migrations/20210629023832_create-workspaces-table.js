
exports.up = function (knex) {
    return knex.schema.createTable('workspaces', function (table) {
        table.increments();
        table.string('logo_url');
        table.string('name').notNullable();
        table.datetime('created_at', { useTz: false });
        table.datetime('updated_at', { useTz: false });
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('workspaces');
};
