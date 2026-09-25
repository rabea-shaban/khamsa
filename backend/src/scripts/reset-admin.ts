import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { env } from '../config/env.config';
import { User } from '../modules/users/user.model';
import { UserRole } from '../types/common.types';

async function resetAdmin() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Connected to DB');

    const hashedPassword = await bcrypt.hash('AdminPassword123!', 12);

    await User.findOneAndUpdate(
      { email: 'admin@khamsa.dev' },
      {
        name: 'Khamsa Admin',
        email: 'admin@khamsa.dev',
        password: hashedPassword,
        role: UserRole.ADMIN,
        isActive: true,
      },
      { upsert: true, new: true },
    );

    console.log('✅ Admin user reset successfully with password: AdminPassword123!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error resetting admin:', err);
    process.exit(1);
  }
}

resetAdmin();
