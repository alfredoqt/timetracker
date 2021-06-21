require('./config').serverConfig();

const express = require('express');
const session = require('./middleware/session');
const apiErrorHandler = require('./middleware/apiErrorHandler');
const userModel = require('./dao/user');
const router = require('./routes');

function setupServer() {
    const app = express();
    app.use(express.json());

    // If you run behind a proxy (e.g. nginx)
    // app.set('trust proxy', 1);

    // Session middleware
    app.use(session);

    // API
    app.use('/api', router);

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
