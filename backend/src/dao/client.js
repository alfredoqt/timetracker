const knex = require('../db/knex');

class ClientModel {

    async create(
        name,
        workspace_id,
    ) {
        const inserted = await knex('clients')
            .returning('*')
            .insert({
                name,
                workspace_id,
            });
        return inserted[0];
    }

    async update(
        id,
        name,
    ) {
        const updated = await knex('clients')
            .where('id', id)
            .returning('*')
            .update({
                name,
            });
        return updated[0];
    }

}

module.exports = new ClientModel();
