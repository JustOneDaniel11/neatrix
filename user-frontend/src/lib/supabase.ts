import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && key)

// Lazily create the client only when configured to avoid runtime crashes
export const supabase = isSupabaseConfigured
  ? createClient(url as string, key as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'neatrix-user-auth-token',
        flowType: 'pkce',
      },
      global: {
        headers: {
          'x-client-info': 'neatrix-user-frontend',
        },
      },
    })
  : new Proxy({}, {
      get() {
        throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
      }
    }) as any

// Test connection function
export async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase connection...');
  console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('Supabase Key (partial):', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
  
  if (!isSupabaseConfigured) {
    console.warn('⚠️ Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    return;
  }
  
  // Test basic URL accessibility
  try {
    console.log('🌐 Testing basic URL accessibility...');
    const response = await fetch(import.meta.env.VITE_SUPABASE_URL + '/rest/v1/', {
      method: 'HEAD',
      headers: {
        'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      }
    });
    console.log('📡 URL Response Status:', response.status, response.statusText);
    
    if (response.status === 404) {
      console.warn('⚠️ Project might be paused or doesn\'t exist');
    }
  } catch (urlError) {
    console.error('❌ URL accessibility test failed:', urlError);
  }
  
  // Test authentication endpoint
  try {
    console.log('🔐 Testing authentication endpoint...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('❌ Auth test failed:', error);
    } else {
      console.log('✅ Auth test successful');
      console.log('📋 Session exists:', !!data.session);
    }
  } catch (authError) {
    console.error('❌ Auth test failed with exception:', authError);
  }
}