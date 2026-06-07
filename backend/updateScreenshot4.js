const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Jun 24", "time": "07:45", "team_a": "Colombia", "team_b": "DR Congo" },
    { "date": "Jun 25", "time": "00:45", "team_a": "Switzerland", "team_b": "Canada" },
    { "date": "Jun 25", "time": "00:45", "team_a": "Bosnia and Herzegovina", "team_b": "Qatar" },
    { "date": "Jun 25", "time": "03:45", "team_a": "Morocco", "team_b": "Haiti" },
    { "date": "Jun 25", "time": "03:45", "team_a": "Scotland", "team_b": "Brazil" },
    { "date": "Jun 25", "time": "06:45", "team_a": "South Africa", "team_b": "South Korea" },
    { "date": "Jun 25", "time": "06:45", "team_a": "Czechia", "team_b": "Mexico" }
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
  console.log("Successfully updated 7 matches from the fourth screenshot.");
}

updateMoreMatches().catch(console.error).finally(() => prisma.$disconnect());
