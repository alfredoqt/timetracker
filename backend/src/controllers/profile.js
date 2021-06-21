const profileService = require('../services/profile');

async function getMe(req, res, next) {
    try {
        const user = await profileService.getMe(req.session.user.id);
        res.status(200).json(user);
    } catch (err) {
        // in prod, do not use console.log or console.error
        // use a proper logging library like winston
        console.error(err);
        next(err);
    }
}

module.exports = {
    getMe,
};
