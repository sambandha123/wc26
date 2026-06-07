const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Jun 26", "time": "01:45", "team_a": "Curaçao", "team_b": "Ivory Coast" },
    { "date": "Jun 26", "time": "01:45", "team_a": "Ecuador", "team_b": "Germany" },
    { "date": "Jun 26", "time": "04:45", "team_a": "Tunisia", "team_b": "Netherlands" },
    { "date": "Jun 26", "time": "04:45", "team_a": "Japan", "team_b": "Sweden" },
    { "date": "Jun 26", "time": "07:45", "team_a": "Türkiye", "team_b": "USA" },
    { "date": "Jun 26", "time": "07:45", "team_a": "Paraguay", "team_b": "Australia" },
    { "date": "Jun 27", "time": "00:45", "team_a": "Norway", "team_b": "France" },
    { "date": "Jun 27", "time": "00:45", "team_a": "Senegal", "team_b": "Iraq" }
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
  console.log("Successfully updated 8 matches from the fifth screenshot.");
}

updateMoreMatches().catch(console.error).finally(() => prisma.$disconnect());
