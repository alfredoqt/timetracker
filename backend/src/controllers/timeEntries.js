const timeEntriesService = require('../services/timeEntries');
const { validationResult } = require('express-validator');
const APIError = require('../errors/apiError');

async function post(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new APIError(400, 'Incorrect fields', 'Check the request fields'));
        return;
    }
    try {
        const entry = await timeEntriesService.post(
            req.body.description,
            req.body.start_ms,
            req.session.user.id,
            req.body.workspace_id,
            req.body.project_id,
            req.body.task_id,
            req.body.tag_ids,
        );
        res.status(201).json(entry);
    } catch (err) {
        // in prod, do not use console.log or console.error
        // use a proper logging library like winston
        console.error(err);
        next(err);
    }
}

module.exports = {
    post,
};
