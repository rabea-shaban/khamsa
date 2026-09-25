import { Router } from 'express';
import { MediaController } from './media.controller';
import { listMediaQuerySchema, presignedUrlSchema } from './media.validation';
import { upload } from './media.upload';
import { validate, validateMongoId } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

const router = Router();

// Both ADMIN and EDITOR can upload, view, and delete media
router.use(authenticate, authorize(UserRole.ADMIN, UserRole.EDITOR));

router.get('/', validate({ query: listMediaQuerySchema }), MediaController.getMediaList);

router.post('/', upload.single('file'), MediaController.uploadMedia);

router.post(
  '/presigned-url',
  validate({ body: presignedUrlSchema }),
  MediaController.getPresignedUploadUrl,
);

router.delete('/:id', validateMongoId('id'), MediaController.deleteMedia);

export const mediaRoutes = router;
