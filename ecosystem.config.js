// ========================================================
// Khamsa CMS - PM2 Production Ecosystem Configuration
// Brand: خمسة برمجة بالبلدي
// ========================================================

module.exports = {
  apps: [
    {
      name: 'khamsa-backend-api',
      script: 'dist/server.js',
      cwd: './backend',
      instances: 'max', // Scale to available CPU cores
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
      error_file: './logs/backend-error.log',
      out_file: './logs/backend-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      kill_timeout: 5000, // 5 seconds for graceful shutdown
    },
    {
      name: 'khamsa-frontend-web',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: './frontend',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: './logs/frontend-error.log',
      out_file: './logs/frontend-out.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
