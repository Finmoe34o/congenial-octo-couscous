# Vercel Deployment Guide for SkillPay

This guide will help you deploy the SkillPay application to Vercel correctly.

## Prerequisites

Before deploying, make sure you have:
- A Vercel account
- Access to the SkillPay GitHub repository
- All necessary environment variables ready

## Environment Variables

Ensure the following environment variables are set in your Vercel project settings:

### Required Variables
- `DATABASE_URL`: Your PostgreSQL connection string
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `JWT_SECRET`: A secure secret for JWT token signing

### Optional Variables (for Stripe integration)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `VITE_STRIPE_PUBLIC_KEY`: Your Stripe publishable key

## Deployment Process

1. **Connect your GitHub repository to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select "Next.js" as the framework preset

2. **Configure the deployment settings**
   - Override the build command if needed: `next build`
   - Override the output directory if needed: `.next`
   - Set all environment variables listed above

3. **Deploy the application**
   - Click "Deploy"
   - Wait for the build and deployment to complete

## Checking for Deployment Issues

If you encounter a 500 error after deployment:

1. **Check Vercel build logs**
   - Navigate to your project in the Vercel dashboard
   - Go to "Deployments" and click on the latest deployment
   - Check the build logs for any errors

2. **Verify environment variables**
   - Make sure all required environment variables are set correctly
   - Check for typos in the variable names and values

3. **Check function logs**
   - In the Vercel dashboard, go to "Functions"
   - Check for any runtime errors in your serverless functions

4. **Adjust function resources if needed**
   - If functions are timing out, increase the memory limit and execution time in `vercel.json`

## Common Issues and Solutions

### Database Connection Errors
- Ensure your `DATABASE_URL` is correct and the database is accessible from Vercel's servers
- Check that your IP address restrictions on the database allow connections from Vercel

### JWT Errors
- Verify that `JWT_SECRET` is set and is the same value used during development
- Ensure the JWT token is being properly generated and validated

### Supabase Connection Issues
- Confirm both `SUPABASE_URL` and `SUPABASE_ANON_KEY` are correctly set
- Check that your Supabase project is active and not restricted

### Next.js Build Failures
- Ensure your Next.js application builds successfully locally before deploying
- Check for any build-time dependencies that might be missing

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Troubleshooting Vercel Deployments](https://vercel.com/support/articles/debugging-deployment-issues)