const userModel = require('../dao/user');
const bcrypt = require('bcrypt');

async function login(email, password) {
    try {
        const user = await userModel.findUserByEmail(email);

        // we do not need to hash our plain text password
        // before we pass it to bcrypt.compare
        // bcrypt.compare will always return resolved Promise with a boolean value
        // indicating whether the password hashes match
        const match = await bcrypt.compare(password, user.password_hash);

        if (match) {
            return { id: user.id };
        } else {
            return Promise.reject('Wrong email or password');
        }
    } catch (err) {
        return Promise.reject('User not found');
    }
}

module.exports = { login };
