const knex = require('../db/knex');

class TimeEntryModel {

    async createTimeEntry(
        description,
        start_ms,
        user_id,
        workspace_id,
        project_id,
        task_id,
        tag_ids,
    ) {
        const inserted = await knex('time_entries')
            .returning('*')
            .insert({
                description,
                user_id,
                workspace_id,
                project_id,
                start: new Date(start_ms),
                tag_ids: tag_ids,
                task_id: task_id,
            });
        return inserted[0];
    }

}

module.exports = new TimeEntryModel();
