const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hrkpbuenwejwspjrfgkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya3BidWVud2Vqd3NwanJmZ2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDg4OTQsImV4cCI6MjA3NDI4NDg5NH0.SA3o1vA1xUF-HK4aHFOEaCIrchq-_-4oX6uwji2ygHk';

console.log('📧 Testing SMTP Email Configuration...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testEmailSending() {
  try {
    // Generate a unique test email
    const testEmail = `test-smtp-${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    console.log('\n🧪 Testing signup with email confirmation...');
    console.log('Test email:', testEmail);
    
    // Attempt to sign up a test user (this will trigger email sending)
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        emailRedirectTo: 'http://localhost:5173/auth/callback'
      }
    });
    
    if (error) {
      console.log('❌ Signup error:', error.message);
      console.log('Error details:', error);
      
      // Check if it's an SMTP-related error
      if (error.message.includes('smtp') || error.message.includes('email') || error.message.includes('mail')) {
        console.log('\n🚨 This appears to be an SMTP/email configuration issue');
      }
    } else {
      console.log('\n✅ Signup request successful!');
      console.log('User data:', data.user ? 'User created' : 'No user data');
      console.log('Session:', data.session ? 'Session created' : 'No session (email confirmation required)');
      
      if (data.user && !data.session) {
        console.log('\n📬 Email confirmation required - this means SMTP is working!');
        console.log('User ID:', data.user.id);
        console.log('Email confirmed:', data.user.email_confirmed_at ? 'Yes' : 'No');
      }
    }
    
  } catch (err) {
    console.log('❌ Network/Connection error:', err.message);
  }
}

async function testPasswordReset() {
  try {
    console.log('\n🔄 Testing password reset email...');
    
    // Test with an existing user email (you can replace this with a real email from your users table)
    const testEmail = 'test@example.com';
    
    const { data, error } = await supabase.auth.resetPasswordForEmail(testEmail, {
      redirectTo: 'http://localhost:5173/reset-password'
    });
    
    if (error) {
      console.log('❌ Password reset error:', error.message);
      console.log('Error details:', error);
    } else {
      console.log('✅ Password reset email request successful!');
      console.log('Response:', data);
    }
    
  } catch (err) {
    console.log('❌ Password reset network error:', err.message);
  }
}

async function runTests() {
  await testEmailSending();
  await testPasswordReset();
  
  console.log('\n📋 Test Summary:');
  console.log('- If signup succeeds without session, SMTP is working for confirmations');
  console.log('- If password reset succeeds, SMTP is working for password resets');
  console.log('- Any SMTP errors will be displayed above');
}

runTests();