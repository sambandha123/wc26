const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Sun, Jun 21", "time": "01:45", "team_a": "Germany", "team_b": "Ivory Coast" },
    { "date": "Sun, Jun 21", "time": "05:45", "team_a": "Ecuador", "team_b": "Curaçao" },
    { "date": "Sun, Jun 21", "time": "09:45", "team_a": "Tunisia", "team_b": "Japan" },
    { "date": "Sun, Jun 21", "time": "21:45", "team_a": "Spain", "team_b": "Saudi Arabia" },
    { "date": "Mon, Jun 22", "time": "00:45", "team_a": "Belgium", "team_b": "Iran" },
    { "date": "Mon, Jun 22", "time": "03:45", "team_a": "Uruguay", "team_b": "Cape Verde" }, // Cabo Verde = Cape Verde
    { "date": "Mon, Jun 22", "time": "06:45", "team_a": "New Zealand", "team_b": "Egypt" }
  ]
};

async function updateMoreMatches() {
  for (const m of data.matches) {
    const dateStr = m.date.split(',')[1] ? m.date.split(',')[1].trim() : m.date.trim(); 
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
  console.log("Successfully updated 7 more matches from the latest screenshot.");
}

updateMoreMatches().catch(console.error).finally(() => prisma.$disconnect());
