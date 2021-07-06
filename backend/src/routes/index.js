const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const profileController = require('../controllers/profile');
const timeEntriesController = require('../controllers/timeEntries');
const clientsController = require('../controllers/clients');
const { body, param } = require('express-validator');
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
router.post(
    '/time-entries',
    authenticate,
    body('start_ms').isInt({ min: 0 }).toInt(),
    body('description').notEmpty().trim().optional(),
    body('project_id').isInt({ min: 1 }).toInt().optional(),
    body('task_id').isInt({ min: 1 }).toInt().optional(),
    body('tag_ids').isArray().optional(),
    body('workspace_id').isInt({ min: 1 }).toInt(),
    timeEntriesController.post,
);
router.post(
    '/clients',
    authenticate,
    body('name').notEmpty().trim().optional(),
    body('workspace_id').isInt({ min: 1 }).toInt(),
    clientsController.post,
);

router.put(
    '/clients/:id',
    authenticate,
    param('id').isInt({ min: 1 }).toInt(),
    body('name').notEmpty().trim(),
    clientsController.put,
);

module.exports = router;
