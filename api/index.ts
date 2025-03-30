import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ 
    status: 'online',
    message: 'FreelancerAI Pricing API is running' 
  });
}