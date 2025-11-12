const { DailyEntry, UserProgress } = require('../models');

/**
 * Create a new daily entry
 * POST /api/daily-entries
 */
exports.createEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      timeOfDay,
      time,
      activity,
      location,
      withWhom,
      moodBefore,
      moodAfter,
      notes
    } = req.body;

    // Get user progress
    let userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      userProgress = await UserProgress.create({ userId });
    }

    // Calculate day number based on week start date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekStart = new Date(userProgress.weekStartDate);
    weekStart.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today - weekStart) / (1000 * 60 * 60 * 24));
    const dayNumber = Math.min(Math.max(daysDiff + 1, 1), 7);

    // Create entry
    const entry = await DailyEntry.create({
      userId,
      weekNumber: userProgress.currentWeek,
      dayNumber,
      date: today,
      timeOfDay,
      time,
      activity,
      location,
      withWhom,
      moodBefore,
      moodAfter,
      notes
    });

    // Update user progress
    userProgress.totalActivitiesLogged += 1;
    userProgress.currentDay = dayNumber;
    userProgress.lastActiveDate = new Date();
    await userProgress.save();

    res.status(201).json({
      message: 'Entry created successfully',
      entry
    });

  } catch (error) {
    console.error('Create entry error:', error);
    res.status(500).json({
      error: 'Failed to create entry',
      message: 'An error occurred while creating entry'
    });
  }
};

/**
 * Get entries for current week
 * GET /api/daily-entries/week/:weekNumber
 */
exports.getWeekEntries = async (req, res) => {
  try {
    const userId = req.userId;
    const { weekNumber } = req.params;

    const entries = await DailyEntry.find({
      userId,
      weekNumber: parseInt(weekNumber)
    }).sort({ date: 1, time: 1 });

    // Group by day
    const groupedByDay = entries.reduce((acc, entry) => {
      const day = entry.dayNumber;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(entry);
      return acc;
    }, {});

    res.json({
      entries,
      groupedByDay,
      totalEntries: entries.length,
      daysWithEntries: Object.keys(groupedByDay).length
    });

  } catch (error) {
    console.error('Get week entries error:', error);
    res.status(500).json({
      error: 'Failed to get entries',
      message: 'An error occurred'
    });
  }
};

/**
 * Get entries for a specific day
 * GET /api/daily-entries/day/:weekNumber/:dayNumber
 */
exports.getDayEntries = async (req, res) => {
  try {
    const userId = req.userId;
    const { weekNumber, dayNumber } = req.params;

    const entries = await DailyEntry.find({
      userId,
      weekNumber: parseInt(weekNumber),
      dayNumber: parseInt(dayNumber)
    }).sort({ time: 1 });

    res.json({
      entries,
      count: entries.length
    });

  } catch (error) {
    console.error('Get day entries error:', error);
    res.status(500).json({
      error: 'Failed to get entries',
      message: 'An error occurred'
    });
  }
};

/**
 * Update an entry
 * PUT /api/daily-entries/:id
 */
exports.updateEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const updates = req.body;

    const entry = await DailyEntry.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return res.status(404).json({
        error: 'Entry not found',
        message: 'No entry found with that ID'
      });
    }

    res.json({
      message: 'Entry updated successfully',
      entry
    });

  } catch (error) {
    console.error('Update entry error:', error);
    res.status(500).json({
      error: 'Failed to update entry',
      message: 'An error occurred'
    });
  }
};

/**
 * Delete an entry
 * DELETE /api/daily-entries/:id
 */
exports.deleteEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const entry = await DailyEntry.findOneAndDelete({ _id: id, userId });

    if (!entry) {
      return res.status(404).json({
        error: 'Entry not found',
        message: 'No entry found with that ID'
      });
    }

    // Update user progress
    const userProgress = await UserProgress.findOne({ userId });
    if (userProgress && userProgress.totalActivitiesLogged > 0) {
      userProgress.totalActivitiesLogged -= 1;
      await userProgress.save();
    }

    res.json({
      message: 'Entry deleted successfully'
    });

  } catch (error) {
    console.error('Delete entry error:', error);
    res.status(500).json({
      error: 'Failed to delete entry',
      message: 'An error occurred'
    });
  }
};

/**
 * Complete current week
 * POST /api/daily-entries/complete-week
 */
exports.completeWeek = async (req, res) => {
  try {
    const userId = req.userId;

    const userProgress = await UserProgress.findOne({ userId });
    
    if (!userProgress) {
      return res.status(404).json({
        error: 'Progress not found',
        message: 'User progress not initialized'
      });
    }

    // Count entries for current week
    const entriesCount = await DailyEntry.countDocuments({
      userId,
      weekNumber: userProgress.currentWeek
    });

    // Complete the week
    await userProgress.completeCurrentWeek(entriesCount);

    res.json({
      message: 'Week completed successfully',
      userProgress,
      entriesCompleted: entriesCount
    });

  } catch (error) {
    console.error('Complete week error:', error);
    res.status(500).json({
      error: 'Failed to complete week',
      message: 'An error occurred'
    });
  }
};

module.exports = exports;
