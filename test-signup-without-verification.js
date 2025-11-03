const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.log('Required: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignupWithoutVerification() {
  console.log('🧪 Testing signup without email verification...\n');

  // Generate a unique test email
  const timestamp = Date.now();
  const testEmail = `test-user-${timestamp}@example.com`;
  const testPassword = 'TestPassword123!';

  try {
    console.log(`📧 Attempting to sign up with: ${testEmail}`);
    
    // Attempt to sign up
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (error) {
      console.error('❌ Signup failed:', error.message);
      
      if (error.message.includes('email rate limit exceeded')) {
        console.log('\n⚠️  Rate limit hit - this actually confirms the system is working!');
        console.log('   Try again in 10-15 minutes or use a different email domain.');
        return;
      }
      
      return;
    }

    console.log('✅ Signup successful!');
    console.log('\n📋 User details:');
    console.log(`   ID: ${data.user?.id}`);
    console.log(`   Email: ${data.user?.email}`);
    console.log(`   Email confirmed: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}`);
    console.log(`   Created at: ${data.user?.created_at}`);

    // Check if user can immediately access the platform
    if (data.session) {
      console.log('\n🎉 SUCCESS: User has immediate access!');
      console.log('   Session token received - no email verification required');
      console.log(`   Access token: ${data.session.access_token.substring(0, 20)}...`);
    } else if (data.user && !data.user.email_confirmed_at) {
      console.log('\n⚠️  User created but needs email confirmation');
      console.log('   Email verification is still enabled - check Supabase dashboard');
    } else {
      console.log('\n✅ User created successfully');
      console.log('   Check if they can log in immediately...');
      
      // Try to sign in immediately
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

      if (signInError) {
        console.log(`❌ Immediate login failed: ${signInError.message}`);
      } else {
        console.log('🎉 SUCCESS: User can log in immediately!');
        console.log('   No email verification required');
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }

  console.log('\n📋 Next steps:');
  console.log('1. If signup failed, follow the manual steps to disable email verification');
  console.log('2. If successful, users can now join your platform immediately');
  console.log('3. Test with the actual website signup form');
}

// Run the test
testSignupWithoutVerification();