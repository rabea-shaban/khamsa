import { createApp } from '../src/app';
import { connectDatabase } from '../src/config/database.config';
import type { Request, Response } from 'express';

let appInstance: ReturnType<typeof createApp> | null = null;

const getApp = () => {
  if (!appInstance) {
    appInstance = createApp();
  }
  return appInstance;
};

export default async function handler(req: Request, res: Response) {
  try {
    await connectDatabase();
    const app = getApp();
    return app(req, res);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('Serverless Handler Error:', message);
    return res.status(500).json({
      success: false,
      message: 'Serverless Execution Error',
      error: message,
    });
  }
}
