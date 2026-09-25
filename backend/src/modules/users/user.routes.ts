import { Router } from 'express';
import { UserController } from './user.controller';
import {
  createUserSchema,
  updateUserSchema,
  listUsersQuerySchema,
  changeUserPasswordSchema,
} from './user.validation';
import { validate, validateMongoId } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

const router = Router();

// All user management routes require ADMIN role
router.use(authenticate, authorize(UserRole.ADMIN));

router.get('/stats', UserController.getUserStats);
router.get('/', validate({ query: listUsersQuerySchema }), UserController.getUsers);
router.post('/', validate({ body: createUserSchema }), UserController.createUser);
router.get('/:id', validateMongoId('id'), UserController.getUserById);
router.patch(
  '/:id',
  validateMongoId('id'),
  validate({ body: updateUserSchema }),
  UserController.updateUser,
);
router.patch(
  '/:id/password',
  validateMongoId('id'),
  validate({ body: changeUserPasswordSchema }),
  UserController.changePassword,
);
router.patch('/:id/status', validateMongoId('id'), UserController.toggleStatus);
router.delete('/:id', validateMongoId('id'), UserController.deleteUser);

export const userRoutes = router;
