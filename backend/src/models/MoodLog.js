const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    index: true
  },
  averageMoodBefore: {
    type: Number,
    min: 1,
    max: 10
  },
  averageMoodAfter: {
    type: Number,
    min: 1,
    max: 10
  },
  moodChange: {
    type: Number,
    default: 0
  },
  entryCount: {
    type: Number,
    default: 0,
    min: 0
  },
  entries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiaryEntry'
  }],
  activitiesCompleted: {
    type: Number,
    default: 0,
    min: 0
  },
  categories: {
    Routine: {
      type: Number,
      default: 0
    },
    Necessary: {
      type: Number,
      default: 0
    },
    Pleasurable: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index for unique user-date combination
moodLogSchema.index({ userId: 1, date: 1 }, { unique: true });

// Index for date range queries
moodLogSchema.index({ userId: 1, date: -1 });

// Static method to calculate and update mood log for a specific date
moodLogSchema.statics.calculateForDate = async function(userId, date) {
  const DiaryEntry = mongoose.model('DiaryEntry');
  
  // Set date to start of day
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  // Get all diary entries for this date
  const entries = await DiaryEntry.find({
    userId,
    timestamp: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  }).populate('activityId');
  
  if (entries.length === 0) {
    // Remove mood log if no entries exist
    await this.deleteOne({ userId, date: startOfDay });
    return null;
  }
  
  // Calculate statistics
  const moodBeforeSum = entries.reduce((sum, entry) => sum + (entry.moodBefore || entry.moodAfter), 0);
  const moodAfterSum = entries.reduce((sum, entry) => sum + entry.moodAfter, 0);
  
  const categories = { Routine: 0, Necessary: 0, Pleasurable: 0 };
  
  entries.forEach(entry => {
    if (entry.activityId && entry.activityId.category) {
      categories[entry.activityId.category]++;
    }
  });
  
  const moodLogData = {
    userId,
    date: startOfDay,
    averageMoodBefore: moodBeforeSum / entries.length,
    averageMoodAfter: moodAfterSum / entries.length,
    moodChange: (moodAfterSum - moodBeforeSum) / entries.length,
    entryCount: entries.length,
    entries: entries.map(e => e._id),
    activitiesCompleted: entries.length,
    categories
  };
  
  // Upsert mood log
  return await this.findOneAndUpdate(
    { userId, date: startOfDay },
    moodLogData,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

// Virtual for formatted date
moodLogSchema.virtual('formattedDate').get(function() {
  return this.date.toISOString().split('T')[0];
});

// Ensure virtuals are included in JSON
moodLogSchema.set('toJSON', { virtuals: true });
moodLogSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('MoodLog', moodLogSchema);
