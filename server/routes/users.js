const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // This would typically aggregate data from other collections
    const stats = {
      joinDate: user.createdAt,
      lastLogin: user.lastLogin,
      totalMoodEntries: 0, // Would be calculated from Mood collection
      totalJournalEntries: 0, // Would be calculated from Journal collection
      therapySessions: 0, // Would be calculated from Therapy collection
      isActive: user.isActive
    };

    res.json(stats);
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
