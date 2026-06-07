const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Sat, Jun 20", "time": "06:15", "team_a": "Brazil", "team_b": "Haiti" },
    { "date": "Sat, Jun 20", "time": "08:45", "team_a": "Türkiye", "team_b": "Paraguay" },
    { "date": "Sat, Jun 20", "time": "22:45", "team_a": "Netherlands", "team_b": "Sweden" }
  ]
};

async function update3Matches() {
  for (const m of data.matches) {
    const dateStr = m.date.split(',')[1].trim(); 
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
  console.log("Successfully updated 3 matches from the screenshot.");
}

update3Matches().catch(console.error).finally(() => prisma.$disconnect());
