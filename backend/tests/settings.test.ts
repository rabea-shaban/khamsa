import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { User } from '../src/modules/users/user.model';
import { UserRole } from '../src/types/common.types';

const app = createApp();

describe('Settings Module Integration Tests', () => {
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

    await User.create({
      name: 'Editor User',
      email: 'editor@test.com',
      password: 'EditorPassword123!',
      role: UserRole.EDITOR,
      isActive: true,
    });

    const adminLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'admin@test.com', password: 'AdminPassword123!' });
    adminToken = adminLogin.body.data.accessToken;

    const editorLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({ email: 'editor@test.com', password: 'EditorPassword123!' });
    editorToken = editorLogin.body.data.accessToken;
  });

  it('should get public settings without authentication', async () => {
    const res = await request(app).get('/api/v1/public/settings');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.siteName).toBeDefined();
  });

  it('should allow ADMIN to update settings', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/settings')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        siteName: 'خمسة برمجة - النسخة المحدثة',
        siteDescription: 'شرح أحدث التقنيات البرمجية بالعامية المصرية',
      });

    expect(res.status).toBe(200);
    expect(res.body.data.siteName).toBe('خمسة برمجة - النسخة المحدثة');
  });

  it('should forbid EDITOR from updating settings', async () => {
    const res = await request(app)
      .patch('/api/v1/admin/settings')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        siteName: 'Hacked Name',
      });

    expect(res.status).toBe(403);
  });
});
