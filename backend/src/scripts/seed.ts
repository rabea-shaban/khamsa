import mongoose from 'mongoose';
import { env } from '../config/env.config';
import { User } from '../modules/users/user.model';
import { Settings } from '../modules/settings/settings.model';
import { UserRole } from '../types/common.types';

const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Connecting to database for seeding...');
    await mongoose.connect(env.MONGODB_URI);
    console.log('✅ Connected to MongoDB.');

    // 1. Seed Admin User
    const existingAdmin = await User.findOne({ email: env.ADMIN_EMAIL }).exec();
    if (existingAdmin) {
      console.log(`ℹ️  Admin user with email '${env.ADMIN_EMAIL}' already exists.`);
    } else {
      const admin = await User.create({
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL,
        password: env.ADMIN_PASSWORD,
        role: UserRole.ADMIN,
        isActive: true,
      });
      console.log(`🎉 Created Admin User: ${admin.email} (Role: ${admin.role})`);
    }

    // 2. Seed Initial Platform Settings
    const existingSettings = await Settings.findOne().exec();
    if (existingSettings) {
      console.log('ℹ️  Platform settings already exist.');
    } else {
      await Settings.create({
        siteName: 'خمسة برمجة بالبلدي',
        siteDescription: 'منصة لتبسيط البرمجة وعلوم الحاسب باللغة العربية البسيطة',
        socialLinks: {
          tiktok: 'https://www.tiktok.com/@5barmaga',
          youtube: 'https://www.youtube.com/@5barmaga',
          facebook: 'https://www.facebook.com/5barmaga',
          github: 'https://github.com/5barmaga',
        },
        defaultSeo: {
          title: 'خمسة برمجة بالبلدي - تعلم البرمجة من الصفر',
          description: 'مقالات وفيديوهات حصرية لشرح مفاهيم البرمجة وتطوير الويب ببساطة',
          keywords: ['برمجة', 'javascript', 'typescript', 'خمسة برمجة بالبلدي', 'nodejs'],
        },
      });
      console.log('🎉 Created Initial Platform Settings.');
    }

    console.log('🌱 Seeding process completed successfully!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
};

seedDatabase();
