const mongoose = require('mongoose');

const scheduledActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Activity',
    required: [true, 'Activity ID is required']
  },
  activityName: {
    type: String,
    required: [true, 'Activity name is required'],
    trim: true
  },
  scheduledDate: {
    type: Date,
    required: [true, 'Scheduled date is required']
  },
  scheduledTime: {
    type: String,
    required: [true, 'Scheduled time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (use HH:MM)']
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  diaryEntryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DiaryEntry',
    default: null // Links to diary entry if activity was logged
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  reminderSent: {
    type: Boolean,
    default: false
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

// Virtual field to check if activity is overdue
scheduledActivitySchema.virtual('isOverdue').get(function() {
  if (this.completed) return false;
  
  const scheduledDateTime = new Date(this.scheduledDate);
  const [hours, minutes] = this.scheduledTime.split(':');
  scheduledDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  return scheduledDateTime < new Date();
});

// Virtual field to check if activity is upcoming today
scheduledActivitySchema.virtual('isToday').get(function() {
  const today = new Date();
  const scheduled = new Date(this.scheduledDate);
  
  return today.toDateString() === scheduled.toDateString();
});

// Method to mark activity as complete
scheduledActivitySchema.methods.markComplete = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Indexes for performance
scheduledActivitySchema.index({ userId: 1, scheduledDate: 1 });
scheduledActivitySchema.index({ userId: 1, completed: 1 });
scheduledActivitySchema.index({ activityId: 1 });
scheduledActivitySchema.index({ scheduledDate: 1, scheduledTime: 1 });

// Ensure virtuals are included in JSON
scheduledActivitySchema.set('toJSON', { virtuals: true });
scheduledActivitySchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('ScheduledActivity', scheduledActivitySchema);
