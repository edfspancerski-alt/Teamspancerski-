# Team Spancerski - Advanced AI Fitness SaaS Platform

## Multi-Agent AI System
The platform uses a sophisticated multi-agent architecture to provide an autonomous coaching experience:
- **Coach Agent**: Generates periodized 8-12 week programs.
- **Nutrition Agent**: Crafts meal plans and shopping lists.
- **Progress Analyst**: Adjusts training variables based on performance.
- **Recovery Coach**: Optimizes sleep and recovery protocols.
- **Motivation Agent**: Daily psychological support and engagement.
- **Body Analysis Agent**: Computer vision-based physique assessment (via GPT-4 Vision/CV).

## Core Systems
### 1. Training & Adaptation
- **Methodology**: Dorian Yates (HIT) + Pacholok (Biomechanics) + Modern Science.
- **Adaptive Engine**: Real-time adjustments to load and volume based on user failure/progress.
- **Video Player**: Adaptive streaming with automated progress tracking.

### 2. Nutrition & IA
- Personalization based on weight, goal, restrictions, and monthly budget.
- Automated Shopping Lists with estimated costs.

### 3. Growth & Monetization
- **Affiliate System**: 30% recurring commission for user referrals.
- **Gamification**: Challenges (30-day, Fat Loss, Glute) with rankings and XP.
- **White Label**: Multi-tenant support for trainers to launch their own branded apps.
- **Subscription**: Stripe-integrated Trimestral and Annual plans.

### 4. Community & Social
- Feed, comments, likes, and real-time chat (WebSocket-ready).
- Public profiles and challenge leaderboards.

## Scalability & Performance
- **Infrastructure**: Next.js 14 App Router, Vercel, Neon PostgreSQL.
- **Cache**: Redis support for session management and API response caching.
- **Scalability**: Horizontal scaling ready, CDN for global delivery.

## Deployment Instructions
1. `npm install`
2. `npx prisma generate`
3. Configure `.env` (Stripe, OpenAI, Database).
4. `npm run build`
5. Deploy `apps/web` to Vercel.
