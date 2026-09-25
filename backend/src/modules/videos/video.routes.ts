import { Router } from 'express';
import { VideoController } from './video.controller';
import {
  createVideoSchema,
  updateVideoSchema,
  publicVideoQuerySchema,
  adminVideoQuerySchema,
} from './video.validation';
import { validate, validateMongoId } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

// ============================================
// Public Video Routes
// ============================================
export const publicVideoRoutes = Router();

publicVideoRoutes.get(
  '/',
  validate({ query: publicVideoQuerySchema }),
  VideoController.getPublicVideos,
);

publicVideoRoutes.get('/:id', validateMongoId('id'), VideoController.getPublicVideoById);

// ============================================
// Admin Video Routes
// ============================================
export const adminVideoRoutes = Router();

// Both ADMIN and EDITOR can manage videos
adminVideoRoutes.use(authenticate, authorize(UserRole.ADMIN, UserRole.EDITOR));

adminVideoRoutes.get(
  '/',
  validate({ query: adminVideoQuerySchema }),
  VideoController.getAdminVideos,
);

adminVideoRoutes.post(
  '/',
  validate({ body: createVideoSchema }),
  VideoController.createVideo,
);

adminVideoRoutes.get('/:id', validateMongoId('id'), VideoController.getVideoById);

adminVideoRoutes.patch(
  '/:id',
  validateMongoId('id'),
  validate({ body: updateVideoSchema }),
  VideoController.updateVideo,
);

adminVideoRoutes.patch(
  '/:id/publish',
  validateMongoId('id'),
  VideoController.publishVideo,
);

adminVideoRoutes.patch(
  '/:id/unpublish',
  validateMongoId('id'),
  VideoController.unpublishVideo,
);

adminVideoRoutes.delete(
  '/:id',
  authorize(UserRole.ADMIN),
  validateMongoId('id'),
  VideoController.deleteVideo,
);
