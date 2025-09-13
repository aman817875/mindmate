const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/recommendations
// @desc    Get personalized recommendations
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const recommendations = [
      {
        type: 'song',
        title: 'Calming Playlist',
        description: 'Based on your recent mood entries, here are some soothing songs',
        link: 'https://open.spotify.com/playlist/calming',
        confidence: 0.8
      },
      {
        type: 'exercise',
        title: 'Breathing Exercise',
        description: 'Try the 4-7-8 breathing technique to reduce stress',
        link: '/meditation/breathing',
        confidence: 0.9
      }
    ];

    res.json(recommendations);
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
