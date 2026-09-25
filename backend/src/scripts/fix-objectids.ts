import mongoose from 'mongoose';
import { env } from '../config/env.config';

async function fixObjectIds() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(env.MONGODB_URI);
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database handle not available');
    }

    const collections = ['users', 'articles', 'videos', 'media', 'settings'];

    for (const colName of collections) {
      const collection = db.collection(colName);
      const docs = await collection.find({}).toArray();
      console.log(`Checking ${colName} (${docs.length} documents)...`);

      for (const doc of docs) {
        let needsUpdate = false;
        const newDoc = { ...doc };

        // 1. Fix _id if string
        if (typeof doc._id === 'string' && /^[0-9a-fA-F]{24}$/.test(doc._id)) {
          const oldId = doc._id;
          newDoc._id = new mongoose.Types.ObjectId(oldId);
          await collection.deleteOne({ _id: oldId });
          await collection.insertOne(newDoc);
          console.log(`  Converted _id to ObjectId in ${colName}: ${oldId}`);
          continue;
        }

        // 2. Fix relation fields if string
        const relationFields = ['author', 'uploadedBy', 'userId'];
        const updateFields: Record<string, unknown> = {};

        for (const field of relationFields) {
          if (
            typeof doc[field] === 'string' &&
            /^[0-9a-fA-F]{24}$/.test(doc[field])
          ) {
            updateFields[field] = new mongoose.Types.ObjectId(doc[field]);
            needsUpdate = true;
          }
        }

        if (needsUpdate) {
          await collection.updateOne({ _id: doc._id }, { $set: updateFields });
          console.log(`  Updated relations in ${colName} for doc: ${doc._id}`);
        }
      }
    }

    console.log('✅ All ObjectIds and relations fixed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error fixing ObjectIds:', err);
    process.exit(1);
  }
}

fixObjectIds();
