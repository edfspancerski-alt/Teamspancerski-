# Team Spancerski - Technical Documentation

## 1. System Architecture
The platform is built as a highly scalable SaaS using a **Monorepo** architecture managed by Turborepo.

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TailwindCSS, Shadcn UI, Framer Motion.
- **Backend**: Next.js API Routes (Serverless ready).
- **Database**: PostgreSQL with Prisma ORM.
- **Auth**: JWT with RBAC (Admin, Coach, Member) & OAuth (Google/Apple).
- **AI**: OpenAI API for personalized nutrition and smart recommendations.
- **Payments**: Stripe (Trimestral/Annual plans + Mentorship Upsell).
- **Video**: Mux/Cloudflare Stream (Adaptive Streaming).
- **Notifications**: Firebase Cloud Messaging (FCM).

## 2. Monorepo Structure
- `/apps/web`: Main application for members and admin dashboard.
- `/packages/database`: Prisma schema, client, and shared database logic.
- `/packages/auth`: JWT, Bcrypt, and RBAC utility functions.
- `/packages/ui`: Shared React components (Shadcn + custom VideoPlayer & Chat).
- `/packages/config`: Shared configurations (Tailwind, TypeScript, Redis).
- `/services/*`: Microservices for AI, Gamification, Automation, and Notifications.

## 3. Key Features
- **Nutrition AI**: Generates meal plans and shopping lists based on user biometric data and budget.
- **Gamification**: XP points, daily streaks, and automatic badge awarding.
- **White Label**: Multi-tenant support via middleware. Partners can use custom domains and branding.
- **Automation**: Trigger-based engine for inactivity reminders and content recommendations.
- **Performance**: CDN integration, optimized Prisma queries, and Redis caching support.

## 4. Scaling to 100k+ Users
- **Horizontal Scaling**: Backend logic is stateless, allowing deployment across multiple instances/containers.
- **Database Optimization**: Indexed queries and connection pooling (Prisma Accelerate / PgBouncer).
- **Cache**: Redis for session data and frequent API responses.
- **CDN**: Cloudflare for static assets and global video delivery.

## 5. Deployment Guide
1. **Repository**: Push code to GitHub.
2. **Database**: Provision a PostgreSQL instance (Neon/Supabase).
3. **Environment Variables**: Set `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `OPENAI_API_KEY` in deployment platform.
4. **Build & Deploy**:
   - `npm install`
   - `npx prisma generate`
   - `npm run build`
   - Deploy `/apps/web` to Vercel.
