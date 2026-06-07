const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
  console.log("Fixing match times...");
  const matches = await prisma.match.findMany();
  
  for (const match of matches) {
    // Current time in DB is, for example, 2026-06-12T00:45:00Z
    // We want it to be 5 hours and 45 minutes EARLIER, so that when 5h45m is ADDED by the frontend, it shows 00:45.
    const oldDate = new Date(match.match_time);
    const newDate = new Date(oldDate.getTime() - (5 * 60 + 45) * 60 * 1000);
    
    await prisma.match.update({
      where: { id: match.id },
      data: { match_time: newDate }
    });
  }
  
  console.log(`Successfully fixed ${matches.length} matches!`);
  await prisma.$disconnect();
}

fix().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
