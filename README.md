# SkillPay - Freelancer Pricing Calculator

SkillPay is an intelligent platform that helps freelancers and consultants determine optimal pricing for their services through sophisticated project cost estimation and personalized insights.

![SkillPay Platform](generated-icon.png)

## Features

- **Smart Pricing Calculator**: Generate precise pricing recommendations based on skill type, experience level, project scope, location, and target market.
- **Tiered Subscription Model**: Free basic plan with premium tiers offering additional features.
- **User Dashboard**: Track pricing history and view trends over time.
- **Secure Authentication**: Robust user account management with JWT.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and shadcn/ui
- **Backend**: Next.js API Routes with Express.js server option
- **Database**: PostgreSQL managed via Supabase
- **Authentication**: Custom JWT implementation with secure password hashing
- **Payments**: Stripe integration for subscription management
- **ORM**: Drizzle for type-safe database queries

## Local Development

1. Clone the repository
2. Set up environment variables (see [Environment Variables](#environment-variables))
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=your_postgresql_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

## Pricing Formula

The pricing calculator uses a sophisticated algorithm based on:

1. **Base Rate**: Determined by skill type (Programming, Design, Writing, etc.)
2. **Experience Multiplier**: Applies a factor based on experience level
3. **Project Scope Adjustment**: Modifies pricing based on project complexity
4. **Location Factor**: Adjusts for regional market differences
5. **Target Market Consideration**: Optional adjustment for enterprise clients

The resulting calculation provides three pricing tiers:
- **Minimum**: Base calculation at 80% (starting point)
- **Recommended**: Full calculated rate (optimal balance)
- **Premium**: Premium rate at 125-130% (for premium service)

## Deployment

See our detailed deployment guides:
- [Replit Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Vercel Deployment Guide](VERCEL_DEPLOYMENT_GUIDE.md)

## Subscription Tiers

- **Basic (Free)**
  - 3 pricing suggestions per month
  - Basic pricing factors
  - Standard calculation

- **Pro ($9.99/month)**
  - 15 pricing suggestions per month
  - Advanced pricing factors
  - Historical suggestion tracking

- **Business ($29.99/month)**
  - Unlimited pricing suggestions
  - Premium pricing factors
  - Advanced analytics and trends
  - Priority support

## License

This project is proprietary software. All rights reserved.

## Support

For support, contact us at support@skillpay.example.com