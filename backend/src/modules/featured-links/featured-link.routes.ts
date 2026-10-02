import { Router } from 'express';
import { FeaturedLinkController } from './featured-link.controller';
import {
  createFeaturedLinkSchema,
  updateFeaturedLinkSchema,
  adminFeaturedLinkQuerySchema,
} from './featured-link.validation';
import { validate, validateMongoId } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

// ============================================
// Public Featured Links Routes
// ============================================
export const publicFeaturedLinkRoutes = Router();

publicFeaturedLinkRoutes.get('/', FeaturedLinkController.getPublicFeaturedLinks);

// ============================================
// Admin Featured Links Routes
// ============================================
export const adminFeaturedLinkRoutes = Router();

adminFeaturedLinkRoutes.use(authenticate, authorize(UserRole.ADMIN, UserRole.EDITOR));

adminFeaturedLinkRoutes.get(
  '/',
  validate({ query: adminFeaturedLinkQuerySchema }),
  FeaturedLinkController.getAdminFeaturedLinks,
);

adminFeaturedLinkRoutes.post(
  '/',
  validate({ body: createFeaturedLinkSchema }),
  FeaturedLinkController.createFeaturedLink,
);

adminFeaturedLinkRoutes.get(
  '/:id',
  validateMongoId('id'),
  FeaturedLinkController.getFeaturedLinkById,
);

adminFeaturedLinkRoutes.patch(
  '/:id',
  validateMongoId('id'),
  validate({ body: updateFeaturedLinkSchema }),
  FeaturedLinkController.updateFeaturedLink,
);

adminFeaturedLinkRoutes.patch(
  '/:id/toggle-active',
  validateMongoId('id'),
  FeaturedLinkController.toggleActive,
);

adminFeaturedLinkRoutes.delete(
  '/:id',
  authorize(UserRole.ADMIN),
  validateMongoId('id'),
  FeaturedLinkController.deleteFeaturedLink,
);
