
exports.up = function (knex) {
    return knex.schema.createTable('workspace_users', function (table) {
        table.increments();
        table.string('invite_url');
        table.boolean('owner').notNullable().defaultTo(true);
        table.boolean('admin').notNullable().defaultTo(true);
        table.integer('user_id').notNullable();
        table.integer('workspace_id').notNullable();
        table.foreign('user_id').references('users.id');
        table.foreign('workspace_id').references('workspaces.id');
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('workspace_users');
};
