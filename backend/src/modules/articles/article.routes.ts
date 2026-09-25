import { Router } from 'express';
import { ArticleController } from './article.controller';
import {
  createArticleSchema,
  updateArticleSchema,
  publicArticleQuerySchema,
  adminArticleQuerySchema,
} from './article.validation';
import { validate, validateMongoId } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { authorize } from '../../middlewares/role.middleware';
import { UserRole } from '../../types/common.types';

// ============================================
// Public Article Routes
// ============================================
export const publicArticleRoutes = Router();

publicArticleRoutes.get(
  '/',
  validate({ query: publicArticleQuerySchema }),
  ArticleController.getPublicArticles,
);

publicArticleRoutes.get('/:slug', ArticleController.getPublicArticleBySlug);

// ============================================
// Admin Article Routes
// ============================================
export const adminArticleRoutes = Router();

// Both ADMIN and EDITOR can manage articles
adminArticleRoutes.use(authenticate, authorize(UserRole.ADMIN, UserRole.EDITOR));

adminArticleRoutes.get(
  '/',
  validate({ query: adminArticleQuerySchema }),
  ArticleController.getAdminArticles,
);

adminArticleRoutes.post(
  '/',
  validate({ body: createArticleSchema }),
  ArticleController.createArticle,
);

adminArticleRoutes.get('/:id', validateMongoId('id'), ArticleController.getArticleById);

adminArticleRoutes.patch(
  '/:id',
  validateMongoId('id'),
  validate({ body: updateArticleSchema }),
  ArticleController.updateArticle,
);

adminArticleRoutes.patch(
  '/:id/publish',
  validateMongoId('id'),
  ArticleController.publishArticle,
);

adminArticleRoutes.patch(
  '/:id/unpublish',
  validateMongoId('id'),
  ArticleController.unpublishArticle,
);

// Only ADMIN can delete articles (or ADMIN and EDITOR per requirements)
adminArticleRoutes.delete(
  '/:id',
  authorize(UserRole.ADMIN),
  validateMongoId('id'),
  ArticleController.deleteArticle,
);
