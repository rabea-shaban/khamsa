import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import { env, getAllowedOrigins } from './config/env.config';
import { apiRoutes } from './routes';
import { apiLimiter } from './middlewares/rate-limiter.middleware';
import { notFoundHandler } from './middlewares/not-found.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { ApiResponse } from './utils/api-response';

export const createApp = (): Application => {
  const app: Application = express();

  // Trust reverse proxy (Cloudflare, Nginx, etc.)
  app.set('trust proxy', 1);

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginEmbedderPolicy: false,
    }),
  );

  // CORS configuration
  const allowedOrigins = getAllowedOrigins();
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, server-to-server)
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
          callback(null, true);
        } else {
          callback(new Error(`CORS origin '${origin}' not allowed`));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }),
  );

  // Rate Limiting
  app.use('/api', apiLimiter);

  // Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(cookieParser());

  // Response compression
  app.use(compression());

  // Request Logging (exclude logging in test mode)
  if (env.NODE_ENV !== 'test') {
    app.use(
      morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev', {
        skip: (req: Request) => req.url === '/health',
      }),
    );
  }

  // Health Check Endpoint
  app.get('/health', (_req: Request, res: Response) => {
    const dbStatus =
      mongoose.connection.readyState === 1
        ? 'connected'
        : mongoose.connection.readyState === 2
          ? 'connecting'
          : 'disconnected';

    return ApiResponse.success(
      res,
      {
        environment: env.NODE_ENV,
        database: dbStatus,
        timestamp: new Date().toISOString(),
      },
      'API is healthy',
    );
  });

  // Central API routes
  app.use('/api/v1', apiRoutes);

  // 404 Handler
  app.use(notFoundHandler);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
