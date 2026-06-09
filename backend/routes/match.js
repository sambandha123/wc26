const express = require('express');
const prisma = require('../prismaClient');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all matches
router.get('/', async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      orderBy: { match_time: 'asc' }
    });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a match (Admin only)
router.post('/', protect, admin, async (req, res) => {
  try {
    const match = await prisma.match.create({
      data: req.body
    });
    res.status(201).json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update match (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
  try {
    const match = await prisma.match.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(match);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resolve match and calculate points (Admin only)
router.put('/:id/resolve', protect, admin, async (req, res) => {
  try {
    const {
      actual_first_center, actual_first_corner, actual_first_scorer,
      actual_score_a, actual_score_b,
      actual_yellow_cards_a, actual_yellow_cards_b,
      actual_red_cards_a, actual_red_cards_b,
      actual_winner
    } = req.body;

    // 1. Update Match record
    const match = await prisma.match.update({
      where: { id: req.params.id },
      data: {
        status: 'FINISHED',
        score_a: parseInt(actual_score_a),
        score_b: parseInt(actual_score_b),
        actual_first_center,
        actual_first_corner,
        actual_first_scorer,
        actual_yellow_cards_a: parseInt(actual_yellow_cards_a),
        actual_yellow_cards_b: parseInt(actual_yellow_cards_b),
        actual_red_cards_a: parseInt(actual_red_cards_a),
        actual_red_cards_b: parseInt(actual_red_cards_b),
        actual_winner
      }
    });

    // 2. Find all VERIFIED predictions for this match
    const predictions = await prisma.prediction.findMany({
      where: { match_id: req.params.id, status: 'VERIFIED' }
    });

    // 3. Calculate points (1 pt each) and update users
    for (const pred of predictions) {
      let earned = 0;
      if (pred.winner === actual_winner) earned += 1;
      if (pred.score_a === parseInt(actual_score_a)) earned += 1;
      if (pred.score_b === parseInt(actual_score_b)) earned += 1;
      if (pred.first_center === actual_first_center) earned += 1;
      if (pred.first_corner === actual_first_corner) earned += 1;
      if (pred.first_scorer === actual_first_scorer) earned += 1;

      // Card logic with penalties
      if (pred.yellow_cards_a === parseInt(actual_yellow_cards_a)) {
        earned += 1;
      } else {
        earned -= Math.abs(pred.yellow_cards_a - parseInt(actual_yellow_cards_a));
      }

      if (pred.yellow_cards_b === parseInt(actual_yellow_cards_b)) {
        earned += 1;
      } else {
        earned -= Math.abs(pred.yellow_cards_b - parseInt(actual_yellow_cards_b));
      }

      if (pred.red_cards_a === parseInt(actual_red_cards_a)) {
        earned += 1;
      } else {
        earned -= Math.abs(pred.red_cards_a - parseInt(actual_red_cards_a));
      }

      if (pred.red_cards_b === parseInt(actual_red_cards_b)) {
        earned += 1;
      } else {
        earned -= Math.abs(pred.red_cards_b - parseInt(actual_red_cards_b));
      }

      // Always update prediction with the points (can be negative)
      await prisma.prediction.update({
        where: { id: pred.id },
        data: { points_earned: earned }
      });
      
      // Update global user points if it's not exactly 0
      if (earned !== 0) {
        await prisma.user.update({
          where: { id: pred.user_id },
          data: { points: { increment: earned } }
        });
      }
    }

    res.json({ message: 'Match resolved and points distributed', match });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
