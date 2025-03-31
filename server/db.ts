import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "@shared/schema";

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to configure your database?",
  );
}

// Create postgres connection for Drizzle ORM
const queryClient = postgres(process.env.DATABASE_URL);
export const db = drizzle(queryClient, { schema });

// For session store compatibility
export const pool = {
  query: async (text: string, params: any[]) => {
    return await queryClient.unsafe(text, params);
  },
};
