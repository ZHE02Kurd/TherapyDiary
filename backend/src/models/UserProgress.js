const mongoose = require('mongoose');

/**
 * UserProgress Model
 * Tracks user's progress through the 5-week program
 */
const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  currentWeek: {
    type: Number,
    default: 1,
    min: 1,
    max: 5
  },
  currentDay: {
    type: Number,
    default: 1,
    min: 1,
    max: 7
  },
  weekStartDate: {
    type: Date,
    default: Date.now
  },
  completedWeeks: [{
    weekNumber: {
      type: Number,
      required: true
    },
    completedDate: {
      type: Date,
      default: Date.now
    },
    sessionRead: {
      type: Boolean,
      default: false
    },
    daysCompleted: {
      type: Number,
      default: 0
    },
    totalEntries: {
      type: Number,
      default: 0
    }
  }],
  totalActivitiesLogged: {
    type: Number,
    default: 0
  },
  startedDate: {
    type: Date,
    default: Date.now
  },
  lastActiveDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for user lookups
userProgressSchema.index({ userId: 1 });

// Method to check if week is unlocked
userProgressSchema.methods.isWeekUnlocked = function(weekNumber) {
  if (weekNumber === 1) return true;
  
  // Check if previous week is completed
  const previousWeek = this.completedWeeks.find(w => w.weekNumber === weekNumber - 1);
  return previousWeek && previousWeek.daysCompleted >= 7;
};

// Method to complete current week
userProgressSchema.methods.completeCurrentWeek = function(entriesCount) {
  this.completedWeeks.push({
    weekNumber: this.currentWeek,
    completedDate: new Date(),
    sessionRead: true,
    daysCompleted: this.currentDay,
    totalEntries: entriesCount
  });
  
  if (this.currentWeek < 5) {
    this.currentWeek += 1;
    this.currentDay = 1;
    this.weekStartDate = new Date();
  }
  
  return this.save();
};

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;
