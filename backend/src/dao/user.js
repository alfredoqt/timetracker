const knex = require('../db/knex');

class UserModel {

    findUserByEmail(email) {
        return knex('users')
            .where('email', email)
            .select('*')
            .first();
    }

    async createUser(email, fullname, password_hash, default_workspace_id) {
        const inserted = await knex('users')
            .returning('id')
            .insert({
                email,
                fullname,
                password_hash,
                default_workspace_id,
            });
        return inserted[0];
    }

    findUserById(id) {
        return knex('users')
            .where('id', id)
            .select('*')
            .first();
    }

}

module.exports = new UserModel();
