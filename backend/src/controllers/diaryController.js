const { DiaryEntry, MoodLog } = require('../models');

/**
 * Get all diary entries for current user
 * GET /api/diary
 * Query params: page, limit, startDate, endDate, timeOfDay
 */
exports.getAllEntries = async (req, res) => {
  try {
    const userId = req.userId;
    const { 
      page = 1, 
      limit = 20,
      startDate,
      endDate,
      timeOfDay
    } = req.query;
    
    // Build query
    const query = { userId };
    
    // Date range filter
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }
    
    // Time of day filter
    if (timeOfDay) {
      query.timeOfDay = timeOfDay;
    }
    
    // Execute query with pagination
    const skip = (page - 1) * limit;
    const entries = await DiaryEntry.find(query)
      .populate('activityId', 'name category difficulty')
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    // Get total count
    const total = await DiaryEntry.countDocuments(query);
    
    res.json({
      entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get diary entries error:', error);
    res.status(500).json({
      error: 'Failed to fetch diary entries',
      message: error.message
    });
  }
};

/**
 * Get single diary entry
 * GET /api/diary/:id
 */
exports.getEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const entry = await DiaryEntry.findOne({ _id: id, userId })
      .populate('activityId', 'name category difficulty');
    
    if (!entry) {
      return res.status(404).json({
        error: 'Entry not found',
        message: 'Diary entry does not exist or you do not have permission to view it'
      });
    }
    
    res.json({ entry });
    
  } catch (error) {
    console.error('Get diary entry error:', error);
    res.status(500).json({
      error: 'Failed to fetch diary entry',
      message: error.message
    });
  }
};

/**
 * Create new diary entry
 * POST /api/diary
 */
exports.createEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { activity, activityId, moodBefore, moodAfter, notes, timestamp } = req.body;
    
    const entry = new DiaryEntry({
      userId,
      activity,
      activityId: activityId || null,
      moodBefore,
      moodAfter,
      notes,
      timestamp: timestamp || new Date()
    });
    
    await entry.save();
    
    // Populate activity details
    await entry.populate('activityId', 'name category difficulty');
    
    // Update mood log for this date
    const entryDate = new Date(entry.timestamp);
    await MoodLog.calculateForDate(userId, entryDate);
    
    res.status(201).json({
      message: 'Diary entry created successfully',
      entry
    });
    
  } catch (error) {
    console.error('Create diary entry error:', error);
    res.status(500).json({
      error: 'Failed to create diary entry',
      message: error.message
    });
  }
};

/**
 * Update diary entry
 * PUT /api/diary/:id
 */
exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { activity, activityId, moodBefore, moodAfter, notes, timestamp } = req.body;
    
    // Find entry and verify ownership
    const entry = await DiaryEntry.findOne({ _id: id, userId });
    
    if (!entry) {
      return res.status(404).json({
        error: 'Entry not found',
        message: 'Diary entry does not exist or you do not have permission to edit it'
      });
    }
    
    const oldDate = new Date(entry.timestamp);
    
    // Update fields
    if (activity !== undefined) entry.activity = activity;
    if (activityId !== undefined) entry.activityId = activityId || null;
    if (moodBefore !== undefined) entry.moodBefore = moodBefore;
    if (moodAfter !== undefined) entry.moodAfter = moodAfter;
    if (notes !== undefined) entry.notes = notes;
    if (timestamp !== undefined) entry.timestamp = timestamp;
    
    await entry.save();
    await entry.populate('activityId', 'name category difficulty');
    
    // Update mood logs (old date and new date if changed)
    await MoodLog.calculateForDate(userId, oldDate);
    if (timestamp) {
      const newDate = new Date(timestamp);
      if (newDate.toDateString() !== oldDate.toDateString()) {
        await MoodLog.calculateForDate(userId, newDate);
      }
    }
    
    res.json({
      message: 'Diary entry updated successfully',
      entry
    });
    
  } catch (error) {
    console.error('Update diary entry error:', error);
    res.status(500).json({
      error: 'Failed to update diary entry',
      message: error.message
    });
  }
};

/**
 * Delete diary entry
 * DELETE /api/diary/:id
 */
exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const entry = await DiaryEntry.findOne({ _id: id, userId });
    
    if (!entry) {
      return res.status(404).json({
        error: 'Entry not found',
        message: 'Diary entry does not exist or you do not have permission to delete it'
      });
    }
    
    const entryDate = new Date(entry.timestamp);
    await entry.deleteOne();
    
    // Update mood log for this date
    await MoodLog.calculateForDate(userId, entryDate);
    
    res.json({
      message: 'Diary entry deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete diary entry error:', error);
    res.status(500).json({
      error: 'Failed to delete diary entry',
      message: error.message
    });
  }
};

/**
 * Get entries for specific date
 * GET /api/diary/date/:date
 */
exports.getEntriesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.userId;
    
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    const entries = await DiaryEntry.find({
      userId,
      timestamp: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    })
      .populate('activityId', 'name category difficulty')
      .sort({ timestamp: 1 });
    
    res.json({
      date,
      entries,
      count: entries.length
    });
    
  } catch (error) {
    console.error('Get entries by date error:', error);
    res.status(500).json({
      error: 'Failed to fetch entries',
      message: error.message
    });
  }
};
