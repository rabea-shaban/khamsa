import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env.config';

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const R2_CONFIG = {
  bucketName: env.R2_BUCKET_NAME || 'khamsa-cms',
  publicUrl: (env.R2_PUBLIC_URL || 'https://pub-f9f474a915314796ac71ef9e5b4b78a0.r2.dev').replace(/\/$/, ''),
};
