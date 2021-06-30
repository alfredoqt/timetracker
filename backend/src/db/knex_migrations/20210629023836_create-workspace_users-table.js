
exports.up = function (knex) {
    knex.schema.createTable('workspace_users', function (table) {
        table.increments();
        table.string('invite_url');
        table.boolean('owner').notNullable().defaultTo(true);
        table.boolean('admin').notNullable().defaultTo(true);
        table.string('user_id').references('users.id').notNullable();
        table.string('workspace_id').references('workspaces.id').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('workspace_users');
};
