const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hrkpbuenwejwspjrfgkd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya3BidWVud2Vqd3NwanJmZ2tkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDg4OTQsImV4cCI6MjA3NDI4NDg5NH0.SA3o1vA1xUF-HK4aHFOEaCIrchq-_-4oX6uwji2ygHk';

console.log('🔍 Supabase Email Configuration Diagnostic');
console.log('==========================================\n');

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnoseEmailIssue() {
  console.log('📧 Diagnosing Email Configuration Issues...\n');

  // Test 1: Check if we can connect to Supabase
  console.log('1️⃣ Testing Supabase Connection');
  console.log('------------------------------');
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.log('❌ Connection: FAILED');
      console.log('   Error:', error.message);
      return;
    } else {
      console.log('✅ Connection: SUCCESS');
      console.log('   Database accessible');
    }
  } catch (err) {
    console.log('❌ Connection: ERROR');
    console.log('   Network error:', err.message);
    return;
  }

  console.log('');

  // Test 2: Try signup with a unique email to avoid rate limits
  console.log('2️⃣ Testing Signup Email (Rate Limit Safe)');
  console.log('------------------------------------------');
  
  const uniqueEmail = `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@example.com`;
  console.log('   Using email:', uniqueEmail);
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email: uniqueEmail,
      password: 'TestPassword123!',
      options: {
        emailRedirectTo: 'http://localhost:5173/auth/callback'
      }
    });

    if (error) {
      console.log('❌ Signup Email: FAILED');
      console.log('   Error Code:', error.status || 'Unknown');
      console.log('   Error Message:', error.message);
      
      // Analyze specific error types
      if (error.message.includes('rate limit')) {
        console.log('   🚨 ISSUE: Email rate limit exceeded');
        console.log('   💡 SOLUTION: Wait a few minutes or use Supabase built-in SMTP');
      } else if (error.message.includes('confirmation email')) {
        console.log('   🚨 ISSUE: Email confirmation not configured');
        console.log('   💡 SOLUTION: Enable email confirmations in Supabase dashboard');
      } else if (error.message.includes('SMTP')) {
        console.log('   🚨 ISSUE: SMTP configuration problem');
        console.log('   💡 SOLUTION: Check SMTP settings in Supabase dashboard');
      } else {
        console.log('   🚨 ISSUE: Unknown email error');
        console.log('   💡 SOLUTION: Check Supabase project logs');
      }
    } else {
      console.log('✅ Signup Email: SUCCESS');
      console.log('   User created:', data.user ? 'Yes' : 'No');
      console.log('   Session created:', data.session ? 'Yes' : 'No (email confirmation required)');
      console.log('   Email sent:', data.user && !data.session ? 'Yes (confirmation required)' : 'Unknown');
    }
  } catch (err) {
    console.log('❌ Signup Email: NETWORK ERROR');
    console.log('   Error:', err.message);
  }

  console.log('');

  // Test 3: Check auth settings
  console.log('3️⃣ Checking Authentication Configuration');
  console.log('----------------------------------------');
  
  try {
    // Try to get current auth settings (this might not work with anon key)
    console.log('   ℹ️  Auth settings require service role key to check programmatically');
    console.log('   📋 Manual check required in Supabase dashboard');
  } catch (err) {
    console.log('   ⚠️  Cannot check auth settings with current permissions');
  }

  console.log('');

  // Test 4: Password reset (to confirm SMTP works)
  console.log('4️⃣ Testing Password Reset (SMTP Verification)');
  console.log('----------------------------------------------');
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail('test@example.com', {
      redirectTo: 'http://localhost:5173/reset-password'
    });

    if (error) {
      console.log('❌ Password Reset: FAILED');
      console.log('   Error:', error.message);
      console.log('   🚨 SMTP may not be working at all');
    } else {
      console.log('✅ Password Reset: SUCCESS');
      console.log('   🎯 SMTP is working for password resets');
    }
  } catch (err) {
    console.log('❌ Password Reset: ERROR');
    console.log('   Network error:', err.message);
  }

  console.log('\n📋 DIAGNOSTIC SUMMARY');
  console.log('=====================\n');

  console.log('🔧 Possible Issues & Solutions:');
  console.log('');
  
  console.log('1️⃣ EMAIL RATE LIMITING:');
  console.log('   • Supabase has email rate limits on free tier');
  console.log('   • Solution: Wait 5-10 minutes between tests');
  console.log('   • Solution: Use Supabase built-in SMTP (no rate limits)');
  console.log('');
  
  console.log('2️⃣ EMAIL CONFIRMATIONS DISABLED:');
  console.log('   • Check: Dashboard → Auth → Settings → Email');
  console.log('   • Ensure "Enable email confirmations" is ON');
  console.log('   • URL: https://app.supabase.com/project/hrkpbuenwejwspjrfgkd/auth/settings');
  console.log('');
  
  console.log('3️⃣ SMTP CONFIGURATION:');
  console.log('   • If using custom SMTP: Check credentials');
  console.log('   • If using Supabase SMTP: Should work automatically');
  console.log('   • Check: Dashboard → Auth → Settings → SMTP');
  console.log('');
  
  console.log('4️⃣ EMAIL TEMPLATE ISSUES:');
  console.log('   • Check: Dashboard → Auth → Email Templates');
  console.log('   • Ensure confirmation template is configured');
  console.log('   • URL: https://app.supabase.com/project/hrkpbuenwejwspjrfgkd/auth/templates');
  console.log('');
  
  console.log('🎯 RECOMMENDED NEXT STEPS:');
  console.log('1. Wait 10 minutes to avoid rate limits');
  console.log('2. Check Supabase dashboard email settings');
  console.log('3. Try signup with a real email address');
  console.log('4. Check Supabase project logs for errors');
  console.log('');
  
  console.log('🔗 Quick Links:');
  console.log('• Auth Settings: https://app.supabase.com/project/hrkpbuenwejwspjrfgkd/auth/settings');
  console.log('• Email Templates: https://app.supabase.com/project/hrkpbuenwejwspjrfgkd/auth/templates');
  console.log('• Project Logs: https://app.supabase.com/project/hrkpbuenwejwspjrfgkd/logs/explorer');
}

diagnoseEmailIssue();