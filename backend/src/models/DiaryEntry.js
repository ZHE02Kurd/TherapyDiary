const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  activity: {
    type: String,
    required: [true, 'Activity description is required'],
    trim: true,
    maxlength: [300, 'Activity description cannot exceed 300 characters']
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    default: null // null if it's a custom/one-off activity
  },
  moodBefore: {
    type: Number,
    min: [1, 'Mood rating must be between 1 and 10'],
    max: [10, 'Mood rating must be between 1 and 10']
  },
  moodAfter: {
    type: Number,
    required: [true, 'Mood rating is required'],
    min: [1, 'Mood rating must be between 1 and 10'],
    max: [10, 'Mood rating must be between 1 and 10']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  },
  timeOfDay: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening', 'Night'],
    default: function() {
      const hour = new Date(this.timestamp).getHours();
      if (hour >= 5 && hour < 12) return 'Morning';
      if (hour >= 12 && hour < 17) return 'Afternoon';
      if (hour >= 17 && hour < 21) return 'Evening';
      return 'Night';
    }
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
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

// Virtual field for mood change
diaryEntrySchema.virtual('moodChange').get(function() {
  if (this.moodBefore && this.moodAfter) {
    return this.moodAfter - this.moodBefore;
  }
  return null;
});

// Indexes for performance
diaryEntrySchema.index({ userId: 1, timestamp: -1 });
diaryEntrySchema.index({ userId: 1, timeOfDay: 1 });
diaryEntrySchema.index({ activityId: 1 });
diaryEntrySchema.index({ timestamp: -1 });

// Ensure virtuals are included in JSON
diaryEntrySchema.set('toJSON', { virtuals: true });
diaryEntrySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('DiaryEntry', diaryEntrySchema);
