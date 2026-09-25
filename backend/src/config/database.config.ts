import mongoose from 'mongoose';
import { env } from './env.config';

let isConnected = false;

export const connectDatabase = async (): Promise<void> => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(env.MONGODB_URI, {
      autoIndex: env.NODE_ENV !== 'production',
      serverSelectionTimeoutMS: 10000,
    });

    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    if (env.NODE_ENV !== 'test' && !process.env.VERCEL) {
      process.exit(1);
    }
    throw error;
  }

  mongoose.connection.on('error', err => {
    console.error('❌ MongoDB Runtime Error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️ MongoDB Disconnected. Attempting to reconnect...');
  });
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log('MongoDB connection closed gracefully.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};

