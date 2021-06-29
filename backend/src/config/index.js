const dotenv = require('dotenv');
const AWS = require('aws-sdk');

// Required before running the server
function serverConfig() {
    dotenv.config();
}

module.exports = {
    serverConfig,
};
