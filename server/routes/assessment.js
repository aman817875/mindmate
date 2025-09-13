const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/assessment/questions
// @desc    Get assessment questions
// @access  Private
router.get('/questions', auth, async (req, res) => {
  try {
    const questions = [
      {
        id: 'phq-9',
        title: 'PHQ-9 Depression Assessment',
        description: 'A 9-item depression screening tool',
        questions: [
          {
            id: 1,
            text: 'Little interest or pleasure in doing things',
            options: [
              { value: 0, text: 'Not at all' },
              { value: 1, text: 'Several days' },
              { value: 2, text: 'More than half the days' },
              { value: 3, text: 'Nearly every day' }
            ]
          },
          {
            id: 2,
            text: 'Feeling down, depressed, or hopeless',
            options: [
              { value: 0, text: 'Not at all' },
              { value: 1, text: 'Several days' },
              { value: 2, text: 'More than half the days' },
              { value: 3, text: 'Nearly every day' }
            ]
          }
        ]
      }
    ];

    res.json(questions);
  } catch (error) {
    console.error('Get assessment questions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
