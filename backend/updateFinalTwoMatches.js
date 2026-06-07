const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Jun 28", "time": "07:45", "team_a": "Algeria", "team_b": "Austria" },
    { "date": "Jun 28", "time": "07:45", "team_a": "Jordan", "team_b": "Argentina" }
  ]
};

async function updateMoreMatches() {
  for (const m of data.matches) {
    const dateStr = m.date.trim(); 
    const timeStr = m.time;
    const dateTimeStr = `${dateStr}, 2026 ${timeStr}:00 GMT+0545`;
    const matchTime = new Date(dateTimeStr);
    
    await prisma.match.updateMany({
      where: {
        OR: [
          { team_a: m.team_a, team_b: m.team_b },
          { team_a: m.team_b, team_b: m.team_a }
        ]
      },
      data: { match_time: matchTime }
    });
  }
  console.log("Successfully updated the final 2 matches from the latest screenshot.");
}

updateMoreMatches().catch(console.error).finally(() => prisma.$disconnect());
