const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // null means it's a pre-populated activity
  },
  name: {
    type: String,
    required: [true, 'Activity name is required'],
    trim: true,
    maxlength: [200, 'Activity name cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Routine', 'Necessary', 'Pleasurable'],
      message: 'Category must be Routine, Necessary, or Pleasurable'
    }
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: {
      values: ['Easiest', 'Moderate', 'Difficult'],
      message: 'Difficulty must be Easiest, Moderate, or Difficult'
    },
    default: 'Moderate'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  estimatedDuration: {
    type: Number, // in minutes
    min: [1, 'Duration must be at least 1 minute'],
    max: [480, 'Duration cannot exceed 8 hours']
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  isCustom: {
    type: Boolean,
    default: function() {
      return this.userId !== null;
    }
  },
  isActive: {
    type: Boolean,
    default: true
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

// Indexes for performance
activitySchema.index({ userId: 1, isActive: 1 });
activitySchema.index({ category: 1, difficulty: 1 });
activitySchema.index({ tags: 1 });
activitySchema.index({ name: 'text', description: 'text' }); // Text search

// Virtual to check if activity is pre-populated
activitySchema.virtual('isPrePopulated').get(function() {
  return this.userId === null;
});

// Ensure virtuals are included in JSON
activitySchema.set('toJSON', { virtuals: true });
activitySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Activity', activitySchema);
