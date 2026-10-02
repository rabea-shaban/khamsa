import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { User } from '../src/modules/users/user.model';
import { FeaturedLink } from '../src/modules/featured-links/featured-link.model';
import { UserRole } from '../src/types/common.types';

const app = createApp();

describe('Featured Links Module Integration Tests', () => {
  let adminToken: string;
  let editorToken: string;

  beforeEach(async () => {
    await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: 'AdminPassword123!',
      role: UserRole.ADMIN,
      isActive: true,
    });

    const adminLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'AdminPassword123!',
      });
    adminToken = adminLoginRes.body.data.accessToken;

    await User.create({
      name: 'Editor User',
      email: 'editor@test.com',
      password: 'EditorPassword123!',
      role: UserRole.EDITOR,
      isActive: true,
    });

    const editorLoginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'editor@test.com',
        password: 'EditorPassword123!',
      });
    editorToken = editorLoginRes.body.data.accessToken;
  });

  it('should create a featured link with admin/editor token', async () => {
    const res = await request(app)
      .post('/api/v1/admin/featured-links')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        title: 'منحة تدريبية مجانية في تطوير الويب',
        image: 'https://pub-r2.dev/scholarship.jpg',
        url: 'https://example.com/scholarship',
        order: 1,
        isActive: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('منحة تدريبية مجانية في تطوير الويب');
    expect(res.body.data.order).toBe(1);
    expect(res.body.data.isActive).toBe(true);
  });

  it('should return active featured links in public endpoint ordered by order ASC', async () => {
    await FeaturedLink.create({
      title: 'مسابقة برمجة',
      image: 'https://pub-r2.dev/contest.jpg',
      url: 'https://example.com/contest',
      order: 2,
      isActive: true,
    });

    await FeaturedLink.create({
      title: 'منحة تدريبية',
      image: 'https://pub-r2.dev/scholarship.jpg',
      url: 'https://example.com/scholarship',
      order: 1,
      isActive: true,
    });

    await FeaturedLink.create({
      title: 'رابط معطل غير ظاهر',
      image: 'https://pub-r2.dev/hidden.jpg',
      url: 'https://example.com/hidden',
      order: 0,
      isActive: false,
    });

    const res = await request(app).get('/api/v1/public/featured-links');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data[0].title).toBe('منحة تدريبية');
    expect(res.body.data[1].title).toBe('مسابقة برمجة');
  });

  it('should toggle active status of a featured link', async () => {
    const link = await FeaturedLink.create({
      title: 'رابط تجريبي',
      image: 'https://pub-r2.dev/test.jpg',
      url: 'https://example.com/test',
      order: 1,
      isActive: true,
    });

    const toggleRes = await request(app)
      .patch(`/api/v1/admin/featured-links/${link._id}/toggle-active`)
      .set('Authorization', `Bearer ${editorToken}`);

    expect(toggleRes.status).toBe(200);
    expect(toggleRes.body.data.isActive).toBe(false);
  });

  it('should delete a featured link with admin authorization', async () => {
    const link = await FeaturedLink.create({
      title: 'رابط للحذف',
      image: 'https://pub-r2.dev/delete.jpg',
      url: 'https://example.com/delete',
      order: 1,
      isActive: true,
    });

    const delRes = await request(app)
      .delete(`/api/v1/admin/featured-links/${link._id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(delRes.status).toBe(200);

    const check = await FeaturedLink.findById(link._id);
    expect(check).toBeNull();
  });
});
