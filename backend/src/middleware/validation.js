const { body, validationResult } = require('express-validator');

/**
 * Validation middleware helper
 * Checks for validation errors and returns 400 if found
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

/**
 * Registration validation rules
 */
const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('age')
    .optional()
    .isInt({ min: 14, max: 120 })
    .withMessage('Age must be between 14 and 120'),
  
  validate
];

/**
 * Login validation rules
 */
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  validate
];

/**
 * Diary entry validation rules
 */
const validateDiaryEntry = [
  body('activity')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Activity description must be between 1 and 300 characters'),
  
  body('moodAfter')
    .isInt({ min: 1, max: 10 })
    .withMessage('Mood rating must be between 1 and 10'),
  
  body('moodBefore')
    .optional()
    .isInt({ min: 1, max: 10 })
    .withMessage('Mood before must be between 1 and 10'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Notes cannot exceed 1000 characters'),
  
  body('activityId')
    .optional()
    .isMongoId()
    .withMessage('Invalid activity ID'),
  
  body('timestamp')
    .optional()
    .isISO8601()
    .withMessage('Invalid timestamp format'),
  
  validate
];

/**
 * Activity validation rules
 */
const validateActivity = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Activity name must be between 1 and 200 characters'),
  
  body('category')
    .isIn(['Routine', 'Necessary', 'Pleasurable'])
    .withMessage('Category must be Routine, Necessary, or Pleasurable'),
  
  body('difficulty')
    .isIn(['Easiest', 'Moderate', 'Difficult'])
    .withMessage('Difficulty must be Easiest, Moderate, or Difficult'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  
  body('estimatedDuration')
    .optional()
    .isInt({ min: 1, max: 480 })
    .withMessage('Duration must be between 1 and 480 minutes'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  validate
];

/**
 * Scheduled activity validation rules
 */
const validateScheduledActivity = [
  body('activityId')
    .isMongoId()
    .withMessage('Invalid activity ID'),
  
  body('scheduledDate')
    .isISO8601()
    .withMessage('Invalid date format'),
  
  body('scheduledTime')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time must be in HH:MM format'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters'),
  
  validate
];

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateDiaryEntry,
  validateActivity,
  validateScheduledActivity
};
