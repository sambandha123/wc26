const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teams = await prisma.team.findMany({
      orderBy: [
        { group: 'asc' },
        { pts: 'desc' },
        { gd: 'desc' },
        { gf: 'desc' }
      ]
    });

    const groups = teams.reduce((acc, team) => {
      if (!acc[team.group]) acc[team.group] = [];
      acc[team.group].push(team);
      return acc;
    }, {});

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
