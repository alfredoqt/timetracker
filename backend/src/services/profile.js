const userModel = require('../dao/user');
const APIError = require('../errors/apiError');

async function getMe(id) {
    try {
        const user = await userModel.findUserById(id);

        if (user == null) {
            return Promise.reject(new APIError(400, 'User does not exist'));
        }

        // Don't return password_hash
        const { password_hash, ...rest } = user;
        return rest;
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

module.exports = {
    getMe,
};
