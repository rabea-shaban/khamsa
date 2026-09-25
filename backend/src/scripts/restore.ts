import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import mongoose from 'mongoose';
import { env } from '../config/env.config';

interface BackupPayload {
  version: string;
  appName: string;
  timestamp: string;
  database: string;
  counts: Record<string, number>;
  data: Record<string, unknown[]>;
}

async function runRestore() {
  const targetArg = process.argv[2];
  const backupsDir = path.resolve(process.cwd(), 'backups');

  let targetFilePath = targetArg;

  if (!targetFilePath) {
    // Find most recent backup in backupsDir
    if (!fs.existsSync(backupsDir)) {
      throw new Error(`Backups directory does not exist: ${backupsDir}`);
    }

    const files = fs
      .readdirSync(backupsDir)
      .filter(f => f.startsWith('khamsa-backup-') && (f.endsWith('.json') || f.endsWith('.json.gz')))
      .sort()
      .reverse();

    if (files.length === 0) {
      throw new Error('No backup files found in backups directory.');
    }

    targetFilePath = path.join(backupsDir, files[0] as string);
    console.log(`ℹ️ No file specified. Auto-selected latest backup: ${files[0]}`);
  }

  if (!targetFilePath || !fs.existsSync(targetFilePath)) {
    throw new Error(`Backup file not found at: ${targetFilePath}`);
  }

  console.log(`🚀 Starting Database Restore from: ${targetFilePath}`);

  const rawBuffer = fs.readFileSync(targetFilePath);
  let jsonString = '';

  if (targetFilePath.endsWith('.gz')) {
    jsonString = zlib.gunzipSync(rawBuffer).toString('utf-8');
  } else {
    jsonString = rawBuffer.toString('utf-8');
  }

  const backup: BackupPayload = JSON.parse(jsonString);
  console.log(`📦 Backup Created At: ${backup.timestamp} (${backup.appName})`);

  console.log(`📡 Connecting to Database: ${env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`);
  await mongoose.connect(env.MONGODB_URI);
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error('Could not get database handle.');
  }

  for (const [colName, docs] of Object.entries(backup.data)) {
    if (!Array.isArray(docs) || docs.length === 0) {
      console.log(`  ℹ️ Skipping empty collection: ${colName}`);
      continue;
    }

    console.log(`  🔄 Restoring ${colName} (${docs.length} items)...`);
    const collection = db.collection(colName);

    // Delete existing documents in this collection
    await collection.deleteMany({});

    // Convert string ObjectIds back if needed (or MongoDB driver will accept standard JSON documents)
    await collection.insertMany(docs as Record<string, unknown>[]);
    console.log(`  ✅ Restored ${colName} successfully.`);
  }

  await mongoose.disconnect();
  console.log('\n✨ Database Restore Completed Successfully!');
}

runRestore().catch(err => {
  console.error('❌ Restore Failed with error:', err);
  process.exit(1);
});
