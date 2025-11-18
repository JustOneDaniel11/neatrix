import { createClient } from '@supabase/supabase-js';

// Environment variables should be provided by the consuming application
const supabaseUrl = process.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error('Supabase environment variables are missing:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
}

// Create a custom fetch with timeout and retry
const fetchWithRetry: typeof fetch = async (input, init) => {
  const retries = 3;
  const timeout = 10000;
  let attempt = 0;
  
  while (attempt < retries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(input, {
        ...init,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      attempt++;
      
      if (attempt === retries) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      console.log(`Retrying request (${attempt}/${retries})...`);
    }
  }
  
  // This should never be reached, but TypeScript needs a return statement
  throw new Error('Failed to complete fetch request after retries');
};

// Create Supabase client with session persistence
export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'example',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'neatrix-admin-auth-token',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      flowType: 'pkce',
      debug: true,
    },
    realtime: {
      params: {
        eventsPerSecond: 2,
      },
    },
    global: {
      headers: {
        'x-client-info': 'neatrix-admin-dashboard',
      },
      fetch: fetchWithRetry,
    },
  }
);

// Log initial session state
if (typeof window !== 'undefined') {
  supabase.auth.getSession().then(({ data: { session } }) => {
    console.log('Initial session state:', {
      hasSession: !!session,
      userId: session?.user?.id,
      tokenExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
    });
  });

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', {
      event,
      userId: session?.user?.id,
      tokenExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
    });
  });
}