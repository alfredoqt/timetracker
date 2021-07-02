const appConfig = require('./config');

const express = require('express');
const session = require('./middleware/session');
const apiErrorHandler = require('./middleware/apiErrorHandler');
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

    app.listen(
        appConfig.port,
        () => console.log(`server is running on port ${appConfig.port}`),
    );
}

setupServer();
