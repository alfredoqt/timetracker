const path = require('path');

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_DEVELOPMENT_HOST,
            port: process.env.DB_DEVELOPMENT_PORT,
            database: process.env.DB_DEVELOPMENT_NAME,
            user: process.env.DB_DEVELOPMENT_USER,
            password: process.env.DB_DEVELOPMENT_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, 'src', 'db', 'knex_migrations'),
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_PRODUCTION_HOST,
            port: process.env.DB_PRODUCTION_PORT,
            database: process.env.DB_PRODUCTION_NAME,
            user: process.env.DB_PRODUCTION_USER,
            password: process.env.DB_PRODUCTION_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.join(__dirname, 'src', 'db', 'knex_migrations'),
        },
    },
};
