
exports.up = function (knex) {
    knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('fullname');
        table.string('email');
        table.string('password_hash');
        table.string('image_url');
        table.string('timezone');
        table.foreign('default_workspace_id').references('workspaces.id').notNullable();
        table.timestamps();
        table.index(['email'], 'email-timetracker-users');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
