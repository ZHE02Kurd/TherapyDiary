const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middleware/auth');
const { validateActivity } = require('../middleware/validation');
const { body } = require('express-validator');

// All activity routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /api/activities
 * @desc    Get all activities (pre-populated + user's custom)
 * @access  Private
 * @query   category, difficulty, search, page, limit
 */
router.get('/', activityController.getAllActivities);

/**
 * @route   GET /api/activities/category/:category
 * @desc    Get activities by category
 * @access  Private
 * @param   category - Routine, Necessary, or Pleasurable
 */
router.get('/category/:category', activityController.getByCategory);

/**
 * @route   GET /api/activities/difficulty/:difficulty
 * @desc    Get activities by difficulty
 * @access  Private
 * @param   difficulty - Easiest, Moderate, or Difficult
 */
router.get('/difficulty/:difficulty', activityController.getByDifficulty);

/**
 * @route   GET /api/activities/:id
 * @desc    Get single activity
 * @access  Private
 */
router.get('/:id', activityController.getActivity);

/**
 * @route   POST /api/activities
 * @desc    Create custom activity
 * @access  Private
 */
router.post('/', validateActivity, activityController.createActivity);

/**
 * @route   PUT /api/activities/:id
 * @desc    Update custom activity
 * @access  Private
 */
router.put('/:id', validateActivity, activityController.updateActivity);

/**
 * @route   PATCH /api/activities/:id/rank
 * @desc    Update activity difficulty ranking
 * @access  Private
 */
router.patch('/:id/rank',
  [body('difficulty').isIn(['Easiest', 'Moderate', 'Difficult'])],
  activityController.updateRanking
);

/**
 * @route   DELETE /api/activities/:id
 * @desc    Delete custom activity (soft delete)
 * @access  Private
 */
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
