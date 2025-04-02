# Deployment Guide for SkillPay

This guide provides instructions for deploying SkillPay to various platforms.

## Table of Contents
- [Deploying on Replit](#deploying-on-replit)
- [Deploying on Vercel](#deploying-on-vercel)
- [Required Environment Variables](#required-environment-variables)
- [Database Setup](#database-setup)
- [Stripe Integration](#stripe-integration)

## Deploying on Replit

### 1. Fork the Repl
- Fork this Repl to your own Replit account to create a copy that you can deploy.

### 2. Set Environment Variables
- Navigate to the "Secrets" tab in your Repl.
- Add the following required secrets:
  - `DATABASE_URL`: Your PostgreSQL connection string
  - `SUPABASE_URL`: Your Supabase project URL
  - `SUPABASE_ANON_KEY`: Your Supabase anonymous key
  - `JWT_SECRET`: A secure secret for JWT token signing
  - `STRIPE_SECRET_KEY`: Your Stripe secret key
  - `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

### 3. Run Database Migrations
- Open the Replit Shell
- Run: `npm run db:push`

### 4. Deploy Your Repl
- Click on the "Deploy" button in Replit's interface
- Follow the prompts to deploy your application
- Note the URL provided upon successful deployment

### 5. Verify Deployment
- Visit the deployed URL to ensure the application is running correctly
- Test the authentication, pricing calculator, and payment flows

## Deploying on Vercel

For detailed Vercel deployment instructions, see [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md).

## Required Environment Variables

| Variable              | Description                           | Required | 
|-----------------------|---------------------------------------|----------|
| `DATABASE_URL`        | PostgreSQL connection string          | Yes      |
| `SUPABASE_URL`        | Supabase project URL                  | Yes      |
| `SUPABASE_ANON_KEY`   | Supabase anonymous key                | Yes      |
| `JWT_SECRET`          | Secret for JWT token signing          | Yes      |
| `STRIPE_SECRET_KEY`   | Stripe secret API key                 | For payments |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key            | For payments |

## Database Setup

The application requires a PostgreSQL database. You can use:

1. **Supabase**: Provides PostgreSQL database with additional features
   - Create a project at [Supabase](https://supabase.com/)
   - Use the connection details provided in your project settings

2. **Self-hosted PostgreSQL**:
   - Install PostgreSQL on your server
   - Create a new database and user
   - Configure the connection string in your environment variables

After setting up the database, run migrations with:
```
npm run db:push
```

## Stripe Integration

To enable payments:

1. Create a [Stripe](https://stripe.com/) account
2. Get your API keys from the Stripe Dashboard
3. Add the following to your environment variables:
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

For subscription plans, create products and prices in the Stripe Dashboard and note the price IDs for use in your application.