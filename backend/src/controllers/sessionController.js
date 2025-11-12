const { Session, UserProgress, DailyEntry } = require('../models');

/**
 * Get session by week number
 * GET /api/sessions/:weekNumber
 */
exports.getSession = async (req, res) => {
  try {
    const { weekNumber } = req.params;
    const userId = req.userId;

    // Get user progress to check if week is unlocked
    let userProgress = await UserProgress.findOne({ userId });
    
    // Create progress if doesn't exist
    if (!userProgress) {
      userProgress = await UserProgress.create({ userId });
    }

    // Check if week is unlocked
    if (!userProgress.isWeekUnlocked(parseInt(weekNumber))) {
      return res.status(403).json({
        error: 'Week locked',
        message: 'Complete the previous week to unlock this session'
      });
    }

    // Get session content
    const session = await Session.findOne({ weekNumber: parseInt(weekNumber) });
    
    if (!session) {
      return res.status(404).json({
        error: 'Session not found',
        message: 'No session found for this week'
      });
    }

    res.json({
      session,
      userProgress: {
        currentWeek: userProgress.currentWeek,
        currentDay: userProgress.currentDay,
        isCurrentWeek: userProgress.currentWeek === parseInt(weekNumber)
      }
    });

  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({
      error: 'Failed to get session',
      message: 'An error occurred while fetching session'
    });
  }
};

/**
 * Mark session as read
 * POST /api/sessions/:weekNumber/complete
 */
exports.markSessionRead = async (req, res) => {
  try {
    const { weekNumber } = req.params;
    const userId = req.userId;

    const userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      return res.status(404).json({
        error: 'Progress not found',
        message: 'User progress not initialized'
      });
    }

    // Update session read status for current week
    const weekProgress = userProgress.completedWeeks.find(
      w => w.weekNumber === parseInt(weekNumber)
    );

    if (weekProgress) {
      weekProgress.sessionRead = true;
    }

    await userProgress.save();

    res.json({
      message: 'Session marked as read',
      userProgress
    });

  } catch (error) {
    console.error('Mark session read error:', error);
    res.status(500).json({
      error: 'Failed to mark session as read',
      message: 'An error occurred'
    });
  }
};

/**
 * Get current user progress
 * GET /api/sessions/progress
 */
exports.getUserProgress = async (req, res) => {
  try {
    const userId = req.userId;

    let userProgress = await UserProgress.findOne({ userId });
    
    // Create progress if doesn't exist
    if (!userProgress) {
      userProgress = await UserProgress.create({ userId });
    }

    // Get total entries for current week
    const currentWeekEntries = await DailyEntry.countDocuments({
      userId,
      weekNumber: userProgress.currentWeek
    });

    // Get unique days logged this week
    const daysLogged = await DailyEntry.distinct('dayNumber', {
      userId,
      weekNumber: userProgress.currentWeek
    });

    res.json({
      userProgress,
      currentWeekStats: {
        entriesCount: currentWeekEntries,
        daysCompleted: daysLogged.length
      }
    });

  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      error: 'Failed to get progress',
      message: 'An error occurred'
    });
  }
};

module.exports = exports;
