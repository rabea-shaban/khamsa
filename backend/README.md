# Khamsa CMS API (خمسة برمجة بالبلدي) 🚀

Production-ready Modular Monolith RESTful Backend API for **Khamsa CMS** ("خمسة برمجة بالبلدي"), powering both the public website and the administration dashboard.

---

## 🏗 Architecture Overview

Khamsa CMS is built using a **Clean Modular Monolith** architecture in strict **TypeScript**:

```
src/
├── config/                  # Environment, MongoDB & Cloudflare R2 configurations
│   ├── env.config.ts        # Zod environment variable parsing & validation
│   ├── database.config.ts   # Mongoose connection & graceful shutdown
│   └── r2.config.ts         # Cloudflare R2 (S3-compatible) client
│
├── modules/                 # Modular Domain Features
│   ├── auth/                # Authentication, JWT rotation, HTTPOnly cookies
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.validation.ts
│   │   └── auth.types.ts
│   │
│   ├── users/               # User management, RBAC, Admin user controls
│   │   ├── user.model.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.routes.ts
│   │   ├── user.validation.ts
│   │   └── user.types.ts
│   │
│   ├── articles/            # Rich-content articles, Tiptap JSON, auto-slug, SEO
│   │   ├── article.model.ts
│   │   ├── article.controller.ts
│   │   ├── article.service.ts
│   │   ├── article.routes.ts
│   │   ├── article.validation.ts
│   │   └── article.types.ts
│   │
│   ├── videos/              # Social media videos (YouTube, TikTok, Facebook)
│   │   ├── video.model.ts
│   │   ├── video.controller.ts
│   │   ├── video.service.ts
│   │   ├── video.routes.ts
│   │   ├── video.validation.ts
│   │   └── video.types.ts
│   │
│   ├── media/               # Cloudflare R2 image upload & presigned URLs
│   │   ├── media.model.ts
│   │   ├── media.controller.ts
│   │   ├── media.service.ts
│   │   ├── media.upload.ts
│   │   ├── media.routes.ts
│   │   ├── media.validation.ts
│   │   └── media.types.ts
│   │
│   └── settings/            # Site settings, social links & global SEO
│       ├── settings.model.ts
│       ├── settings.controller.ts
│       ├── settings.service.ts
│       ├── settings.routes.ts
│       ├── settings.validation.ts
│       └── settings.types.ts
│
├── middlewares/             # Request lifecycle & security middlewares
│   ├── auth.middleware.ts       # JWT token verification (Cookies / Bearer)
│   ├── role.middleware.ts       # Role-Based Access Control (ADMIN / EDITOR)
│   ├── validate.middleware.ts   # Zod request & MongoDB ObjectId validation
│   ├── rate-limiter.middleware.ts # API & Auth rate limiting
│   ├── not-found.middleware.ts  # 404 handler
│   └── error.middleware.ts      # Centralized error handler
│
├── routes/                  # Centralized routing registry (/auth, /public, /admin)
├── types/                   # Common types, Express declaration merging
├── utils/                   # ApiError, ApiResponse, asyncHandler, pagination, slug
├── scripts/                 # Database seeders
├── app.ts                   # Express application setup
└── server.ts                # Server startup & graceful shutdown
```

---

## 🧰 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript (Strict Mode)
- **Database**: MongoDB Atlas with Mongoose
- **Validation**: Zod
- **Authentication**: JWT (Access Token + Refresh Token) with HTTPOnly Cookies
- **Object Storage**: Cloudflare R2 via `@aws-sdk/client-s3` & `@aws-sdk/s3-request-presigner`
- **Security**: Helmet, CORS with credentials, Rate Limiting, Bcrypt password hashing
- **Testing**: Vitest & Supertest with MongoDB Memory Server

---

## 🔑 Environment Variables

Copy `.env.example` to `.env` and configure your settings:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Client Application URLs (Comma-separated for multiple origins)
CLIENT_URL=http://localhost:3000,http://localhost:3001

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/khamsa_cms

# JWT Authentication
JWT_ACCESS_SECRET=your_jwt_access_secret_key_must_be_at_least_32_characters_long
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_must_be_at_least_32_characters_long
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cloudflare R2 Configuration (S3-compatible)
R2_ACCOUNT_ID=d9db13b29e66e00f79343eab60abf918
R2_ACCESS_KEY_ID=169a0affacfd95ac13dc8ace7b49a377
R2_SECRET_ACCESS_KEY=cf44ba4df763d4fce9cbe824b2dd32796e5027f41fb0a5ce69d337b8284d5888
R2_BUCKET_NAME=khamsa-media
R2_PUBLIC_URL=https://media.khamsa.dev

# Initial Admin Seeding
ADMIN_NAME=Khamsa Admin
ADMIN_EMAIL=admin@khamsa.dev
ADMIN_PASSWORD=AdminPassword123!
```

---

## 🚀 Quick Start & Scripts

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Initial Admin & Settings
```bash
npm run seed
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Run Test Suites
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📡 API Endpoints Overview

All endpoints are prefixed with `/api/v1` (except `/health`).

### 🩺 Health Check
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/health` | Public | System status and database connectivity |

---

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/login` | Public | Authenticates user, returns tokens & sets HTTPOnly cookies |
| `POST` | `/api/v1/auth/refresh` | Public / Cookie | Refreshes access token |
| `POST` | `/api/v1/auth/logout` | Public | Clears authentication cookies |
| `GET` | `/api/v1/auth/me` | Authenticated | Gets profile of logged-in user |

---

### 🌐 Public Content Endpoints (`/api/v1/public`)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/public/articles` | List published articles (supports `page`, `limit`, `category`, `tag`, `search`, `sort`, `featured`) |
| `GET` | `/api/v1/public/articles/:slug` | Get single published article by slug |
| `GET` | `/api/v1/public/videos` | List published videos (supports `page`, `limit`, `platform`, `search`, `sort`) |
| `GET` | `/api/v1/public/videos/:id` | Get single published video by ID |
| `GET` | `/api/v1/public/settings` | Get public platform branding, social links and default SEO |

---

### 🛠 Admin Endpoints (`/api/v1/admin`)

#### Users Management (ADMIN Role only)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/users` | List users with pagination and search |
| `POST` | `/api/v1/admin/users` | Create user (ADMIN or EDITOR) |
| `GET` | `/api/v1/admin/users/:id` | Get user by ID |
| `PATCH` | `/api/v1/admin/users/:id` | Update user details / role |
| `DELETE` | `/api/v1/admin/users/:id` | Delete user (protects last active ADMIN) |

#### Articles Management (ADMIN & EDITOR)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/articles` | List articles (all statuses) |
| `POST` | `/api/v1/admin/articles` | Create article (structured JSON content, SEO, category) |
| `GET` | `/api/v1/admin/articles/:id` | Get article by ID |
| `PATCH` | `/api/v1/admin/articles/:id` | Update article |
| `PATCH` | `/api/v1/admin/articles/:id/publish` | Publish article |
| `PATCH` | `/api/v1/admin/articles/:id/unpublish` | Unpublish article |
| `DELETE` | `/api/v1/admin/articles/:id` | Delete article (ADMIN only) |

#### Videos Management (ADMIN & EDITOR)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/admin/videos` | List videos |
| `POST` | `/api/v1/admin/videos` | Add video (YouTube, TikTok, Facebook with URL validation) |
| `GET` | `/api/v1/admin/videos/:id` | Get video by ID |
| `PATCH` | `/api/v1/admin/videos/:id` | Update video |
| `PATCH` | `/api/v1/admin/videos/:id/publish` | Publish video |
| `PATCH` | `/api/v1/admin/videos/:id/unpublish` | Unpublish video |
| `DELETE` | `/api/v1/admin/videos/:id` | Delete video (ADMIN only) |

#### Media & Storage (ADMIN & EDITOR)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/admin/media` | Multipart image upload to Cloudflare R2 |
| `POST` | `/api/v1/admin/media/presigned-url` | Generate S3 presigned URL for direct R2 client upload |
| `GET` | `/api/v1/admin/media` | List media files |
| `DELETE` | `/api/v1/admin/media/:id` | Delete media from R2 and MongoDB |

#### Settings Management
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/v1/admin/settings` | ADMIN, EDITOR | Get platform configuration |
| `PATCH` | `/api/v1/admin/settings` | ADMIN only | Update site info, social links & default SEO |

---

## 💻 Next.js Frontend & Dashboard Integration

### 1. Public Next.js Website (SSR / SSG / ISR)
In your public Next.js app, fetch data directly from `/api/v1/public`:

```typescript
// app/articles/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const res = await fetch(`http://localhost:5000/api/v1/public/articles/${params.slug}`, {
    next: { revalidate: 60 },
  });
  const { data: article } = await res.json();
  
  return {
    title: article.seo.title || article.title,
    description: article.seo.description || article.excerpt,
    openGraph: {
      images: [article.seo.ogImage || article.coverImage],
    },
  };
}
```

### 2. Next.js Admin Dashboard (with HTTPOnly Cookies)
Set `credentials: 'include'` on all client-side `fetch` / `axios` requests:

```typescript
// lib/api-client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // Sends HTTPOnly cookies automatically
});
```
