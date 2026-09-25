import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import mongoose from 'mongoose';
import { PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { r2Client, R2_CONFIG } from '../../config/r2.config';

export interface BackupMetadata {
  filename: string;
  key: string;
  url: string;
  sizeBytes: number;
  timestamp: string;
  totalRecords: number;
  counts: Record<string, number>;
}

export class BackupService {
  /**
   * Generates a full database backup, compresses with GZIP, saves locally and uploads to Cloud Storage.
   */
  static async createBackup(): Promise<BackupMetadata> {
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database is not connected.');
    }

    const collections = ['users', 'articles', 'videos', 'media', 'settings'];
    const backupData: Record<string, unknown[]> = {};
    const counts: Record<string, number> = {};

    for (const colName of collections) {
      try {
        const docs = await db.collection(colName).find({}).toArray();
        backupData[colName] = docs;
        counts[colName] = docs.length;
      } catch (err) {
        console.warn(`Could not export collection ${colName}:`, err);
        backupData[colName] = [];
        counts[colName] = 0;
      }
    }

    const timestampIso = new Date().toISOString();
    const timestampFormatted = timestampIso.replace(/[:.]/g, '-');
    const totalRecords = Object.values(counts).reduce((acc, curr) => acc + curr, 0);

    const backupPayload = {
      version: '1.0.0',
      appName: 'khamsa_cms',
      timestamp: timestampIso,
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

    const filenameGz = `khamsa-backup-${timestampFormatted}.json.gz`;
    const localGzPath = path.join(backupsDir, filenameGz);
    fs.writeFileSync(localGzPath, compressedBuffer);

    // 2. Upload to Cloud Storage
    const cloudKey = `backups/${filenameGz}`;
    try {
      const uploadCommand = new PutObjectCommand({
        Bucket: R2_CONFIG.bucketName,
        Key: cloudKey,
        Body: compressedBuffer,
        ContentType: 'application/gzip',
        Metadata: {
          timestamp: timestampIso,
          appName: 'khamsa_cms',
          totalRecords: String(totalRecords),
        },
      });

      await r2Client.send(uploadCommand);
    } catch (err) {
      console.error('Failed to upload backup to Cloud Storage:', err);
    }

    const cloudUrl = `${R2_CONFIG.publicUrl}/${cloudKey}`;

    return {
      filename: filenameGz,
      key: cloudKey,
      url: cloudUrl,
      sizeBytes: compressedBuffer.length,
      timestamp: timestampIso,
      totalRecords,
      counts,
    };
  }

  /**
   * Lists available backups from Cloud Storage (with local fallback).
   */
  static async listBackups(): Promise<BackupMetadata[]> {
    const backups: BackupMetadata[] = [];

    // Try listing from Cloud Storage
    try {
      const listCommand = new ListObjectsV2Command({
        Bucket: R2_CONFIG.bucketName,
        Prefix: 'backups/khamsa-backup-',
      });

      const res = await r2Client.send(listCommand);

      if (res.Contents && res.Contents.length > 0) {
        for (const item of res.Contents) {
          if (!item.Key) continue;
          const filename = path.basename(item.Key);
          backups.push({
            filename,
            key: item.Key,
            url: `${R2_CONFIG.publicUrl}/${item.Key}`,
            sizeBytes: item.Size || 0,
            timestamp: item.LastModified ? item.LastModified.toISOString() : new Date().toISOString(),
            totalRecords: 0,
            counts: {},
          });
        }
      }
    } catch (cloudErr) {
      console.warn('Could not list backups from Cloud Storage, falling back to local files:', cloudErr);
    }

    // If cloud storage returned nothing, read local backups folder
    if (backups.length === 0) {
      const backupsDir = path.resolve(process.cwd(), 'backups');
      if (fs.existsSync(backupsDir)) {
        const files = fs.readdirSync(backupsDir).filter(f => f.startsWith('khamsa-backup-'));
        for (const file of files) {
          const stats = fs.statSync(path.join(backupsDir, file));
          backups.push({
            filename: file,
            key: `backups/${file}`,
            url: `${R2_CONFIG.publicUrl}/backups/${file}`,
            sizeBytes: stats.size,
            timestamp: stats.mtime.toISOString(),
            totalRecords: 0,
            counts: {},
          });
        }
      }
    }

    // Sort descending by timestamp
    return backups.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Starts a daily recurring backup cron in the background (every 24h).
   */
  static startDailyBackupScheduler(): void {
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    console.log('⏰ Automated Daily Backup Scheduler initialized.');

    setInterval(async () => {
      try {
        console.log('⏰ Running automated daily backup...');
        const backup = await BackupService.createBackup();
        console.log(`✅ Daily automated backup complete: ${backup.filename}`);
      } catch (err) {
        console.error('❌ Daily automated backup failed:', err);
      }
    }, TWENTY_FOUR_HOURS);
  }
}
