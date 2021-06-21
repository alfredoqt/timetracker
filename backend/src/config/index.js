const dotenv = require('dotenv');
const AWS = require('aws-sdk');

// Required before running the server
function serverConfig() {
    dotenv.config();
    // Must run before any AWS operation
    AWS.config.update({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });
}

module.exports = {
    serverConfig,
};
