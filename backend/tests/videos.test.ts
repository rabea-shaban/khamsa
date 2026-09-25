import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { User } from '../src/modules/users/user.model';
import { Video } from '../src/modules/videos/video.model';
import { UserRole, ContentStatus, VideoPlatform } from '../src/types/common.types';

const app = createApp();

describe('Videos Module Integration Tests', () => {
  let editorToken: string;
  let editorId: string;

  beforeEach(async () => {
    const editor = await User.create({
      name: 'Video Creator',
      email: 'video@test.com',
      password: 'VideoPassword123!',
      role: UserRole.EDITOR,
      isActive: true,
    });
    editorId = editor._id.toString();

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'video@test.com',
        password: 'VideoPassword123!',
      });
    editorToken = loginRes.body.data.accessToken;
  });

  it('should create a video with valid YouTube URL', async () => {
    const res = await request(app)
      .post('/api/v1/admin/videos')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        title: 'شرح مفهوم الـ Event Loop في دقيقة',
        description: 'فيديو قصير يوضح كيف يعمل الـ Event Loop في Node.js',
        platform: VideoPlatform.YOUTUBE,
        url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
        thumbnail: 'https://media.khamsa.dev/thumbnails/eventloop.jpg',
        status: ContentStatus.PUBLISHED,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.platform).toBe(VideoPlatform.YOUTUBE);
    expect(res.body.data.publishedAt).toBeDefined();
  });

  it('should reject video creation when platform and URL do not match', async () => {
    const res = await request(app)
      .post('/api/v1/admin/videos')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        title: 'Mismatched Platform Video',
        description: 'Testing validation error for platform vs URL mismatch',
        platform: VideoPlatform.TIKTOK,
        url: 'https://www.youtube.com/watch?v=123456',
        status: ContentStatus.DRAFT,
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('Validation failed');
  });

  it('should filter public videos by platform', async () => {
    await Video.create({
      title: 'YouTube Short',
      description: 'Quick tip',
      platform: VideoPlatform.YOUTUBE,
      url: 'https://youtube.com/shorts/abc12345',
      author: editorId,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    });

    await Video.create({
      title: 'TikTok Reel',
      description: 'TikTok video',
      platform: VideoPlatform.TIKTOK,
      url: 'https://www.tiktok.com/@5barmaga/video/123456789',
      author: editorId,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    });

    const ytRes = await request(app)
      .get('/api/v1/public/videos')
      .query({ platform: VideoPlatform.YOUTUBE });

    expect(ytRes.status).toBe(200);
    expect(ytRes.body.data.items.length).toBe(1);
    expect(ytRes.body.data.items[0].platform).toBe(VideoPlatform.YOUTUBE);
  });
});
