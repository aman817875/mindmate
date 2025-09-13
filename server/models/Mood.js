const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    required: true,
    enum: ['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'stressed', 'angry', 'excited', 'calm']
  },
  intensity: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  notes: {
    type: String,
    maxlength: 500
  },
  triggers: [{
    type: String,
    enum: ['work', 'relationships', 'health', 'finances', 'family', 'social', 'weather', 'sleep', 'exercise', 'other']
  }],
  activities: [{
    type: String,
    enum: ['exercise', 'meditation', 'socializing', 'work', 'hobby', 'rest', 'eating', 'reading', 'music', 'other']
  }],
  sleepQuality: {
    type: Number,
    min: 1,
    max: 10
  },
  energyLevel: {
    type: Number,
    min: 1,
    max: 10
  },
  stressLevel: {
    type: Number,
    min: 1,
    max: 10
  },
  anxietyLevel: {
    type: Number,
    min: 1,
    max: 10
  }
}, {
  timestamps: true
});

// Index for efficient queries
moodSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Mood', moodSchema);
