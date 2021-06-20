require('dotenv').config();

const express = require('express');
const AWS = require('aws-sdk');
const session = require('./middleware/session');

// Must run before any AWS operation
AWS.config.update({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const app = express();

// If you run behind a proxy (e.g. nginx)
// app.set('trust proxy', 1);

// Session middleware
app.use(session);

app.listen(4001, () => console.log('server is running on port 4001'));
