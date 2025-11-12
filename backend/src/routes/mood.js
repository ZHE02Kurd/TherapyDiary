const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// GET /api/mood - Get mood logs for date range
router.get('/', moodController.getMoodLogs);

// GET /api/mood/stats/summary - Get mood statistics summary
router.get('/stats/summary', moodController.getMoodStats);

// GET /api/mood/:date - Get mood log for specific date
router.get('/:date', moodController.getMoodLogByDate);

module.exports = router;
