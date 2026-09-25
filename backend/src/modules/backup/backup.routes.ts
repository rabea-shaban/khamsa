import { Router } from 'express';
import { BackupController } from './backup.controller';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

const router = Router();

// Only ADMIN can access or trigger backups
router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

router.get('/', BackupController.getBackups);
router.post('/', BackupController.createBackup);

export const backupRoutes = router;
