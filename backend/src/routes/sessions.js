const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Get session by week number
router.get('/:weekNumber', sessionController.getSession);

// Mark session as read
router.post('/:weekNumber/complete', sessionController.markSessionRead);

// Get user progress
router.get('/user/progress', sessionController.getUserProgress);

module.exports = router;
