const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const dailyEntryController = require('../controllers/dailyEntryController');
const auth = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// All routes require authentication
router.use(auth);

// Validation for daily entry
const validateDailyEntry = [
  body('timeOfDay')
    .isIn(['Morning', 'Afternoon', 'Evening', 'Night'])
    .withMessage('Time of day must be Morning, Afternoon, Evening, or Night'),
  
  body('time')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/)
    .withMessage('Time must be in HH:MM format'),
  
  body('activity')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Activity must be between 1 and 300 characters'),
  
  body('location')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Location cannot exceed 100 characters'),
  
  body('withWhom')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('With whom cannot exceed 100 characters'),
  
  body('moodBefore')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Mood before is required and must be under 100 characters'),
  
  body('moodAfter')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Mood after is required and must be under 100 characters'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  
  validate
];

// Create new entry
router.post('/', validateDailyEntry, dailyEntryController.createEntry);

// Get all entries for a week
router.get('/week/:weekNumber', dailyEntryController.getWeekEntries);

// Get entries for specific day
router.get('/day/:weekNumber/:dayNumber', dailyEntryController.getDayEntries);

// Update entry
router.put('/:id', validateDailyEntry, dailyEntryController.updateEntry);

// Delete entry
router.delete('/:id', dailyEntryController.deleteEntry);

// Complete current week
router.post('/complete-week', dailyEntryController.completeWeek);

module.exports = router;
