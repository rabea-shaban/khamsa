import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  PORT: z.coerce.number().default(5000),
  CLIENT_URL: z
    .string()
    .default('https://khamsa-web.vercel.app,http://localhost:3000,http://localhost:3001,*'),
  MONGODB_URI: z
    .string()
    .default(
      'mongodb+srv://rshaban2016_db_user:9VbFUq5WsfYr90sw@cluster0.nalbfbq.mongodb.net/khamsa_cms?retryWrites=true&w=majority&appName=Cluster0',
    ),
  JWT_ACCESS_SECRET: z
    .string()
    .min(32, 'JWT_ACCESS_SECRET must be at least 32 characters')
    .default('khamsa_jwt_access_super_secret_key_production_grade_32chars!'),
  JWT_REFRESH_SECRET: z
    .string()
    .min(32, 'JWT_REFRESH_SECRET must be at least 32 characters')
    .default('khamsa_jwt_refresh_super_secret_key_production_grade_32chars!'),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  R2_ACCOUNT_ID: z.string().default('c1cda447ff69ae9cfaf14cbdb704620f'),
  R2_ACCESS_KEY_ID: z.string().default('0855219430c6a51d4d39c05e1a2f6fb3'),
  R2_SECRET_ACCESS_KEY: z
    .string()
    .default('901f4c6e9e51c8889ec3227ebfe74f9d85cfcb4a9bb540cbe3b38c2084c7faea'),
  R2_BUCKET_NAME: z.string().default('khamsa'),
  R2_PUBLIC_URL: z.string().default('https://pub-2d88a10e7b7e4bc8939c366ff407fcf8.r2.dev'),
  ADMIN_NAME: z.string().default('Khamsa Admin'),
  ADMIN_EMAIL: z.string().email().default('admin@khamsa.dev'),
  ADMIN_PASSWORD: z.string().min(8).default('AdminPassword123!'),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.warn('⚠️ Some environment variables are using fallbacks:', result.error.format());
    // Parse with empty object to use all defaults safely
    return envSchema.parse({});
  }
  return result.data;
};

export const env = parseEnv();

// Helper to get array of allowed origins from CLIENT_URL
export const getAllowedOrigins = (): string[] => {
  return env.CLIENT_URL.split(',').map(url => url.trim());
};
