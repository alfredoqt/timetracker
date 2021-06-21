const userModel = require('../dao/user');
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
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

async function register(email, fullname, password) {
    try {
        const user = await userModel.findUserByEmail(email);

        if (user != null) {
            return Promise.reject(new APIError(400, 'User already exists'));
        }

        // Hash password
        const passwordHash = await bcrypt.hash(
            password,
            Number.parseInt(process.env.SALT_ROUNDS, 10),
        );

        const id = await userModel.createUser(email, fullname, passwordHash);
        return { id };
    } catch (err) {
        return Promise.reject(new APIError(500, 'Internal server error'));
    }
}

module.exports = {
    login,
    register,
};
