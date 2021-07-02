
exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('fullname');
        table.string('email');
        table.string('password_hash');
        table.string('image_url');
        table.string('timezone');
        table.integer('default_workspace_id').notNullable();
        table.foreign('default_workspace_id').references('workspaces.id');
        table.datetime('created_at', { useTz: false });
        table.datetime('updated_at', { useTz: false });
        table.index(['email'], 'email-timetracker-users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
