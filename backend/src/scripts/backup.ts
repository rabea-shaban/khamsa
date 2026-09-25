import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import mongoose from 'mongoose';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '../config/env.config';
import { r2Client, R2_CONFIG } from '../config/r2.config';

interface BackupPayload {
  version: string;
  appName: string;
  timestamp: string;
  database: string;
  counts: Record<string, number>;
  data: Record<string, unknown[]>;
}

async function runBackup() {
  console.log('🚀 Starting Full Automated Backup for Khamsa Platform...');
  console.log(`📡 Connecting to Database: ${env.MONGODB_URI.replace(/:[^:@]+@/, ':****@')}`);

  await mongoose.connect(env.MONGODB_URI);
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error('Could not get database handle.');
  }

  const collections = ['users', 'articles', 'videos', 'media', 'settings'];
  const backupData: Record<string, unknown[]> = {};
  const counts: Record<string, number> = {};

  for (const colName of collections) {
    try {
      const docs = await db.collection(colName).find({}).toArray();
      backupData[colName] = docs;
      counts[colName] = docs.length;
      console.log(`  ✓ ${colName.padEnd(12)}: ${docs.length} records`);
    } catch (err) {
      console.warn(`  ⚠️ Could not export ${colName}:`, err);
      backupData[colName] = [];
      counts[colName] = 0;
    }
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPayload: BackupPayload = {
    version: '1.0.0',
    appName: 'khamsa_cms',
    timestamp: new Date().toISOString(),
    database: db.databaseName || 'khamsa_cms',
    counts,
    data: backupData,
  };

  const jsonString = JSON.stringify(backupPayload, null, 2);
  const compressedBuffer = zlib.gzipSync(Buffer.from(jsonString, 'utf-8'));

  // 1. Save Local Copy
  const backupsDir = path.resolve(process.cwd(), 'backups');
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const filenameGz = `khamsa-backup-${timestamp}.json.gz`;
  const filenameJson = `khamsa-backup-${timestamp}.json`;
  const localGzPath = path.join(backupsDir, filenameGz);
  const localJsonPath = path.join(backupsDir, filenameJson);

  fs.writeFileSync(localGzPath, compressedBuffer);
  fs.writeFileSync(localJsonPath, jsonString);

  console.log(`\n💾 Local Backup Saved:`);
  console.log(`  📁 JSON: ${localJsonPath} (${(jsonString.length / 1024).toFixed(2)} KB)`);
  console.log(`  📦 GZIP: ${localGzPath} (${(compressedBuffer.length / 1024).toFixed(2)} KB)`);

  // 2. Upload to Cloud Storage
  console.log(`\n☁️ Uploading Backup to Cloud Storage...`);
  const cloudKey = `backups/${filenameGz}`;

  try {
    const uploadCommand = new PutObjectCommand({
      Bucket: R2_CONFIG.bucketName,
      Key: cloudKey,
      Body: compressedBuffer,
      ContentType: 'application/gzip',
      Metadata: {
        timestamp: backupPayload.timestamp,
        appName: 'khamsa_cms',
        totalRecords: String(
          Object.values(counts).reduce((acc, curr) => acc + curr, 0),
        ),
      },
    });

    await r2Client.send(uploadCommand);
    const cloudUrl = `${R2_CONFIG.publicUrl}/${cloudKey}`;
    console.log(`  ✅ Successfully uploaded to Cloud Storage!`);
    console.log(`  🔗 Key: ${cloudKey}`);
    console.log(`  🌐 URL: ${cloudUrl}`);
  } catch (cloudErr) {
    console.error('  ❌ Failed to upload backup to Cloud Storage:', cloudErr);
  }

  await mongoose.disconnect();
  console.log('\n✨ Full Backup Process Completed Successfully!');
}

runBackup().catch(err => {
  console.error('❌ Backup Failed with error:', err);
  process.exit(1);
});
