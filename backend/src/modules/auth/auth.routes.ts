import { Router } from 'express';
import { AuthController } from './auth.controller';
import { loginSchema, refreshSchema } from './auth.validation';
import { validate } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authLimiter } from '../../middlewares/rate-limiter.middleware';

const router = Router();

router.post('/login', authLimiter, validate({ body: loginSchema }), AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', authLimiter, validate({ body: refreshSchema }), AuthController.refresh);
router.get('/me', authenticate, AuthController.getMe);

export const authRoutes = router;
