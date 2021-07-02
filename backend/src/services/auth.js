const userModel = require('../dao/user');
const workspaceModel = require('../dao/workspace');
const workspaceUserModel = require('../dao/workspaceUser');
const bcrypt = require('bcrypt');
const APIError = require('../errors/apiError');

async function login(email, password) {
    try {
        const user = await userModel.findUserByEmail(email);

        if (user == null) {
            return Promise.reject(new APIError(400, 'Wrong email or password'));
        }

        // we do not need to hash our plain text password
        // before we pass it to bcrypt.compare
        // bcrypt.compare will always return resolved Promise with a boolean value
        // indicating whether the password hashes match
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            return { id: user.id };
        } else {
            return Promise.reject(new APIError(400, 'Wrong email or password'));
        }
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

async function register(email, fullname, password) {
    try {
        const user = await userModel.findUserByEmail(email);

        if (user != null) {
            return Promise.reject(new APIError(400, 'User already exists'));
        }

        // Create workspace
        const newWorkspaceId = await workspaceModel.createWorkspace(`${fullname}'s workspace`);
        // Hash password
        const passwordHash = await bcrypt.hash(
            password,
            Number.parseInt(process.env.SALT_ROUNDS, 10),
        );

        const newUserId = await userModel.createUser(
            email,
            fullname,
            passwordHash,
            newWorkspaceId,
        );

        await workspaceUserModel.createWorkspaceUser(
            newUserId,
            newWorkspaceId,
        );

        return { id: newUserId };
    } catch (err) {
        console.error(err);
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

module.exports = {
    login,
    register,
};
