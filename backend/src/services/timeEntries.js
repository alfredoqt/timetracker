const timeEntryModel = require('../dao/timeEntry');
const APIError = require('../errors/apiError');

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
    post,
};
