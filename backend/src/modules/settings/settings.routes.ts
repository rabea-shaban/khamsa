import { Router } from 'express';
import { SettingsController } from './settings.controller';
import { updateSettingsSchema } from './settings.validation';
import { validate } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

// ============================================
// Public Settings Routes
// ============================================
export const publicSettingsRoutes = Router();

publicSettingsRoutes.get('/', SettingsController.getPublicSettings);

// ============================================
// Admin Settings Routes
// ============================================
export const adminSettingsRoutes = Router();

// Both ADMIN and EDITOR can view settings in the admin panel
adminSettingsRoutes.get(
  '/',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.EDITOR),
  SettingsController.getAdminSettings,
);

// Only ADMIN can update settings
adminSettingsRoutes.patch(
  '/',
  authenticate,
  authorize(UserRole.ADMIN),
  validate({ body: updateSettingsSchema }),
  SettingsController.updateSettings,
);
