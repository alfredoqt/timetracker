require('dotenv').config();

const express = require('express');
const AWS = require('aws-sdk');
const session = require('./middleware/session');
const apiErrorHandler = require('./middleware/apiErrorHandler');
const userModel = require('./dao/user');

function setupServer() {
    // Must run before any AWS operation
    AWS.config.update({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
    });

    const app = express();
    app.use(express.json());

    // If you run behind a proxy (e.g. nginx)
    // app.set('trust proxy', 1);

    // Session middleware
    app.use(session);

    // API error middleware
    app.use(apiErrorHandler);

    app.listen(4001, () => console.log('server is running on port 4001'));
}

(async function () {
    // Attempt to create tables
    await Promise.allSettled([
        userModel.createTable().promise(),
    ]);
    setupServer();
})();
