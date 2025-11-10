const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const { body } = require('express-validator');

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post('/register', validateRegistration, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, authController.login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get('/me', authMiddleware, authController.getCurrentUser);

/**
 * @route   PATCH /api/auth/profile
 * @desc    Update user profile
 * @access  Private
 */
router.patch('/profile', 
  authMiddleware,
  [
    body('name').optional().trim().isLength({ min: 2, max: 100 }),
    body('age').optional().isInt({ min: 14, max: 120 }),
    body('settings.notifications').optional().isBoolean(),
    body('settings.reminderTime').optional().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('settings.theme').optional().isIn(['light', 'dark', 'system'])
  ],
  authController.updateProfile
);

/**
 * @route   POST /api/auth/change-password
 * @desc    Change user password
 * @access  Private
 */
router.post('/change-password',
  authMiddleware,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('Password must contain uppercase, lowercase, and number')
  ],
  authController.changePassword
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (client-side)
 * @access  Private
 */
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
