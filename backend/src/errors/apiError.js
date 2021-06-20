class APIError {

    constructor(statusCode, error, message) {
        this.statusCode = statusCode;
        this.error = error;
        this.message = message;
    }

}

module.exports = APIError;
