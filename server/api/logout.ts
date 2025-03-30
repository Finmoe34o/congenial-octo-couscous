import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase } from '../db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" });
  }
  
  try {
    // Sign out from Supabase (client-side should remove the stored JWT)
    await supabase.auth.signOut();
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in /api/logout:", error);
    res.status(500).json({ error: "Logout failed" });
  }
}