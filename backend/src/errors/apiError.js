class APIError extends Error {

    constructor(statusCode, error, message) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
    }

}

module.exports = APIError;
