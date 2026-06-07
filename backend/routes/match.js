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

module.exports = router;
