const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const teams = [
  // Group A
  { name: 'Mexico', group: 'A', flag: 'https://flagcdn.com/w40/mx.png' },
  { name: 'South Africa', group: 'A', flag: 'https://flagcdn.com/w40/za.png' },
  { name: 'South Korea', group: 'A', flag: 'https://flagcdn.com/w40/kr.png' },
  { name: 'Czechia', group: 'A', flag: 'https://flagcdn.com/w40/cz.png' },
  // Group B
  { name: 'Canada', group: 'B', flag: 'https://flagcdn.com/w40/ca.png' },
  { name: 'Bosnia and Herzegovina', group: 'B', flag: 'https://flagcdn.com/w40/ba.png' },
  { name: 'Qatar', group: 'B', flag: 'https://flagcdn.com/w40/qa.png' },
  { name: 'Switzerland', group: 'B', flag: 'https://flagcdn.com/w40/ch.png' },
  // Group C
  { name: 'Brazil', group: 'C', flag: 'https://flagcdn.com/w40/br.png' },
  { name: 'Morocco', group: 'C', flag: 'https://flagcdn.com/w40/ma.png' },
  { name: 'Haiti', group: 'C', flag: 'https://flagcdn.com/w40/ht.png' },
  { name: 'Scotland', group: 'C', flag: 'https://flagcdn.com/w40/gb-sct.png' },
  // Group D
  { name: 'USA', group: 'D', flag: 'https://flagcdn.com/w40/us.png' },
  { name: 'Paraguay', group: 'D', flag: 'https://flagcdn.com/w40/py.png' },
  { name: 'Australia', group: 'D', flag: 'https://flagcdn.com/w40/au.png' },
  { name: 'Türkiye', group: 'D', flag: 'https://flagcdn.com/w40/tr.png' },
  // Group E
  { name: 'Germany', group: 'E', flag: 'https://flagcdn.com/w40/de.png' },
  { name: 'Curaçao', group: 'E', flag: 'https://flagcdn.com/w40/cw.png' },
  { name: 'Ivory Coast', group: 'E', flag: 'https://flagcdn.com/w40/ci.png' },
  { name: 'Ecuador', group: 'E', flag: 'https://flagcdn.com/w40/ec.png' },
  // Group F
  { name: 'Netherlands', group: 'F', flag: 'https://flagcdn.com/w40/nl.png' },
  { name: 'Japan', group: 'F', flag: 'https://flagcdn.com/w40/jp.png' },
  { name: 'Sweden', group: 'F', flag: 'https://flagcdn.com/w40/se.png' },
  { name: 'Tunisia', group: 'F', flag: 'https://flagcdn.com/w40/tn.png' },
  // Group G
  { name: 'Belgium', group: 'G', flag: 'https://flagcdn.com/w40/be.png' },
  { name: 'Egypt', group: 'G', flag: 'https://flagcdn.com/w40/eg.png' },
  { name: 'Iran', group: 'G', flag: 'https://flagcdn.com/w40/ir.png' },
  { name: 'New Zealand', group: 'G', flag: 'https://flagcdn.com/w40/nz.png' },
  // Group H
  { name: 'Spain', group: 'H', flag: 'https://flagcdn.com/w40/es.png' },
  { name: 'Cape Verde', group: 'H', flag: 'https://flagcdn.com/w40/cv.png' },
  { name: 'Saudi Arabia', group: 'H', flag: 'https://flagcdn.com/w40/sa.png' },
  { name: 'Uruguay', group: 'H', flag: 'https://flagcdn.com/w40/uy.png' },
  // Group I
  { name: 'France', group: 'I', flag: 'https://flagcdn.com/w40/fr.png' },
  { name: 'Senegal', group: 'I', flag: 'https://flagcdn.com/w40/sn.png' },
  { name: 'Iraq', group: 'I', flag: 'https://flagcdn.com/w40/iq.png' },
  { name: 'Norway', group: 'I', flag: 'https://flagcdn.com/w40/no.png' },
  // Group J
  { name: 'Argentina', group: 'J', flag: 'https://flagcdn.com/w40/ar.png' },
  { name: 'Algeria', group: 'J', flag: 'https://flagcdn.com/w40/dz.png' },
  { name: 'Austria', group: 'J', flag: 'https://flagcdn.com/w40/at.png' },
  { name: 'Jordan', group: 'J', flag: 'https://flagcdn.com/w40/jo.png' },
  // Group K
  { name: 'Portugal', group: 'K', flag: 'https://flagcdn.com/w40/pt.png' },
  { name: 'DR Congo', group: 'K', flag: 'https://flagcdn.com/w40/cd.png' },
  { name: 'Uzbekistan', group: 'K', flag: 'https://flagcdn.com/w40/uz.png' },
  { name: 'Colombia', group: 'K', flag: 'https://flagcdn.com/w40/co.png' },
  // Group L
  { name: 'England', group: 'L', flag: 'https://flagcdn.com/w40/gb-eng.png' },
  { name: 'Croatia', group: 'L', flag: 'https://flagcdn.com/w40/hr.png' },
  { name: 'Ghana', group: 'L', flag: 'https://flagcdn.com/w40/gh.png' },
  { name: 'Panama', group: 'L', flag: 'https://flagcdn.com/w40/pa.png' }
];

async function seed() {
  try {
    await prisma.team.deleteMany({});
    
    for (const t of teams) {
      await prisma.team.create({ data: t });
    }
    console.log('Group stage teams seeded successfully!');
  } catch (err) {
    console.error('Failed to seed teams:', err);
  }
}

seed().finally(() => prisma.$disconnect());
