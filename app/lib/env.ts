type EnvVarConfig = {
  name: string;
  required: boolean;
  description: string;
  hint?: string;
};

/**
 * Validates environment variables and returns details about missing ones
 * @returns Array of missing required environment variables
 */
export function validateEnv(): string[] {
  // Define all environment variables with their requirements
  const envVars: EnvVarConfig[] = [
    { 
      name: "SUPABASE_URL", 
      required: true, 
      description: "Supabase project URL",
      hint: "Find this in your Supabase project settings" 
    },
    { 
      name: "SUPABASE_ANON_KEY", 
      required: true, 
      description: "Supabase anonymous API key",
      hint: "Find this in your Supabase API settings" 
    },
    { 
      name: "DATABASE_URL", 
      required: true, 
      description: "PostgreSQL connection string",
      hint: "Format: postgresql://username:password@hostname:port/database" 
    },
    { 
      name: "JWT_SECRET", 
      required: true, 
      description: "Secret key for JWT token signing",
      hint: "Should be a strong random string" 
    },
    { 
      name: "STRIPE_SECRET_KEY", 
      required: false, 
      description: "Stripe secret API key",
      hint: "Required for payment processing" 
    },
    { 
      name: "NEXT_PUBLIC_STRIPE_PUBLIC_KEY", 
      required: false, 
      description: "Stripe publishable API key",
      hint: "Required for payment forms" 
    }
  ];

  const missingRequired: string[] = [];
  const missingOptional: string[] = [];

  // Check all environment variables
  for (const env of envVars) {
    if (!process.env[env.name]) {
      if (env.required) {
        missingRequired.push(env.name);
      } else {
        missingOptional.push(env.name);
      }
    }
  }

  // Log detailed information in development
  if (process.env.NODE_ENV !== 'production' && 
      (missingRequired.length > 0 || missingOptional.length > 0)) {
    
    console.error('\n=== Environment Variable Check ===');
    
    if (missingRequired.length > 0) {
      console.error('\n❌ MISSING REQUIRED VARIABLES:');
      missingRequired.forEach(name => {
        const config = envVars.find(e => e.name === name);
        console.error(`  - ${name}: ${config?.description}`);
        if (config?.hint) console.error(`    Hint: ${config.hint}`);
      });
    }
    
    if (missingOptional.length > 0) {
      console.error('\n⚠️ MISSING OPTIONAL VARIABLES:');
      missingOptional.forEach(name => {
        const config = envVars.find(e => e.name === name);
        console.error(`  - ${name}: ${config?.description}`);
        if (config?.hint) console.error(`    Hint: ${config.hint}`);
      });
    }
    
    console.error('\n===============================\n');
  }

  return missingRequired;
}