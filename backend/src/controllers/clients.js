const clientsService = require('../services/clients');
const { validationResult } = require('express-validator');
const APIError = require('../errors/apiError');

async function post(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new APIError(400, 'Incorrect fields', 'Check the request fields'));
        return;
    }
    try {
        const entry = await clientsService.post(
            req.body.name,
            req.body.workspace_id,
        );
        res.status(201).json(entry);
    } catch (err) {
        // in prod, do not use console.log or console.error
        // use a proper logging library like winston
        console.error(err);
        next(err);
    }
}

async function put(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new APIError(400, 'Incorrect fields', 'Check the request fields'));
        return;
    }
    try {
        const entry = await clientsService.put(
            req.params.id,
            req.body.name,
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
    put,
};
