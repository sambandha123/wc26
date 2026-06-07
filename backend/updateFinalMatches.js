const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Jun 22", "time": "22:45", "team_a": "Argentina", "team_b": "Austria" },
    { "date": "Jun 23", "time": "02:45", "team_a": "France", "team_b": "Iraq" },
    { "date": "Jun 23", "time": "05:45", "team_a": "Norway", "team_b": "Senegal" },
    { "date": "Jun 23", "time": "08:45", "team_a": "Jordan", "team_b": "Algeria" },
    { "date": "Jun 23", "time": "22:45", "team_a": "Portugal", "team_b": "Uzbekistan" },
    { "date": "Jun 24", "time": "01:45", "team_a": "England", "team_b": "Ghana" },
    { "date": "Jun 24", "time": "04:45", "team_a": "Panama", "team_b": "Croatia" }
  ]
};

async function updateFinalMatches() {
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
  console.log("Successfully updated 7 matches from the third screenshot.");
}

updateFinalMatches().catch(console.error).finally(() => prisma.$disconnect());
