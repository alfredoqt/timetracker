const APIError = require("../errors/apiError");

function authenticate(req, res, next) {
    if (!req.session || !req.session.user) {
        next(new APIError(401, 'Unauthorized'));
        return;
    }
    next();
}

module.exports = authenticate;
