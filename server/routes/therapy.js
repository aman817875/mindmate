const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/therapy/therapists
// @desc    Get available therapists
// @access  Private
router.get('/therapists', auth, async (req, res) => {
  try {
    const therapists = [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        specialization: 'Anxiety & Depression',
        rating: 4.9,
        experience: '8 years',
        nextAvailable: 'Today, 2:00 PM',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        specialization: 'Trauma & PTSD',
        rating: 4.8,
        experience: '12 years',
        nextAvailable: 'Tomorrow, 10:00 AM',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
      }
    ];

    res.json(therapists);
  } catch (error) {
    console.error('Get therapists error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
