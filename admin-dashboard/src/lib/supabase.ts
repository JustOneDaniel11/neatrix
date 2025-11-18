import { createClient } from '@supabase/supabase-js'

// Create Supabase client with session persistence for admin-dashboard
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storageKey: 'neatrix-admin-auth-token',
      flowType: 'pkce',
    },
    global: {
      headers: {
        'x-client-info': 'neatrix-admin-dashboard',
      },
    },
  }
)

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
)

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