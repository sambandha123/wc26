const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { points: 'desc' },
      take: 100,
      select: { id: true, name: true, points: true, avatar: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
