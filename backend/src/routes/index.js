const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { body } = require('express-validator');

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

module.exports = router;
