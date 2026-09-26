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
  R2_ACCOUNT_ID: z.string().default('d9db13b29e66e00f79343eab60abf918'),
  R2_ACCESS_KEY_ID: z.string().default('169a0affacfd95ac13dc8ace7b49a377'),
  R2_SECRET_ACCESS_KEY: z
    .string()
    .default('cf44ba4df763d4fce9cbe824b2dd32796e5027f41fb0a5ce69d337b8284d5888'),
  R2_BUCKET_NAME: z.string().default('khamsa-cms'),
  R2_PUBLIC_URL: z.string().default('https://pub-f9f474a915314796ac71ef9e5b4b78a0.r2.dev'),
  ADMIN_NAME: z.string().default('ربيع شعبان'),
  ADMIN_EMAIL: z.string().email().default('r.shaban.2016@gmail.com'),
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
