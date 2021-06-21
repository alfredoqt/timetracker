const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');
const { body } = require('express-validator');
const authenticate = require('../middleware/authenticate');

router.post(
    '/login',
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    authController.login,
);
router.post(
    '/register',
    body('email').isEmail().normalizeEmail(),
    body('fullname').notEmpty().trim(),
    body('password').isLength({ min: 6 }),
    authController.register,
);
router.get('/me', authenticate, profileController.getMe);

module.exports = router;
