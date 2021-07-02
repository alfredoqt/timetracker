const knex = require('../db/knex');

class WorkspaceModel {

    async createWorkspace(name) {
        const inserted = await knex('workspaces')
            .returning('id')
            .insert({
                name,
            });
        return inserted[0];
    }

}

module.exports = new WorkspaceModel();
