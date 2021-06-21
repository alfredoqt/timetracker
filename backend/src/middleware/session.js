const session = require('express-session');
const redisClient = require('../db/redis');
const connectRedis = require('connect-redis');

const RedisStore = connectRedis(session);

module.exports = session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET, // Probably something harder to break
    saveUninitialized: false, // Do not store empty sessions
    resave: false, // Don't update the session in the database if nothing changed
    name: 'sessionId', // Make it more difficult for attackers to know the backend language used
    cookie: {
        secure: false, // HTTPS
        httpOnly: true, // Prevents JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 7, // 7 hours

    },
})
