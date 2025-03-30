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

### Step 3: Serverless Functions

The project is structured to use Vercel's serverless functions for the API endpoints. All API endpoints in `server/api` directory will be automatically deployed as serverless functions.

### Step 4: Verify the Deployment

After deployment:
1. Test authentication flows
2. Verify API connections
3. Test Stripe payment processing
4. Check that pricing suggestions are generating correctly

## Folder Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
├── server/               # Backend code
│   ├── api/              # Serverless API endpoints for Vercel
│   ├── db.ts             # Database connection
│   ├── storage.ts        # Data access layer
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