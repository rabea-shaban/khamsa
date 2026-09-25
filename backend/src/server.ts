import { createApp } from './app';
import { env } from './config/env.config';
import { connectDatabase, disconnectDatabase } from './config/database.config';
import { BackupService } from './modules/backup/backup.service';
import http from 'http';

const startServer = async (): Promise<void> => {
  // Connect to Database
  await connectDatabase();

  // Start Automated Daily Cloud Backup Scheduler
  BackupService.startDailyBackupScheduler();

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.PORT, () => {
    console.log(`
🚀 ===============================================
   Khamsa CMS API is running!
   Brand: خمسة برمجة بالبلدي
   Environment: ${env.NODE_ENV}
   Port: ${env.PORT}
   Base URL: http://localhost:${env.PORT}/api/v1
   Health Check: http://localhost:${env.PORT}/health
🚀 ===============================================
    `);
  });

  const gracefulShutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

    server.close(async () => {
      console.log('HTTP server closed.');
      await disconnectDatabase();
      console.log('Graceful shutdown completed. Exiting process.');
      process.exit(0);
    });

    // Force close after 10 seconds if hanging
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  process.on('unhandledRejection', (reason: unknown) => {
    console.error('💥 Unhandled Rejection at Promise:', reason);
  });

  process.on('uncaughtException', (error: Error) => {
    console.error('💥 Uncaught Exception thrown:', error);
    process.exit(1);
  });
};

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
