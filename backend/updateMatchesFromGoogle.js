const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {
  "matches": [
    { "date": "Fri, Jun 12", "time": "00:45", "team_a": "Mexico", "team_b": "South Africa" },
    { "date": "Fri, Jun 12", "time": "07:45", "team_a": "South Korea", "team_b": "Czechia" },
    { "date": "Sat, Jun 13", "time": "00:45", "team_a": "Canada", "team_b": "Bosnia and Herzegovina" },
    { "date": "Sat, Jun 13", "time": "06:45", "team_a": "USA", "team_b": "Paraguay" },
    { "date": "Sun, Jun 14", "time": "00:45", "team_a": "Qatar", "team_b": "Switzerland" },
    { "date": "Sun, Jun 14", "time": "03:45", "team_a": "Brazil", "team_b": "Morocco" },
    { "date": "Sun, Jun 14", "time": "06:45", "team_a": "Haiti", "team_b": "Scotland" },
    { "date": "Sun, Jun 14", "time": "09:45", "team_a": "Australia", "team_b": "Türkiye" },
    { "date": "Sun, Jun 14", "time": "22:45", "team_a": "Germany", "team_b": "Curaçao" },
    { "date": "Mon, Jun 15", "time": "01:45", "team_a": "Netherlands", "team_b": "Japan" },
    { "date": "Mon, Jun 15", "time": "04:45", "team_a": "Ivory Coast", "team_b": "Ecuador" },
    { "date": "Mon, Jun 15", "time": "07:45", "team_a": "Sweden", "team_b": "Tunisia" },
    { "date": "Mon, Jun 15", "time": "21:45", "team_a": "Spain", "team_b": "Cabo Verde" },
    { "date": "Tue, Jun 16", "time": "00:45", "team_a": "Belgium", "team_b": "Egypt" },
    { "date": "Tue, Jun 16", "time": "03:45", "team_a": "Saudi Arabia", "team_b": "Uruguay" },
    { "date": "Tue, Jun 16", "time": "06:45", "team_a": "Iran", "team_b": "New Zealand" },
    { "date": "Wed, Jun 17", "time": "00:45", "team_a": "France", "team_b": "Senegal" },
    { "date": "Wed, Jun 17", "time": "03:45", "team_a": "Iraq", "team_b": "Norway" },
    { "date": "Wed, Jun 17", "time": "06:45", "team_a": "Argentina", "team_b": "Algeria" },
    { "date": "Wed, Jun 17", "time": "09:45", "team_a": "Austria", "team_b": "Jordan" },
    { "date": "Wed, Jun 17", "time": "22:45", "team_a": "Portugal", "team_b": "DR Congo" },
    { "date": "Thu, Jun 18", "time": "01:45", "team_a": "England", "team_b": "Croatia" },
    { "date": "Thu, Jun 18", "time": "04:45", "team_a": "Ghana", "team_b": "Panama" },
    { "date": "Thu, Jun 18", "time": "07:45", "team_a": "Uzbekistan", "team_b": "Colombia" },
    { "date": "Thu, Jun 18", "time": "21:45", "team_a": "Czechia", "team_b": "South Africa" },
    { "date": "Fri, Jun 19", "time": "00:45", "team_a": "Switzerland", "team_b": "Bosnia and Herzegovina" },
    { "date": "Fri, Jun 19", "time": "03:45", "team_a": "Canada", "team_b": "Qatar" },
    { "date": "Fri, Jun 19", "time": "06:45", "team_a": "Mexico", "team_b": "South Korea" },
    { "date": "Sat, Jun 20", "time": "00:45", "team_a": "USA", "team_b": "Australia" },
    { "date": "Sat, Jun 20", "time": "03:45", "team_a": "Scotland", "team_b": "Morocco" }
  ]
};

async function updateAllMatches() {
  for (const m of data.matches) {
    // "Fri, Jun 12" -> "Jun 12, 2026"
    const dateStr = m.date.split(',')[1].trim(); 
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
  console.log("Successfully updated 30 matches from Google schedule.");
}

updateAllMatches().catch(console.error).finally(() => prisma.$disconnect());
