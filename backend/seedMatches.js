const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const flags = {
  'Mexico': 'https://flagcdn.com/w40/mx.png',
  'South Africa': 'https://flagcdn.com/w40/za.png',
  'South Korea': 'https://flagcdn.com/w40/kr.png',
  'Czechia': 'https://flagcdn.com/w40/cz.png',
  'Canada': 'https://flagcdn.com/w40/ca.png',
  'Bosnia and Herzegovina': 'https://flagcdn.com/w40/ba.png',
  'Qatar': 'https://flagcdn.com/w40/qa.png',
  'Switzerland': 'https://flagcdn.com/w40/ch.png',
  'Brazil': 'https://flagcdn.com/w40/br.png',
  'Morocco': 'https://flagcdn.com/w40/ma.png',
  'Haiti': 'https://flagcdn.com/w40/ht.png',
  'Scotland': 'https://flagcdn.com/w40/gb-sct.png',
  'USA': 'https://flagcdn.com/w40/us.png',
  'Paraguay': 'https://flagcdn.com/w40/py.png',
  'Australia': 'https://flagcdn.com/w40/au.png',
  'Türkiye': 'https://flagcdn.com/w40/tr.png',
  'Germany': 'https://flagcdn.com/w40/de.png',
  'Curaçao': 'https://flagcdn.com/w40/cw.png',
  'Ivory Coast': 'https://flagcdn.com/w40/ci.png',
  'Ecuador': 'https://flagcdn.com/w40/ec.png',
  'Netherlands': 'https://flagcdn.com/w40/nl.png',
  'Japan': 'https://flagcdn.com/w40/jp.png',
  'Sweden': 'https://flagcdn.com/w40/se.png',
  'Tunisia': 'https://flagcdn.com/w40/tn.png',
  'Belgium': 'https://flagcdn.com/w40/be.png',
  'Egypt': 'https://flagcdn.com/w40/eg.png',
  'Iran': 'https://flagcdn.com/w40/ir.png',
  'New Zealand': 'https://flagcdn.com/w40/nz.png',
  'Spain': 'https://flagcdn.com/w40/es.png',
  'Cape Verde': 'https://flagcdn.com/w40/cv.png',
  'Saudi Arabia': 'https://flagcdn.com/w40/sa.png',
  'Uruguay': 'https://flagcdn.com/w40/uy.png',
  'France': 'https://flagcdn.com/w40/fr.png',
  'Senegal': 'https://flagcdn.com/w40/sn.png',
  'Iraq': 'https://flagcdn.com/w40/iq.png',
  'Norway': 'https://flagcdn.com/w40/no.png',
  'Argentina': 'https://flagcdn.com/w40/ar.png',
  'Algeria': 'https://flagcdn.com/w40/dz.png',
  'Austria': 'https://flagcdn.com/w40/at.png',
  'Jordan': 'https://flagcdn.com/w40/jo.png',
  'Portugal': 'https://flagcdn.com/w40/pt.png',
  'DR Congo': 'https://flagcdn.com/w40/cd.png',
  'Uzbekistan': 'https://flagcdn.com/w40/uz.png',
  'Colombia': 'https://flagcdn.com/w40/co.png',
  'England': 'https://flagcdn.com/w40/gb-eng.png',
  'Croatia': 'https://flagcdn.com/w40/hr.png',
  'Ghana': 'https://flagcdn.com/w40/gh.png',
  'Panama': 'https://flagcdn.com/w40/pa.png'
};

const matchesData = [
  // Jun 12
  { team_a: 'Mexico', team_b: 'South Africa', group_name: 'A', date: '2026-06-12T00:45:00Z' },
  { team_a: 'South Korea', team_b: 'Czechia', group_name: 'A', date: '2026-06-12T07:45:00Z' },
  // Jun 13
  { team_a: 'Canada', team_b: 'Bosnia and Herzegovina', group_name: 'B', date: '2026-06-13T00:45:00Z' },
  { team_a: 'USA', team_b: 'Paraguay', group_name: 'D', date: '2026-06-13T06:45:00Z' },
  // Jun 14
  { team_a: 'Qatar', team_b: 'Switzerland', group_name: 'B', date: '2026-06-14T00:45:00Z' },
  { team_a: 'Brazil', team_b: 'Morocco', group_name: 'C', date: '2026-06-14T03:45:00Z' },
  { team_a: 'Haiti', team_b: 'Scotland', group_name: 'C', date: '2026-06-14T06:45:00Z' },
  { team_a: 'Australia', team_b: 'Türkiye', group_name: 'D', date: '2026-06-14T09:45:00Z' },
  { team_a: 'Germany', team_b: 'Curaçao', group_name: 'E', date: '2026-06-14T22:45:00Z' },
  // Jun 15
  { team_a: 'Netherlands', team_b: 'Japan', group_name: 'F', date: '2026-06-15T01:45:00Z' },
  { team_a: 'Ivory Coast', team_b: 'Ecuador', group_name: 'E', date: '2026-06-15T04:45:00Z' },
  { team_a: 'Sweden', team_b: 'Tunisia', group_name: 'F', date: '2026-06-15T07:45:00Z' },
  { team_a: 'Spain', team_b: 'Cape Verde', group_name: 'H', date: '2026-06-15T21:45:00Z' },
  // Jun 16
  { team_a: 'Belgium', team_b: 'Egypt', group_name: 'G', date: '2026-06-16T00:45:00Z' },
  { team_a: 'Saudi Arabia', team_b: 'Uruguay', group_name: 'H', date: '2026-06-16T03:45:00Z' },
  { team_a: 'Iran', team_b: 'New Zealand', group_name: 'G', date: '2026-06-16T06:45:00Z' },
  // Jun 17
  { team_a: 'France', team_b: 'Senegal', group_name: 'I', date: '2026-06-17T00:45:00Z' },
  { team_a: 'Iraq', team_b: 'Norway', group_name: 'I', date: '2026-06-17T03:45:00Z' },
  { team_a: 'Argentina', team_b: 'Algeria', group_name: 'J', date: '2026-06-17T06:45:00Z' },
  { team_a: 'Austria', team_b: 'Jordan', group_name: 'J', date: '2026-06-17T09:45:00Z' },
  { team_a: 'Portugal', team_b: 'DR Congo', group_name: 'K', date: '2026-06-17T22:45:00Z' },
  // Jun 18
  { team_a: 'England', team_b: 'Croatia', group_name: 'L', date: '2026-06-18T01:45:00Z' },
  { team_a: 'Ghana', team_b: 'Panama', group_name: 'L', date: '2026-06-18T04:45:00Z' },
  { team_a: 'Uzbekistan', team_b: 'Colombia', group_name: 'K', date: '2026-06-18T07:45:00Z' },
  { team_a: 'Czechia', team_b: 'South Africa', group_name: 'A', date: '2026-06-18T21:45:00Z' },
  // Jun 19
  { team_a: 'Switzerland', team_b: 'Bosnia and Herzegovina', group_name: 'B', date: '2026-06-19T00:45:00Z' },
  { team_a: 'Canada', team_b: 'Qatar', group_name: 'B', date: '2026-06-19T03:45:00Z' },
  { team_a: 'Mexico', team_b: 'South Korea', group_name: 'A', date: '2026-06-19T06:45:00Z' },
  // Jun 20
  { team_a: 'USA', team_b: 'Australia', group_name: 'D', date: '2026-06-20T00:45:00Z' },
  { team_a: 'Scotland', team_b: 'Morocco', group_name: 'C', date: '2026-06-20T03:45:00Z' },
  { team_a: 'Brazil', team_b: 'Haiti', group_name: 'C', date: '2026-06-20T06:15:00Z' },
  { team_a: 'Türkiye', team_b: 'Paraguay', group_name: 'D', date: '2026-06-20T08:45:00Z' },
  { team_a: 'Netherlands', team_b: 'Sweden', group_name: 'F', date: '2026-06-20T22:45:00Z' },
  // Jun 21
  { team_a: 'Germany', team_b: 'Ivory Coast', group_name: 'E', date: '2026-06-21T01:45:00Z' },
  { team_a: 'Ecuador', team_b: 'Curaçao', group_name: 'E', date: '2026-06-21T05:45:00Z' },
  { team_a: 'Tunisia', team_b: 'Japan', group_name: 'F', date: '2026-06-21T09:45:00Z' },
  { team_a: 'Spain', team_b: 'Saudi Arabia', group_name: 'H', date: '2026-06-21T21:45:00Z' },
  // Jun 22
  { team_a: 'Belgium', team_b: 'Iran', group_name: 'G', date: '2026-06-22T00:45:00Z' },
  { team_a: 'Uruguay', team_b: 'Cape Verde', group_name: 'H', date: '2026-06-22T03:45:00Z' },
  { team_a: 'New Zealand', team_b: 'Egypt', group_name: 'G', date: '2026-06-22T06:45:00Z' },
  { team_a: 'Argentina', team_b: 'Austria', group_name: 'J', date: '2026-06-22T22:45:00Z' },
];

async function seed() {
  try {
    await prisma.prediction.deleteMany({});
    await prisma.match.deleteMany({});
    
    for (const m of matchesData) {
      await prisma.match.create({
        data: {
          team_a: m.team_a,
          team_b: m.team_b,
          team_a_logo: flags[m.team_a] || 'https://flagcdn.com/w40/un.png',
          team_b_logo: flags[m.team_b] || 'https://flagcdn.com/w40/un.png',
          match_time: new Date(m.date),
          stadium: 'TBD',
          group_name: m.group_name
        }
      });
    }
    console.log(`Successfully seeded ${matchesData.length} matches!`);
  } catch (err) {
    console.error('Error seeding matches:', err);
  }
}

seed().finally(() => prisma.$disconnect());
