const express = require('express');
const { body, validationResult } = require('express-validator');
const Mood = require('../models/Mood');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/mood
// @desc    Log a mood entry
// @access  Private
router.post('/', auth, [
  body('mood').isIn(['very-happy', 'happy', 'neutral', 'sad', 'very-sad', 'anxious', 'stressed', 'angry', 'excited', 'calm'])
    .withMessage('Invalid mood value'),
  body('intensity').isInt({ min: 1, max: 10 }).withMessage('Intensity must be between 1 and 10'),
  body('notes').optional().isLength({ max: 500 }).withMessage('Notes must be less than 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      mood,
      intensity,
      notes,
      triggers,
      activities,
      sleepQuality,
      energyLevel,
      stressLevel,
      anxietyLevel
    } = req.body;

    const moodEntry = new Mood({
      userId: req.userId,
      mood,
      intensity,
      notes,
      triggers,
      activities,
      sleepQuality,
      energyLevel,
      stressLevel,
      anxietyLevel
    });

    await moodEntry.save();
    res.status(201).json({ message: 'Mood logged successfully', mood: moodEntry });
  } catch (error) {
    console.error('Mood logging error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/mood
// @desc    Get user's mood entries
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate, limit = 30 } = req.query;
    
    let query = { userId: req.userId };
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const moods = await Mood.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json(moods);
  } catch (error) {
    console.error('Get moods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/mood/stats
// @desc    Get mood statistics and trends
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get mood entries for the period
    const moods = await Mood.find({
      userId: req.userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    // Calculate statistics
    const moodCounts = {};
    const intensitySum = {};
    const moodCount = {};
    const weeklyData = {};
    const dailyAverages = {};

    moods.forEach(mood => {
      // Count mood types
      moodCounts[mood.mood] = (moodCounts[mood.mood] || 0) + 1;
      
      // Calculate average intensity
      if (!intensitySum[mood.mood]) {
        intensitySum[mood.mood] = 0;
        moodCount[mood.mood] = 0;
      }
      intensitySum[mood.mood] += mood.intensity;
      moodCount[mood.mood] += 1;

      // Weekly data
      const week = Math.ceil((new Date() - mood.date) / (7 * 24 * 60 * 60 * 1000));
      if (!weeklyData[week]) {
        weeklyData[week] = { total: 0, count: 0 };
      }
      weeklyData[week].total += mood.intensity;
      weeklyData[week].count += 1;

      // Daily averages
      const day = mood.date.toISOString().split('T')[0];
      if (!dailyAverages[day]) {
        dailyAverages[day] = { total: 0, count: 0 };
      }
      dailyAverages[day].total += mood.intensity;
      dailyAverages[day].count += 1;
    });

    // Calculate averages
    const moodAverages = {};
    Object.keys(intensitySum).forEach(mood => {
      moodAverages[mood] = intensitySum[mood] / moodCount[mood];
    });

    // Calculate overall average
    const overallAverage = moods.length > 0 
      ? moods.reduce((sum, mood) => sum + mood.intensity, 0) / moods.length 
      : 0;

    // Get most common mood
    const mostCommonMood = Object.keys(moodCounts).reduce((a, b) => 
      moodCounts[a] > moodCounts[b] ? a : b, 'neutral'
    );

    // Calculate trend (comparing first half vs second half)
    const midPoint = Math.floor(moods.length / 2);
    const firstHalf = moods.slice(0, midPoint);
    const secondHalf = moods.slice(midPoint);
    
    const firstHalfAvg = firstHalf.length > 0 
      ? firstHalf.reduce((sum, mood) => sum + mood.intensity, 0) / firstHalf.length 
      : 0;
    const secondHalfAvg = secondHalf.length > 0 
      ? secondHalf.reduce((sum, mood) => sum + mood.intensity, 0) / secondHalf.length 
      : 0;
    
    const trend = secondHalfAvg - firstHalfAvg;

    res.json({
      period: `${days} days`,
      totalEntries: moods.length,
      overallAverage: Math.round(overallAverage * 10) / 10,
      mostCommonMood,
      trend: Math.round(trend * 10) / 10,
      moodCounts,
      moodAverages,
      weeklyData,
      dailyAverages: Object.keys(dailyAverages).map(day => ({
        date: day,
        average: Math.round((dailyAverages[day].total / dailyAverages[day].count) * 10) / 10
      })).sort((a, b) => new Date(a.date) - new Date(b.date))
    });
  } catch (error) {
    console.error('Get mood stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/mood/:id
// @desc    Update a mood entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({ message: 'Mood updated successfully', mood });
  } catch (error) {
    console.error('Update mood error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/mood/:id
// @desc    Delete a mood entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const mood = await Mood.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!mood) {
      return res.status(404).json({ message: 'Mood entry not found' });
    }

    res.json({ message: 'Mood deleted successfully' });
  } catch (error) {
    console.error('Delete mood error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
