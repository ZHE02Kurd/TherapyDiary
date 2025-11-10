const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');
const authMiddleware = require('../middleware/auth');
const { validateDiaryEntry } = require('../middleware/validation');

// All diary routes require authentication
router.use(authMiddleware);

/**
 * @route   GET /api/diary
 * @desc    Get all diary entries for current user (with pagination and filters)
 * @access  Private
 * @query   page, limit, startDate, endDate, timeOfDay
 */
router.get('/', diaryController.getAllEntries);

/**
 * @route   GET /api/diary/date/:date
 * @desc    Get diary entries for specific date
 * @access  Private
 * @param   date - Date in YYYY-MM-DD format
 */
router.get('/date/:date', diaryController.getEntriesByDate);

/**
 * @route   GET /api/diary/:id
 * @desc    Get single diary entry
 * @access  Private
 */
router.get('/:id', diaryController.getEntry);

/**
 * @route   POST /api/diary
 * @desc    Create new diary entry
 * @access  Private
 */
router.post('/', validateDiaryEntry, diaryController.createEntry);

/**
 * @route   PUT /api/diary/:id
 * @desc    Update diary entry
 * @access  Private
 */
router.put('/:id', validateDiaryEntry, diaryController.updateEntry);

/**
 * @route   DELETE /api/diary/:id
 * @desc    Delete diary entry
 * @access  Private
 */
router.delete('/:id', diaryController.deleteEntry);

module.exports = router;
