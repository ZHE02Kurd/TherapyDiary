const mongoose = require('mongoose');

/**
 * DailyEntry Model
 * Represents a single activity log entry in the baseline diary
 */
const dailyEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  weekNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  dayNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 7
  },
  date: {
    type: Date,
    required: true,
    index: true
  },
  timeOfDay: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  location: {
    type: String,
    trim: true,
    maxlength: 100
  },
  withWhom: {
    type: String,
    trim: true,
    maxlength: 100
  },
  moodBefore: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  moodAfter: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
dailyEntrySchema.index({ userId: 1, weekNumber: 1, date: 1 });
dailyEntrySchema.index({ userId: 1, weekNumber: 1, dayNumber: 1 });

// Virtual for formatted date
dailyEntrySchema.virtual('formattedDate').get(function() {
  return this.date.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Ensure virtuals are included in JSON
dailyEntrySchema.set('toJSON', { virtuals: true });
dailyEntrySchema.set('toObject', { virtuals: true });

const DailyEntry = mongoose.model('DailyEntry', dailyEntrySchema);

module.exports = DailyEntry;
