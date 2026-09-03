import mongoose from 'mongoose';

export async function addIsActiveToUsers(
  users: Pick<mongoose.Collection, 'updateMany'>,
) {
  return users.updateMany(
    { isActive: { $exists: false } },
    { $set: { isActive: true } },
  );
}

async function runMigration() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error('MONGO_URL must be set to run migrations');
  }

  await mongoose.connect(mongoUrl);

  try {
    const result = await addIsActiveToUsers(
      mongoose.connection.collection('users'),
    );
    console.log(`Updated ${result.modifiedCount} existing user(s).`);
  } finally {
    await mongoose.disconnect();
  }
}

if (require.main === module) {
  void runMigration();
}
