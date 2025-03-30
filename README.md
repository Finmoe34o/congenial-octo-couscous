# Freelancer Pricing Suggestion App

A sophisticated web application powered by AI, enabling precise project cost estimation through intelligent analysis and user-friendly interfaces.

## Key Technologies

- Supabase authentication
- JWT-based security
- AI-driven pricing recommendations
- Responsive web design
- Subscription-based access model

## Deploying to Vercel

### Prerequisites

1. A Vercel account
2. A Supabase account
3. A Stripe account (for payment processing)

### Step 1: Set Up Environment Variables

Add the following environment variables in your Vercel project settings:

```
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_publishable_key
```

### Step 2: Deploy to Vercel

1. Push your project to a GitHub repository
2. Connect the repository to Vercel
3. Configure the build settings in Vercel:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### Step 3: Serverless Functions Architecture

This application uses a hybrid architecture designed to work seamlessly in both development and production environments:

1. **Development Mode**: The application runs with Express.js as a traditional server.
2. **Production Mode**: The application transforms into serverless functions on Vercel.

The key components that enable this architecture:

- **API Directory**: The `/api` directory contains individual serverless function files that work directly with Vercel's deployment platform.
- **Catch-all Route**: The `/api/[...path].ts` file acts as a router that forwards all API requests to our Express application logic.
- **Individual Endpoints**: Standalone API endpoints (like `/api/login.ts`, `/api/user.ts`) provide direct serverless implementations.

This design provides flexibility and optimal performance in both environments without requiring code changes between development and deployment.

### Step 4: Verify the Deployment

After deployment:
1. Test authentication flows
2. Verify API connections
3. Test Stripe payment processing
4. Check that pricing suggestions are generating correctly

## Folder Structure

```
├── api/                  # Vercel serverless functions
│   ├── [...path].ts      # Catch-all route handler
│   ├── login.ts          # Authentication endpoint
│   ├── user.ts           # User data endpoint
│   ├── register.ts       # User registration endpoint
│   ├── pricing-suggestion.ts # Pricing calculation endpoint
│   ├── create-pro-subscription.ts # Pro tier payment endpoint
│   ├── create-business-subscription.ts # Business tier payment endpoint
│   ├── stripe-webhook.ts # Webhook handler for subscription events
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks (including useAuth)
│   │   ├── lib/          # Utility functions and API client
│   │   ├── pages/        # Page components
├── server/               # Backend code for development
│   ├── api/              # Development API endpoints
│   ├── auth.ts           # Authentication logic
│   ├── db.ts             # Database connection (Supabase)
│   ├── storage.ts        # Data access layer
│   ├── routes.ts         # Express route definitions
├── shared/               # Shared code
│   ├── schema.ts         # Database schema and types
├── vercel.json           # Vercel configuration
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Project Features

- User authentication and registration
- Pricing suggestion generator
- Subscription tiers (Free, Pro, Business)
- User profile and history of pricing suggestions
- Responsive UI
- Automated subscription management via Stripe webhooks

## Subscription Management

The application uses Stripe for payment processing and subscription management with three tiers:

1. **Free Tier** - 5 pricing suggestions per month
2. **Pro Tier** - $7.99/month for 30 pricing suggestions per month
3. **Business Tier** - $19.99/month for unlimited pricing suggestions

Subscription status and suggestion limits are automatically updated through Stripe webhooks, which listen for the following events:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

For detailed setup instructions, see the [Deployment Guide](DEPLOYMENT_GUIDE.md).