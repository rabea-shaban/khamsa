import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { User } from '../src/modules/users/user.model';
import { UserRole } from '../src/types/common.types';

const app = createApp();

describe('Users Module Integration & Role Tests', () => {
  let adminToken: string;
  let editorToken: string;
  let adminId: string;

  beforeEach(async () => {
    const admin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@test.com',
      password: 'AdminPassword123!',
      role: UserRole.ADMIN,
      isActive: true,
    });
    adminId = admin._id.toString();

    await User.create({
      name: 'Regular Editor',
      email: 'editor@test.com',
      password: 'EditorPassword123!',
      role: UserRole.EDITOR,
      isActive: true,
    });

    const adminLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'superadmin@test.com',
        password: 'AdminPassword123!',
      });
    adminToken = adminLogin.body.data.accessToken;

    const editorLogin = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'editor@test.com',
        password: 'EditorPassword123!',
      });
    editorToken = editorLogin.body.data.accessToken;
  });

  it('should allow ADMIN to list all users', async () => {
    const res = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(2);
    expect(res.body.data.pagination.total).toBe(2);
  });

  it('should forbid EDITOR from accessing admin user endpoints', async () => {
    const res = await request(app)
      .get('/api/v1/admin/users')
      .set('Authorization', `Bearer ${editorToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('should prevent deleting the last active ADMIN', async () => {
    const res = await request(app)
      .delete(`/api/v1/admin/users/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Cannot delete the last administrator');
  });

  it('should prevent demoting the last active ADMIN', async () => {
    const res = await request(app)
      .patch(`/api/v1/admin/users/${adminId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: UserRole.EDITOR });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Cannot demote');
  });
});
