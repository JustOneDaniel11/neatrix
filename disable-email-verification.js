require('dotenv').config();

// Get Supabase URL from environment
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

if (!supabaseUrl) {
  console.error('❌ Missing VITE_SUPABASE_URL environment variable');
  process.exit(1);
}

async function disableEmailVerification() {
  console.log('🔧 Disabling email verification for Neatrix platform...\n');

  // Extract project reference from URL
  const projectRef = supabaseUrl.split('//')[1].split('.')[0];
  const dashboardUrl = `https://supabase.com/dashboard/project/${projectRef}/auth/users`;

  console.log('📋 Manual steps to disable email verification:');
  console.log('\n1. 🌐 Open your Supabase Dashboard:');
  console.log(`   ${dashboardUrl}`);
  console.log('\n2. 🔧 Navigate to Authentication > Settings');
  console.log('   (Look for the gear icon in the Authentication section)');
  console.log('\n3. ❌ Turn OFF "Enable email confirmations"');
  console.log('   (Uncheck the checkbox next to "Enable email confirmations")');
  console.log('\n4. 💾 Save the changes');
  console.log('   (Click the "Save" button at the bottom)');
  
  console.log('\n✅ After completing these steps:');
  console.log('• Users can sign up and access the platform immediately');
  console.log('• No email confirmation will be required');
  console.log('• Existing users (if any) will be able to log in');
  
  console.log('\n🎉 This will allow users to join your platform without email verification!');
  console.log('\n⚠️  Note: You can re-enable email verification later when ready for production');
  
  console.log('\n🔗 Quick link to your dashboard:');
  console.log(`   ${dashboardUrl}`);
}

// Run the function
disableEmailVerification();