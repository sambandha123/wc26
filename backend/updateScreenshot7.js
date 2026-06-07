const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Jun 27", "time": "05:45", "team_a": "Cabo Verde", "team_b": "Saudi Arabia" },
    { "date": "Jun 27", "time": "05:45", "team_a": "Uruguay", "team_b": "Spain" },
    { "date": "Jun 27", "time": "08:45", "team_a": "New Zealand", "team_b": "Belgium" },
    { "date": "Jun 27", "time": "08:45", "team_a": "Egypt", "team_b": "Iran" },
    { "date": "Jun 28", "time": "02:45", "team_a": "Panama", "team_b": "England" },
    { "date": "Jun 28", "time": "02:45", "team_a": "Croatia", "team_b": "Ghana" },
    { "date": "Jun 28", "time": "05:15", "team_a": "Colombia", "team_b": "Portugal" },
    { "date": "Jun 28", "time": "05:15", "team_a": "DR Congo", "team_b": "Uzbekistan" }
  ]
};

async function updateMoreMatches() {
  for (const m of data.matches) {
    const dateStr = m.date.trim(); 
    const timeStr = m.time;
    const dateTimeStr = `${dateStr}, 2026 ${timeStr}:00 GMT+0545`;
    const matchTime = new Date(dateTimeStr);
    
    const tA = m.team_a === 'Cabo Verde' ? 'Cape Verde' : m.team_a;
    const tB = m.team_b === 'Cabo Verde' ? 'Cape Verde' : m.team_b;

    await prisma.match.updateMany({
      where: {
        OR: [
          { team_a: tA, team_b: tB },
          { team_a: tB, team_b: tA }
        ]
      },
      data: { match_time: matchTime }
    });
  }
  console.log("Successfully updated 8 matches from the latest screenshot.");
}

updateMoreMatches().catch(console.error).finally(() => prisma.$disconnect());
