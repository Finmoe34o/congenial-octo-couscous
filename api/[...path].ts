import { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import { registerRoutes } from '../server/routes';
import { setupAuth } from '../server/auth';
import { log } from '../server/vite';

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up auth middleware
setupAuth(app);

// Register routes
registerRoutes(app);

// Create HTTP server instance without starting it
const server = createServer(app);

// Used for local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 5000;
  server.listen(port, '0.0.0.0', () => {
    log(`server listening on port ${port}`);
  });
}

// This is the catch-all handler for Vercel serverless function
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Forward the request to our Express app
  return new Promise<void>((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}