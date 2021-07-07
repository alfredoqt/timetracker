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

    async getByUserAndWorskpace(
        user_id,
        workspace_id,
        limit,
        next_cursor,
    ) {
        const data = await knex('time_entries')
            .where('user_id', user_id)
            .andWhere('workspace_id', workspace_id)
            .andWhere('start', '<', next_cursor)
            .select('*')
            .orderBy('start', 'desc')
            .limit(limit + 1);

        let newNextCursor = null;

        if (data.length === limit + 1) {
            newNextCursor = data[limit].start;
        }

        return {
            data: data.slice(0, limit),
            next_cursor: newNextCursor,
        };
    }

}

module.exports = new TimeEntryModel();
