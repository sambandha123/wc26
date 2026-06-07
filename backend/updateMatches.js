const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTimes() {
  const updates = [
    { teams: ['Qatar', 'Switzerland'], time: '2026-06-13T19:00:00.000Z' },
    { teams: ['Brazil', 'Morocco'], time: '2026-06-13T22:00:00.000Z' },
    { teams: ['Haiti', 'Scotland'], time: '2026-06-14T01:00:00.000Z' },
    { teams: ['Australia', 'Türkiye'], time: '2026-06-14T04:00:00.000Z' },
    { teams: ['Germany', 'Curaçao'], time: '2026-06-14T17:00:00.000Z' },
    { teams: ['Netherlands', 'Japan'], time: '2026-06-14T20:00:00.000Z' },
    { teams: ['Ivory Coast', 'Ecuador'], time: '2026-06-14T23:00:00.000Z' },
    { teams: ['Sweden', 'Tunisia'], time: '2026-06-15T02:00:00.000Z' },
    { teams: ['Spain', 'Cape Verde'], time: '2026-06-15T16:00:00.000Z' }, // Cabo Verde is Cape Verde in DB
    { teams: ['Belgium', 'Egypt'], time: '2026-06-15T19:00:00.000Z' },
    { teams: ['Saudi Arabia', 'Uruguay'], time: '2026-06-15T22:00:00.000Z' },
    { teams: ['Iran', 'New Zealand'], time: '2026-06-16T01:00:00.000Z' },
  ];

  for (const update of updates) {
    const [team1, team2] = update.teams;
    await prisma.match.updateMany({
      where: {
        OR: [
          { team_a: team1, team_b: team2 },
          { team_a: team2, team_b: team1 }
        ]
      },
      data: { match_time: new Date(update.time) }
    });
  }

  console.log("Updated additional matches successfully.");
}

updateTimes().catch(console.error).finally(() => prisma.$disconnect());
