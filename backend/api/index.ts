import { createApp } from '../src/app';
import { connectDatabase } from '../src/config/database.config';
import type { Request, Response } from 'express';

const app = createApp();

// Middleware to ensure DB is connected before processing requests
app.use(async (_req: Request, _res: Response, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    console.error('Database connection error in serverless:', err);
    next(err);
  }
});

export default app;
