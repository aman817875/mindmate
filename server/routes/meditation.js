const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/meditation
// @desc    Get meditation resources
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const meditations = [
      {
        id: 'breathing',
        title: 'Breathing Exercises',
        description: 'Focus on your breath to calm your mind',
        duration: 5,
        type: 'audio',
        exercises: [
          { name: '4-7-8 Breathing', duration: 5, description: 'Inhale for 4, hold for 7, exhale for 8' },
          { name: 'Box Breathing', duration: 4, description: 'Equal inhale, hold, exhale, hold' },
          { name: 'Deep Breathing', duration: 10, description: 'Slow, deep breaths to relax' }
        ]
      },
      {
        id: 'mindfulness',
        title: 'Mindfulness Meditation',
        description: 'Practice present-moment awareness',
        duration: 15,
        type: 'audio',
        exercises: [
          { name: 'Body Scan', duration: 20, description: 'Progressive relaxation through body awareness' },
          { name: 'Loving Kindness', duration: 15, description: 'Cultivate compassion and love' },
          { name: 'Walking Meditation', duration: 10, description: 'Mindful walking practice' }
        ]
      }
    ];

    res.json(meditations);
  } catch (error) {
    console.error('Get meditations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
