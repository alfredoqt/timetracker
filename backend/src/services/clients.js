const clientModel = require('../dao/client');
const APIError = require('../errors/apiError');

async function post(
    name,
    workspace_id,
) {
    try {
        const newEntry = await clientModel.create(
            name,
            workspace_id,
        );
        return newEntry;
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

async function put(
    id,
    name,
) {
    try {
        const newEntry = await clientModel.update(
            id,
            name,
        );
        return newEntry;
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

module.exports = {
    post,
    put,
};
