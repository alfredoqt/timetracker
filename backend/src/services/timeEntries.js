const timeEntryModel = require('../dao/timeEntry');
const APIError = require('../errors/apiError');

async function get(
    user_id,
    workspace_id,
    limit,
    next_cursor,
) {
    try {
        if (next_cursor === '') {
            return {
                time_entries: [],
                next_cursor: '',
            };
        }
        // Date only contains ASCII
        const decodedCursor = Buffer.from(next_cursor, 'base64')
            .toString('ascii')
            .split('next___')[1];
        const entries = await timeEntryModel.getByUserAndWorskpace(
            user_id,
            workspace_id,
            limit,
            decodedCursor,
        );
        return {
            time_entries: entries.data,
            next_cursor: entries.next_cursor === null ?
                '' :
                Buffer.from(`next___${entries.next_cursor}`).toString('base64'),
        };
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

async function post(
    description,
    start_ms,
    user_id,
    workspace_id,
    project_id,
    task_id,
    tag_ids,
) {
    try {
        // TODO: In the future, validate tag ids
        const newEntry = await timeEntryModel.createTimeEntry(
            description,
            start_ms,
            user_id,
            workspace_id,
            project_id,
            task_id,
            tag_ids,
        );
        return newEntry;
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

module.exports = {
    get,
    post,
};
