const { Activity } = require('../models');

/**
 * Get all activities (pre-populated + user's custom)
 * GET /api/activities
 * Query params: category, difficulty, search, page, limit
 */
exports.getAllActivities = async (req, res) => {
  try {
    const userId = req.userId;
    const { 
      category, 
      difficulty, 
      search,
      page = 1,
      limit = 50
    } = req.query;
    
    // Build query - get pre-populated (userId: null) OR user's custom activities
    const query = {
      $or: [
        { userId: null }, // Pre-populated activities
        { userId, isActive: true } // User's custom activities
      ]
    };
    
    // Add filters
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    const skip = (page - 1) * limit;
    
    let activities;
    if (search) {
      // Sort by text search score if searching
      activities = await Activity.find(query, { score: { $meta: 'textScore' } })
        .sort({ score: { $meta: 'textScore' } })
        .limit(parseInt(limit))
        .skip(skip);
    } else {
      // Default sort: category, then difficulty, then name
      activities = await Activity.find(query)
        .sort({ category: 1, difficulty: 1, name: 1 })
        .limit(parseInt(limit))
        .skip(skip);
    }
    
    const total = await Activity.countDocuments(query);
    
    res.json({
      activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({
      error: 'Failed to fetch activities',
      message: error.message
    });
  }
};

/**
 * Get single activity
 * GET /api/activities/:id
 */
exports.getActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const activity = await Activity.findOne({
      _id: id,
      $or: [
        { userId: null }, // Pre-populated
        { userId, isActive: true } // User's custom
      ]
    });
    
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        message: 'Activity does not exist or you do not have permission to view it'
      });
    }
    
    res.json({ activity });
    
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      error: 'Failed to fetch activity',
      message: error.message
    });
  }
};

/**
 * Create custom activity
 * POST /api/activities
 */
exports.createActivity = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, category, difficulty, description, estimatedDuration, tags } = req.body;
    
    const activity = new Activity({
      userId,
      name,
      category,
      difficulty,
      description,
      estimatedDuration,
      tags: tags || [],
      isCustom: true
    });
    
    await activity.save();
    
    res.status(201).json({
      message: 'Activity created successfully',
      activity
    });
    
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({
      error: 'Failed to create activity',
      message: error.message
    });
  }
};

/**
 * Update custom activity
 * PUT /api/activities/:id
 */
exports.updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { name, category, difficulty, description, estimatedDuration, tags } = req.body;
    
    // Find activity and verify it's a custom activity owned by user
    const activity = await Activity.findOne({ _id: id, userId, isCustom: true });
    
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        message: 'Activity does not exist, is not custom, or you do not have permission to edit it'
      });
    }
    
    // Update fields
    if (name !== undefined) activity.name = name;
    if (category !== undefined) activity.category = category;
    if (difficulty !== undefined) activity.difficulty = difficulty;
    if (description !== undefined) activity.description = description;
    if (estimatedDuration !== undefined) activity.estimatedDuration = estimatedDuration;
    if (tags !== undefined) activity.tags = tags;
    
    await activity.save();
    
    res.json({
      message: 'Activity updated successfully',
      activity
    });
    
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({
      error: 'Failed to update activity',
      message: error.message
    });
  }
};

/**
 * Delete custom activity (soft delete)
 * DELETE /api/activities/:id
 */
exports.deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    
    const activity = await Activity.findOne({ _id: id, userId, isCustom: true });
    
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        message: 'Activity does not exist, is not custom, or you do not have permission to delete it'
      });
    }
    
    // Soft delete
    activity.isActive = false;
    await activity.save();
    
    res.json({
      message: 'Activity deleted successfully'
    });
    
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({
      error: 'Failed to delete activity',
      message: error.message
    });
  }
};

/**
 * Get activities by category
 * GET /api/activities/category/:category
 */
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const userId = req.userId;
    
    if (!['Routine', 'Necessary', 'Pleasurable'].includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        message: 'Category must be Routine, Necessary, or Pleasurable'
      });
    }
    
    const activities = await Activity.find({
      category,
      $or: [
        { userId: null },
        { userId, isActive: true }
      ]
    }).sort({ difficulty: 1, name: 1 });
    
    res.json({
      category,
      activities,
      count: activities.length
    });
    
  } catch (error) {
    console.error('Get by category error:', error);
    res.status(500).json({
      error: 'Failed to fetch activities',
      message: error.message
    });
  }
};

/**
 * Get activities by difficulty
 * GET /api/activities/difficulty/:difficulty
 */
exports.getByDifficulty = async (req, res) => {
  try {
    const { difficulty } = req.params;
    const userId = req.userId;
    
    if (!['Easiest', 'Moderate', 'Difficult'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty',
        message: 'Difficulty must be Easiest, Moderate, or Difficult'
      });
    }
    
    const activities = await Activity.find({
      difficulty,
      $or: [
        { userId: null },
        { userId, isActive: true }
      ]
    }).sort({ category: 1, name: 1 });
    
    res.json({
      difficulty,
      activities,
      count: activities.length
    });
    
  } catch (error) {
    console.error('Get by difficulty error:', error);
    res.status(500).json({
      error: 'Failed to fetch activities',
      message: error.message
    });
  }
};

/**
 * Update activity difficulty ranking
 * PATCH /api/activities/:id/rank
 */
exports.updateRanking = async (req, res) => {
  try {
    const { id } = req.params;
    const { difficulty } = req.body;
    const userId = req.userId;
    
    if (!['Easiest', 'Moderate', 'Difficult'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty',
        message: 'Difficulty must be Easiest, Moderate, or Difficult'
      });
    }
    
    // Can only rank custom activities
    const activity = await Activity.findOne({ _id: id, userId, isCustom: true });
    
    if (!activity) {
      return res.status(404).json({
        error: 'Activity not found',
        message: 'Activity does not exist, is not custom, or you do not have permission to rank it'
      });
    }
    
    activity.difficulty = difficulty;
    await activity.save();
    
    res.json({
      message: 'Activity ranking updated successfully',
      activity
    });
    
  } catch (error) {
    console.error('Update ranking error:', error);
    res.status(500).json({
      error: 'Failed to update ranking',
      message: error.message
    });
  }
};
