import { createClient } from '@supabase/supabase-js';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../../shared/schema';

// Create a Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Database connection string from environment variable
const connectionString = process.env.DATABASE_URL!;

// Create postgres connection
const queryClient = postgres(connectionString);

// Create drizzle client
export const db = drizzle(queryClient, { schema });

// Create a pool for connect-pg-simple without actually creating a pool
export const pool = {
  query: async (text: string, params: any[]) => {
    const result = await queryClient.unsafe(text, ...params);
    return {
      rows: Array.isArray(result) ? result : [result],
    };
  },
};