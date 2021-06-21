const APIError = require('../errors/apiError');

function apiErrorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof APIError) {
        res.status(err.statusCode).json({
            error: err.error,
            message: err.message,
        });
        return;
    }
    // Fallback
    res.status(500).json({
        error: 'Internal server error',
        message: 'Unknown',
    });
}

module.exports = apiErrorHandler;
