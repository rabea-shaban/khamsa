import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app';
import { User } from '../src/modules/users/user.model';
import { Article } from '../src/modules/articles/article.model';
import { UserRole, ContentStatus } from '../src/types/common.types';

const app = createApp();

describe('Articles Module Integration Tests', () => {
  let editorToken: string;
  let editorId: string;

  beforeEach(async () => {
    const editor = await User.create({
      name: 'Editor User',
      email: 'editor@test.com',
      password: 'EditorPassword123!',
      role: UserRole.EDITOR,
      isActive: true,
    });
    editorId = editor._id.toString();

    const loginRes = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'editor@test.com',
        password: 'EditorPassword123!',
      });
    editorToken = loginRes.body.data.accessToken;
  });

  it('should create an article with structured JSON content and auto-generate slug', async () => {
    const res = await request(app)
      .post('/api/v1/admin/articles')
      .set('Authorization', `Bearer ${editorToken}`)
      .send({
        title: 'مقدمة في جافاسكريبت الحديثة',
        excerpt: 'دليل شامل لتعلم أهم ميزات جافاسكريبت الحديثة باللغة العربية',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'أهلاً بكم في خمسة برمجة بالبلدي!' }],
            },
          ],
        },
        category: 'JavaScript',
        tags: ['js', 'programming', 'es6'],
        status: ContentStatus.DRAFT,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.slug).toBeDefined();
    expect(res.body.data.title).toBe('مقدمة في جافاسكريبت الحديثة');
    expect(res.body.data.status).toBe(ContentStatus.DRAFT);
  });

  it('should only return PUBLISHED articles in public endpoint', async () => {
    await Article.create({
      title: 'Published Post',
      slug: 'published-post',
      excerpt: 'This is a published article excerpt',
      content: { text: 'content' },
      category: 'Node.js',
      tags: ['nodejs', 'backend'],
      author: editorId,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    });

    await Article.create({
      title: 'Draft Post',
      slug: 'draft-post',
      excerpt: 'This is a draft article excerpt',
      content: { text: 'content' },
      category: 'React',
      tags: ['react'],
      author: editorId,
      status: ContentStatus.DRAFT,
    });

    const res = await request(app).get('/api/v1/public/articles');

    expect(res.status).toBe(200);
    expect(res.body.data.items.length).toBe(1);
    expect(res.body.data.items[0].slug).toBe('published-post');
    expect(res.body.data.pagination.total).toBe(1);
  });

  it('should filter public articles by search keyword and category', async () => {
    await Article.create({
      title: 'تعلم Node.js من الصفر',
      slug: 'learn-nodejs',
      excerpt: 'شرح بسيط لنود جي إس',
      content: { text: 'content' },
      category: 'Node.js',
      tags: ['nodejs'],
      author: editorId,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    });

    await Article.create({
      title: 'دليل بايثون السريع',
      slug: 'python-guide',
      excerpt: 'شرح سريع للبايثون',
      content: { text: 'content' },
      category: 'Python',
      tags: ['python'],
      author: editorId,
      status: ContentStatus.PUBLISHED,
      publishedAt: new Date(),
    });

    const searchRes = await request(app)
      .get('/api/v1/public/articles')
      .query({ search: 'Node.js' });

    expect(searchRes.status).toBe(200);
    expect(searchRes.body.data.items.length).toBe(1);
    expect(searchRes.body.data.items[0].category).toBe('Node.js');
  });

  it('should publish and unpublish an article via admin routes', async () => {
    const article = await Article.create({
      title: 'Workflow Test Article',
      slug: 'workflow-test',
      excerpt: 'Testing publish and unpublish flow',
      content: { text: 'body' },
      category: 'General',
      author: editorId,
      status: ContentStatus.DRAFT,
    });

    const publishRes = await request(app)
      .patch(`/api/v1/admin/articles/${article._id}/publish`)
      .set('Authorization', `Bearer ${editorToken}`);

    expect(publishRes.status).toBe(200);
    expect(publishRes.body.data.status).toBe(ContentStatus.PUBLISHED);
    expect(publishRes.body.data.publishedAt).toBeDefined();

    const unpublishRes = await request(app)
      .patch(`/api/v1/admin/articles/${article._id}/unpublish`)
      .set('Authorization', `Bearer ${editorToken}`);

    expect(unpublishRes.status).toBe(200);
    expect(unpublishRes.body.data.status).toBe(ContentStatus.DRAFT);
  });
});
