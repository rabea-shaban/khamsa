import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, afterAll, beforeEach } from 'vitest';

let mongoServer: MongoMemoryServer | null = null;

beforeAll(async () => {
  const localTestUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/khamsa_cms_test';

  try {
    // Try connecting to local MongoDB first (fast)
    await mongoose.connect(localTestUri, { serverSelectionTimeoutMS: 2000 });
  } catch {
    // Fallback to in-memory server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});
