const knex = require('../db/knex');

class WorkspaceUserModel {

    async createWorkspaceUser(user_id, workspace_id) {
        const inserted = await knex('workspace_users')
            .returning('id')
            .insert({
                user_id,
                workspace_id,
            });
        return inserted[0];
    }

}

module.exports = new WorkspaceUserModel();
