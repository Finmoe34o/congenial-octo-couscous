import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@/../../shared/schema";
import { createClient } from '@supabase/supabase-js';

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to configure your database?",
  );
}

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_ANON_KEY must be set for Supabase client",
  );
}

// Create Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Create postgres connection for Drizzle ORM
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });

// For session store compatibility
export const getPool = () => ({
  query: async (text: string, params: any[]) => {
    return await queryClient.unsafe(text, params);
  },
});