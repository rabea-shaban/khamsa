import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/users/user.routes';
import {
  publicArticleRoutes,
  adminArticleRoutes,
} from '../modules/articles/article.routes';
import {
  publicVideoRoutes,
  adminVideoRoutes,
} from '../modules/videos/video.routes';
import { mediaRoutes } from '../modules/media/media.routes';
import {
  publicSettingsRoutes,
  adminSettingsRoutes,
} from '../modules/settings/settings.routes';
import { backupRoutes } from '../modules/backup/backup.routes';

const router = Router();

// ============================================
// Auth Routes: /api/v1/auth
// ============================================
router.use('/auth', authRoutes);

// ============================================
// Public Routes: /api/v1/public
// ============================================
const publicRouter = Router();
publicRouter.use('/articles', publicArticleRoutes);
publicRouter.use('/videos', publicVideoRoutes);
publicRouter.use('/settings', publicSettingsRoutes);
router.use('/public', publicRouter);

// ============================================
// Admin Routes: /api/v1/admin
// ============================================
const adminRouter = Router();
adminRouter.use('/users', userRoutes);
adminRouter.use('/articles', adminArticleRoutes);
adminRouter.use('/videos', adminVideoRoutes);
adminRouter.use('/media', mediaRoutes);
adminRouter.use('/settings', adminSettingsRoutes);
adminRouter.use('/backups', backupRoutes);
router.use('/admin', adminRouter);

export const apiRoutes = router;

