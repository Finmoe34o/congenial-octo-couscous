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
3. Test the payment flow in test mode

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
   ```

   For the JWT_SECRET, you can generate one with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. Click "Deploy"

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