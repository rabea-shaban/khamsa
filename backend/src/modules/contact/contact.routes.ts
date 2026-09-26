import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { sendContactMessageSchema } from './contact.validation';
import { sendContactMessageController } from './contact.controller';
import rateLimit from 'express-rate-limit';

const router = Router();

// Anti-spam rate limiter: Max 10 contact messages per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'تم إرسال عدة رسائل مؤخراً، يرجى الانتظار بضع دقائق قبل إعادة المحاولة.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  '/',
  contactLimiter,
  validate({ body: sendContactMessageSchema }),
  sendContactMessageController
);

export default router;
