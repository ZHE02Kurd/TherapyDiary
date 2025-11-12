const mongoose = require('mongoose');

/**
 * Session Model
 * Represents a weekly therapy session with educational content
 */
const sessionSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  introduction: {
    type: String,
    required: true
  },
  sections: [{
    heading: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    therapistMessage: {
      type: String
    },
    order: {
      type: Number,
      required: true
    }
  }],
  taskDescription: {
    type: String,
    required: true
  },
  taskInstructions: [{
    type: String
  }],
  exampleContent: {
    type: String
  },
  duration: {
    type: String,
    default: '7 days'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for quick lookups
sessionSchema.index({ weekNumber: 1 });

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;
