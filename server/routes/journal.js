const express = require('express');
const { body, validationResult } = require('express-validator');
const Journal = require('../models/Journal');
const auth = require('../middleware/auth');

const router = express.Router();

// Simple sentiment analysis function (in production, use a proper NLP service)
const analyzeSentiment = (text) => {
  const positiveWords = ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 'love', 'good', 'excellent', 'positive', 'optimistic', 'grateful', 'blessed', 'content', 'peaceful', 'calm', 'relaxed', 'confident', 'proud', 'accomplished', 'successful', 'motivated', 'inspired', 'hopeful', 'cheerful', 'bright', 'sunny', 'beautiful', 'perfect'];
  const negativeWords = ['sad', 'angry', 'frustrated', 'disappointed', 'worried', 'anxious', 'stressed', 'depressed', 'lonely', 'hurt', 'pain', 'suffering', 'terrible', 'awful', 'horrible', 'bad', 'negative', 'pessimistic', 'hopeless', 'helpless', 'overwhelmed', 'exhausted', 'tired', 'fear', 'scared', 'nervous', 'upset', 'annoyed', 'irritated', 'furious', 'devastated', 'broken', 'lost', 'confused', 'doubt', 'uncertain', 'insecure', 'vulnerable', 'weak', 'defeated', 'failure', 'mistake', 'regret', 'guilt', 'shame'];

  const words = text.toLowerCase().split(/\s+/);
  let positiveCount = 0;
  let negativeCount = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount++;
    if (negativeWords.includes(word)) negativeCount++;
  });

  const total = positiveCount + negativeCount;
  if (total === 0) {
    return { positive: 0.5, negative: 0.5, neutral: 1.0 };
  }

  const positive = positiveCount / total;
  const negative = negativeCount / total;
  const neutral = 1 - positive - negative;

  return { positive, negative, neutral: Math.max(0, neutral) };
};

// Extract keywords from text
const extractKeywords = (text) => {
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'];
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !commonWords.includes(word));
  
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  return Object.keys(wordCount)
    .sort((a, b) => wordCount[b] - wordCount[a])
    .slice(0, 10);
};

// Generate recommendations based on sentiment and keywords
const generateRecommendations = (sentiment, keywords, mood) => {
  const recommendations = [];

  // Music recommendations based on sentiment
  if (sentiment.positive > 0.6) {
    recommendations.push({
      type: 'song',
      title: 'Upbeat Playlist',
      description: 'Enjoy some uplifting music to match your positive mood',
      link: 'https://open.spotify.com/playlist/upbeat',
      confidence: sentiment.positive
    });
  } else if (sentiment.negative > 0.6) {
    recommendations.push({
      type: 'song',
      title: 'Calming Music',
      description: 'Gentle music to help soothe your emotions',
      link: 'https://open.spotify.com/playlist/calming',
      confidence: sentiment.negative
    });
  }

  // Exercise recommendations
  if (keywords.includes('stress') || keywords.includes('anxious') || keywords.includes('worried')) {
    recommendations.push({
      type: 'exercise',
      title: 'Breathing Exercise',
      description: 'Try the 4-7-8 breathing technique to reduce stress',
      link: '/meditation/breathing',
      confidence: 0.8
    });
  }

  if (keywords.includes('sad') || keywords.includes('depressed') || keywords.includes('down')) {
    recommendations.push({
      type: 'exercise',
      title: 'Light Exercise',
      description: 'A gentle walk or light stretching can help improve your mood',
      link: '/meditation/exercise',
      confidence: 0.7
    });
  }

  // Meditation recommendations
  if (keywords.includes('overwhelmed') || keywords.includes('busy') || keywords.includes('tired')) {
    recommendations.push({
      type: 'meditation',
      title: 'Mindfulness Meditation',
      description: 'Take 10 minutes to practice mindfulness and recenter yourself',
      link: '/meditation/mindfulness',
      confidence: 0.9
    });
  }

  // Activity recommendations
  if (keywords.includes('lonely') || keywords.includes('isolated')) {
    recommendations.push({
      type: 'activity',
      title: 'Social Connection',
      description: 'Consider reaching out to a friend or joining our community',
      link: '/community',
      confidence: 0.8
    });
  }

  // Article recommendations
  if (keywords.includes('sleep') || keywords.includes('tired') || keywords.includes('insomnia')) {
    recommendations.push({
      type: 'article',
      title: 'Sleep Hygiene Tips',
      description: 'Learn about healthy sleep habits and routines',
      link: '/resources/sleep',
      confidence: 0.9
    });
  }

  return recommendations.slice(0, 5); // Return top 5 recommendations
};

// @route   POST /api/journal
// @desc    Create a new journal entry
// @access  Private
router.post('/', auth, [
  body('title').optional().isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  body('content').isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('mood').optional().isIn(['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'stressed', 'angry', 'excited', 'calm'])
    .withMessage('Invalid mood value'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, mood, tags = [], isPrivate = true } = req.body;

    // Analyze sentiment
    const sentiment = analyzeSentiment(content);
    
    // Extract keywords
    const keywords = extractKeywords(content);
    
    // Generate recommendations
    const recommendations = generateRecommendations(sentiment, keywords, mood);

    const journalEntry = new Journal({
      userId: req.userId,
      title,
      content,
      mood,
      tags,
      isPrivate,
      sentiment,
      keywords,
      recommendations
    });

    await journalEntry.save();
    res.status(201).json({ message: 'Journal entry created successfully', journal: journalEntry });
  } catch (error) {
    console.error('Journal creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/journal
// @desc    Get user's journal entries
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, mood, startDate, endDate, search } = req.query;
    
    let query = { userId: req.userId };
    
    if (mood) {
      query.mood = mood;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [entries, total] = await Promise.all([
      Journal.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Journal.countDocuments(query)
    ]);

    res.json({
      entries,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalEntries: total,
        hasNext: skip + parseInt(limit) < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get journal entries error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/journal/:id
// @desc    Get a specific journal entry
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json(journal);
  } catch (error) {
    console.error('Get journal entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/journal/:id
// @desc    Update a journal entry
// @access  Private
router.put('/:id', auth, [
  body('title').optional().isLength({ max: 200 }).withMessage('Title must be less than 200 characters'),
  body('content').optional().isLength({ min: 10 }).withMessage('Content must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, mood, tags, isPrivate } = req.body;
    
    let updateData = { title, mood, tags, isPrivate };
    
    // If content is being updated, re-analyze sentiment and keywords
    if (content) {
      const sentiment = analyzeSentiment(content);
      const keywords = extractKeywords(content);
      const recommendations = generateRecommendations(sentiment, keywords, mood);
      
      updateData.content = content;
      updateData.sentiment = sentiment;
      updateData.keywords = keywords;
      updateData.recommendations = recommendations;
    }

    const journal = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry updated successfully', journal });
  } catch (error) {
    console.error('Update journal entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/journal/:id
// @desc    Delete a journal entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!journal) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Delete journal entry error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/journal/stats/insights
// @desc    Get journal insights and analytics
// @access  Private
router.get('/stats/insights', auth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const entries = await Journal.find({
      userId: req.userId,
      date: { $gte: startDate }
    });

    // Calculate insights
    const totalEntries = entries.length;
    const totalWords = entries.reduce((sum, entry) => sum + entry.wordCount, 0);
    const avgWordsPerEntry = totalEntries > 0 ? Math.round(totalWords / totalEntries) : 0;
    
    // Sentiment analysis
    const sentimentCounts = { positive: 0, negative: 0, neutral: 0 };
    entries.forEach(entry => {
      if (entry.sentiment) {
        if (entry.sentiment.positive > entry.sentiment.negative && entry.sentiment.positive > entry.sentiment.neutral) {
          sentimentCounts.positive++;
        } else if (entry.sentiment.negative > entry.sentiment.positive && entry.sentiment.negative > entry.sentiment.neutral) {
          sentimentCounts.negative++;
        } else {
          sentimentCounts.neutral++;
        }
      }
    });

    // Most common keywords
    const keywordCounts = {};
    entries.forEach(entry => {
      entry.keywords?.forEach(keyword => {
        keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
      });
    });
    
    const topKeywords = Object.keys(keywordCounts)
      .sort((a, b) => keywordCounts[b] - keywordCounts[a])
      .slice(0, 10)
      .map(keyword => ({ word: keyword, count: keywordCounts[keyword] }));

    // Mood distribution
    const moodCounts = {};
    entries.forEach(entry => {
      if (entry.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    });

    // Writing frequency
    const writingDays = new Set(entries.map(entry => entry.date.toISOString().split('T')[0])).size;
    const writingFrequency = Math.round((writingDays / days) * 100);

    res.json({
      period: `${days} days`,
      totalEntries,
      totalWords,
      avgWordsPerEntry,
      sentimentCounts,
      topKeywords,
      moodCounts,
      writingFrequency,
      writingDays
    });
  } catch (error) {
    console.error('Get journal insights error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
