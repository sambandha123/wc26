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
  // Jun 23
  { team_a: 'France', team_b: 'Iraq', group_name: 'I', date: '2026-06-23T02:45:00Z' },
  { team_a: 'Norway', team_b: 'Senegal', group_name: 'I', date: '2026-06-23T05:45:00Z' },
  { team_a: 'Jordan', team_b: 'Algeria', group_name: 'J', date: '2026-06-23T08:45:00Z' },
  { team_a: 'Portugal', team_b: 'Uzbekistan', group_name: 'K', date: '2026-06-23T22:45:00Z' },
  // Jun 24
  { team_a: 'England', team_b: 'Ghana', group_name: 'L', date: '2026-06-24T01:45:00Z' },
  { team_a: 'Panama', team_b: 'Croatia', group_name: 'L', date: '2026-06-24T04:45:00Z' },
  { team_a: 'Colombia', team_b: 'DR Congo', group_name: 'K', date: '2026-06-24T07:45:00Z' },
  // Jun 25
  { team_a: 'Switzerland', team_b: 'Canada', group_name: 'B', date: '2026-06-25T00:45:00Z' },
  { team_a: 'Bosnia and Herzegovina', team_b: 'Qatar', group_name: 'B', date: '2026-06-25T00:45:00Z' },
  { team_a: 'Morocco', team_b: 'Haiti', group_name: 'C', date: '2026-06-25T03:45:00Z' },
  { team_a: 'Scotland', team_b: 'Brazil', group_name: 'C', date: '2026-06-25T03:45:00Z' },
  { team_a: 'South Africa', team_b: 'South Korea', group_name: 'A', date: '2026-06-25T06:45:00Z' },
  { team_a: 'Czechia', team_b: 'Mexico', group_name: 'A', date: '2026-06-25T06:45:00Z' },
  // Jun 26
  { team_a: 'Curaçao', team_b: 'Ivory Coast', group_name: 'E', date: '2026-06-26T01:45:00Z' },
  { team_a: 'Ecuador', team_b: 'Germany', group_name: 'E', date: '2026-06-26T01:45:00Z' },
  { team_a: 'Tunisia', team_b: 'Netherlands', group_name: 'F', date: '2026-06-26T04:45:00Z' },
  { team_a: 'Japan', team_b: 'Sweden', group_name: 'F', date: '2026-06-26T04:45:00Z' },
  { team_a: 'Türkiye', team_b: 'USA', group_name: 'D', date: '2026-06-26T07:45:00Z' },
  { team_a: 'Paraguay', team_b: 'Australia', group_name: 'D', date: '2026-06-26T07:45:00Z' },
  // Jun 27
  { team_a: 'Norway', team_b: 'France', group_name: 'I', date: '2026-06-27T00:45:00Z' },
  { team_a: 'Senegal', team_b: 'Iraq', group_name: 'I', date: '2026-06-27T00:45:00Z' },
  { team_a: 'Cape Verde', team_b: 'Saudi Arabia', group_name: 'H', date: '2026-06-27T05:45:00Z' },
  { team_a: 'Uruguay', team_b: 'Spain', group_name: 'H', date: '2026-06-27T05:45:00Z' },
  { team_a: 'New Zealand', team_b: 'Belgium', group_name: 'G', date: '2026-06-27T08:45:00Z' },
  { team_a: 'Egypt', team_b: 'Iran', group_name: 'G', date: '2026-06-27T08:45:00Z' },
  // Jun 28
  { team_a: 'Panama', team_b: 'England', group_name: 'L', date: '2026-06-28T02:45:00Z' },
  { team_a: 'Croatia', team_b: 'Ghana', group_name: 'L', date: '2026-06-28T02:45:00Z' },
  { team_a: 'Colombia', team_b: 'Portugal', group_name: 'K', date: '2026-06-28T05:15:00Z' },
  { team_a: 'DR Congo', team_b: 'Uzbekistan', group_name: 'K', date: '2026-06-28T05:15:00Z' },
  { team_a: 'Algeria', team_b: 'Austria', group_name: 'J', date: '2026-06-28T07:45:00Z' },
  { team_a: 'Jordan', team_b: 'Argentina', group_name: 'J', date: '2026-06-28T07:45:00Z' },
];

async function seed() {
  try {
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
    console.log(`Successfully seeded ${matchesData.length} new matches!`);
  } catch (err) {
    console.error('Error seeding matches:', err);
  }
}

seed().finally(() => prisma.$disconnect());
