const authService = require('../services/auth');
const { validationResult } = require('express-validator');
const APIError = require('../errors/apiError');

async function login(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new APIError(400, 'Incorrect fields', 'Check the request fields'));
        return;
    }
    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        req.session.user = user;
        res.sendStatus(204);
    } catch (err) {
        // in prod, do not use console.log or console.error
        // use a proper logging library like winston
        console.error(err);
        next(err);
    }
}

async function register(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new APIError(400, 'Incorrect fields', 'Check the request fields'));
        return;
    }
    const { email, fullname, password } = req.body;

    try {
        const user = await authService.register(email, fullname, password);
        req.session.user = user;
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        next(err);
    }
}

module.exports = {
    login,
    register,
};
