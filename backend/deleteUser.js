const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteUser() {
  const email = 'sambandhathapa290@gmail.com';
  
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    console.log(`No user found with email: ${email}`);
    await prisma.$disconnect();
    return;
  }

  console.log(`Found user: ${user.name} (${user.email}), ID: ${user.id}`);

  // Delete related records first (foreign key constraints)
  const deletedNotifications = await prisma.notification.deleteMany({ where: { user_id: user.id } });
  console.log(`Deleted ${deletedNotifications.count} notifications`);

  // Delete predictions (must come before payments due to payment_id FK)
  const deletedPredictions = await prisma.prediction.deleteMany({ where: { user_id: user.id } });
  console.log(`Deleted ${deletedPredictions.count} predictions`);

  const deletedPayments = await prisma.payment.deleteMany({ where: { user_id: user.id } });
  console.log(`Deleted ${deletedPayments.count} payments`);

  // Finally delete the user
  await prisma.user.delete({ where: { email } });
  console.log(`Successfully deleted user: ${email}`);

  await prisma.$disconnect();
}

deleteUser().catch(e => {
  console.error(e);
  prisma.$disconnect();
});
