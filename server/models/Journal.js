const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 10000
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  mood: {
    type: String,
    enum: ['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'stressed', 'angry', 'excited', 'calm']
  },
  tags: [{
    type: String,
    maxlength: 50
  }],
  isPrivate: {
    type: Boolean,
    default: true
  },
  sentiment: {
    positive: { type: Number, min: 0, max: 1 },
    negative: { type: Number, min: 0, max: 1 },
    neutral: { type: Number, min: 0, max: 1 }
  },
  keywords: [{
    type: String,
    maxlength: 100
  }],
  recommendations: [{
    type: {
      type: String,
      enum: ['song', 'exercise', 'meditation', 'article', 'activity', 'breathing']
    },
    title: String,
    description: String,
    link: String,
    confidence: { type: Number, min: 0, max: 1 }
  }],
  wordCount: {
    type: Number,
    default: 0
  },
  readingTime: {
    type: Number, // in minutes
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient queries
journalSchema.index({ userId: 1, date: -1 });
journalSchema.index({ userId: 1, tags: 1 });

// Calculate word count and reading time before saving
journalSchema.pre('save', function(next) {
  if (this.content) {
    this.wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(this.wordCount / 200); // Average reading speed: 200 words per minute
  }
  next();
});

module.exports = mongoose.model('Journal', journalSchema);
