# Deployment Guide for Freelancer Price Suggestion App

This guide provides step-by-step instructions for deploying the Freelancer Price Suggestion app to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (can sign up with GitHub)
3. A Supabase account (for database and authentication)
4. A Stripe account (for payment processing)

## Step 1: Push Code to GitHub

1. Create a new GitHub repository
2. Push the project code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

## Step 2: Set Up Supabase

1. Create a new Supabase project at https://app.supabase.com/
2. Take note of your project URL and anon key from the API settings
3. Connect to your Supabase database and run the SQL migrations:
   - The database schema is defined in `shared/schema.ts`
   - Use the `npm run db:push` command to push schema changes to Supabase

## Step 3: Set Up Stripe

1. Create a Stripe account at https://stripe.com/
2. Get your API keys from https://dashboard.stripe.com/apikeys
   - Take note of both the Publishable key and Secret key
3. Set up Stripe products and pricing:
   - Create two subscription products in Stripe dashboard:
     - Pro Tier: $7.99/month
     - Business Tier: $19.99/month
   - Note the Price IDs (they start with `price_`)
4. Configure webhooks for subscription management:
   - Go to https://dashboard.stripe.com/webhooks
   - Click "Add endpoint" and enter your Vercel deployment URL + `/api/stripe-webhook`
   - For events to listen to, select:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - After creating, note the "Signing secret" - you'll need this for your environment variables
5. Add the additional environment variables to your deployment:
   ```
   STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret
   STRIPE_PRO_PRICE_ID=your_pro_tier_price_id
   STRIPE_BUSINESS_PRICE_ID=your_business_tier_price_id
   ```
6. Test the payment flow in test mode

## Step 4: Deploy to Vercel

1. Log in to your Vercel account
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure the project settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

5. Add the following environment variables in the Vercel project settings:
   ```
   DATABASE_URL=your_supabase_postgres_connection_string
   JWT_SECRET=your_jwt_secret_key
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_signing_secret
   STRIPE_PRO_PRICE_ID=your_pro_tier_price_id
   STRIPE_BUSINESS_PRICE_ID=your_business_tier_price_id
   ```

   For the JWT_SECRET, you can generate one with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. Click "Deploy"

### Understanding the Serverless Architecture

This application is designed to work with Vercel's serverless functions:

1. **API Routes**: The `/api` directory contains all serverless API endpoints.
2. **Catch-all Route**: The `/api/[...path].ts` file forwards all requests to our Express application.
3. **Individual Endpoints**: Standalone API endpoints are defined in separate files (e.g., `api/login.ts`, `api/register.ts`).

This dual architecture allows the application to run traditionally in development (via Express) while seamlessly converting to serverless deployment on Vercel.

## Step 5: Verify Deployment

After deployment completes:

1. Visit your Vercel project URL
2. Test user registration and login
3. Test the pricing suggestion feature
4. Test the payment flow with Stripe test cards:
   - Use `4242 4242 4242 4242` with any future expiry date and any CVC

## Step 6: Set Up Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" > "Domains"
2. Add your custom domain and follow the instructions

## Environment Configuration

For local development, create a `.env` file with the same variables as above.

### Testing Webhooks Locally

For testing Stripe webhooks in a local development environment:

1. Install the Stripe CLI from https://stripe.com/docs/stripe-cli
2. Login to your Stripe account with `stripe login`
3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to http://localhost:3000/api/stripe-webhook
   ```
4. The CLI will provide a webhook signing secret to use in your local environment:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
5. Add this to your `.env` file
6. Trigger test webhook events:
   ```bash
   stripe trigger customer.subscription.created
   ```

## Troubleshooting Common Issues

### Database Connection Issues

- Verify your DATABASE_URL environment variable is correct
- Ensure your IP address is allowed in Supabase's settings
- Check that you've run `npm run db:push` to set up the tables

### Authentication Issues

- Verify your JWT_SECRET is set correctly
- Check SUPABASE_URL and SUPABASE_ANON_KEY values
- Ensure users table exists in the database

### Payment Processing Issues

- Verify STRIPE_SECRET_KEY and VITE_STRIPE_PUBLIC_KEY are set correctly
- Ensure you're using Stripe test cards for testing
- Check the browser console for client-side errors

### Vercel Serverless Function Issues

- If API routes return 404, check that your `/api` directory is correctly deployed
- For serverless function errors, check the Function Logs in Vercel's dashboard
- Ensure that the catch-all route in `/api/[...path].ts` is properly handling all API requests
- Monitor Vercel's Function Logs for timeout or memory limit errors
- For database connection issues in serverless functions, verify your DATABASE_URL includes proper SSL settings required by Supabase
- If you see module import errors like `Cannot find module '/var/task/server/storage'`, make sure you're importing from the local `./_lib/storage` module within API files, not from `../server/storage`

### Stripe Webhook Issues

- If subscription status isn't updating properly, check the Stripe webhook logs in your Stripe dashboard
- Ensure the webhook endpoint URL is correctly pointing to `https://your-domain.com/api/stripe-webhook`
- Verify that the `STRIPE_WEBHOOK_SECRET` environment variable matches the one from Stripe
- Make sure the webhook is set up to listen for the necessary events:
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
- Test the webhook using Stripe's "Send test webhook" feature in the dashboard
- For development, use the Stripe CLI to forward webhook events to your local environment