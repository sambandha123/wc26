const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
  const email = 'admin@gmail.com';
  const password = 'Admin@123+123';
  const name = 'Admin';

  // Check if admin already exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Update existing user to admin with new password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN', password_hash, name }
    });
    console.log(`Updated existing user ${email} to ADMIN role with new password.`);
  } else {
    // Create new admin user
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    await prisma.user.create({
      data: { name, email, password_hash, role: 'ADMIN' }
    });
    console.log(`Created new ADMIN user: ${email}`);
  }

  await prisma.$disconnect();
}

createAdmin().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
