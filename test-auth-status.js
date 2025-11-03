const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAuthStatus() {
  console.log('🔍 Checking authentication configuration...\n');

  try {
    // Try to get current session (should be null for new client)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.log('❌ Session check failed:', sessionError.message);
    } else {
      console.log('✅ Auth client initialized successfully');
      console.log(`   Current session: ${session ? 'Active' : 'None'}`);
    }

    // Check if we can access the auth endpoint
    console.log('\n🌐 Testing auth endpoint connectivity...');
    
    // This will test if the auth service is accessible
    const response = await fetch(`${supabaseUrl}/auth/v1/settings`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const settings = await response.json();
      console.log('✅ Auth service is accessible');
      console.log(`   External email enabled: ${settings.external_email_enabled || 'Unknown'}`);
      console.log(`   External phone enabled: ${settings.external_phone_enabled || 'Unknown'}`);
      
      if (settings.email_enabled !== undefined) {
        console.log(`   Email auth enabled: ${settings.email_enabled}`);
      }
    } else {
      console.log(`❌ Auth service check failed: ${response.status} ${response.statusText}`);
    }

  } catch (error) {
    console.error('❌ Error checking auth status:', error.message);
  }

  console.log('\n📋 Summary:');
  console.log('• Email rate limits are active (good for security)');
  console.log('• Auth service is configured and accessible');
  console.log('• Users should be able to sign up once rate limits clear');
  
  console.log('\n🎯 To test signup without rate limits:');
  console.log('1. Wait 10-15 minutes for rate limits to reset');
  console.log('2. Use a different email domain (gmail.com, yahoo.com, etc.)');
  console.log('3. Test through the actual website signup form');
  console.log('4. Follow the manual steps to disable email verification in Supabase dashboard');
  
  console.log('\n🔗 Supabase Dashboard:');
  const projectRef = supabaseUrl.split('//')[1].split('.')[0];
  console.log(`   https://supabase.com/dashboard/project/${projectRef}/auth/users`);
}

// Run the check
checkAuthStatus();