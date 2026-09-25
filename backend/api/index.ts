import { createApp } from '../src/app';
import { connectDatabase } from '../src/config/database.config';
import { Request, Response } from 'express';

const app = createApp();

export default async function handler(req: Request, res: Response) {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (err) {
    console.error('Serverless Handler Error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error during database connection',
    });
  }
}
