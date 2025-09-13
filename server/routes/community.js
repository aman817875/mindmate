const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/community/posts
// @desc    Get community posts
// @access  Private
router.get('/posts', auth, async (req, res) => {
  try {
    const posts = [
      {
        id: 1,
        author: 'Sarah M.',
        title: 'Coping with work stress',
        content: 'I\'ve been feeling overwhelmed at work lately. Does anyone have strategies that help them manage work-related anxiety?',
        category: 'anxiety',
        likes: 12,
        comments: 8,
        timeAgo: '2 hours ago',
        tags: ['work', 'stress', 'anxiety']
      }
    ];

    res.json(posts);
  } catch (error) {
    console.error('Get community posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
