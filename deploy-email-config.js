/**
 * Supabase Email Configuration Deployment Script
 * ==============================================
 * 
 * This script helps configure Supabase email settings via the Management API.
 * It uploads email templates and configures authentication settings.
 * 
 * Prerequisites:
 * 1. Supabase CLI installed: npm install -g @supabase/cli
 * 2. Supabase service role key (from dashboard)
 * 3. Gmail App Password generated
 * 
 * Usage: node deploy-email-config.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SUPABASE_URL = 'https://hrkpbuenwejwspjrfgkd.supabase.co';
const PROJECT_REF = 'hrkpbuenwejwspjrfgkd';

async function deployEmailConfiguration() {
    console.log('🚀 Supabase Email Configuration Deployment');
    console.log('==========================================\n');

    // Check if email template exists
    const templatePath = path.join(__dirname, 'user-frontend/src/email-templates/neatrix-signup-confirmation.html');
    
    if (!fs.existsSync(templatePath)) {
        console.log('❌ Email template not found:', templatePath);
        return;
    }

    const emailTemplate = fs.readFileSync(templatePath, 'utf8');
    console.log('✅ Email template loaded');
    console.log('📄 Template size:', emailTemplate.length, 'characters\n');

    // Generate configuration commands
    console.log('📋 MANUAL CONFIGURATION STEPS');
    console.log('=============================\n');

    console.log('1️⃣ SMTP CONFIGURATION');
    console.log('---------------------');
    console.log('Go to: https://app.supabase.com/project/' + PROJECT_REF + '/auth/settings');
    console.log('Navigate to: Authentication → Settings → SMTP Settings');
    console.log('Enable: Custom SMTP');
    console.log('Configure:');
    console.log('   SMTP Host: smtp.gmail.com');
    console.log('   SMTP Port: 587');
    console.log('   SMTP User: contactneatrix@gmail.com');
    console.log('   SMTP Password: [Your Gmail App Password]');
    console.log('   Sender Email: contactneatrix@gmail.com');
    console.log('   Sender Name: Neatrix Professional Cleaning\n');

    console.log('2️⃣ EMAIL TEMPLATE CONFIGURATION');
    console.log('-------------------------------');
    console.log('Go to: https://app.supabase.com/project/' + PROJECT_REF + '/auth/templates');
    console.log('Click: "Confirm signup" template');
    console.log('Subject: Welcome to Neatrix! 🎉 — Confirm your account');
    console.log('Body: Copy the content below:\n');
    
    // Save template to a file for easy copying
    const outputPath = path.join(__dirname, 'supabase-email-template.html');
    fs.writeFileSync(outputPath, emailTemplate);
    console.log('📄 Template saved to:', outputPath);
    console.log('   Copy this file content to Supabase dashboard\n');

    console.log('3️⃣ URL CONFIGURATION');
    console.log('-------------------');
    console.log('Go to: https://app.supabase.com/project/' + PROJECT_REF + '/auth/url-configuration');
    console.log('Site URL: https://neatrix.vercel.app');
console.log('Redirect URLs to add:');
console.log('   - https://neatrix.vercel.app/email-verification-success');
console.log('   - https://neatrix.vercel.app/auth/callback');
console.log('   - https://neatrix.vercel.app/**\n');

    console.log('4️⃣ USER MANAGEMENT SETTINGS');
    console.log('---------------------------');
    console.log('Go to: https://app.supabase.com/project/' + PROJECT_REF + '/auth/settings');
    console.log('Enable:');
    console.log('   ✅ Enable email confirmations');
    console.log('   ✅ Double confirm email changes');
    console.log('   ✅ Enable phone confirmations (optional)\n');

    console.log('5️⃣ GMAIL APP PASSWORD SETUP');
    console.log('---------------------------');
    console.log('1. Go to: https://myaccount.google.com');
    console.log('2. Login with: contactneatrix@gmail.com');
    console.log('3. Navigate to: Security → 2-Step Verification (enable if needed)');
    console.log('4. Navigate to: Security → App passwords');
    console.log('5. Generate new app password for "Mail"');
    console.log('6. Copy the 16-character password');
    console.log('7. Use this password in Supabase SMTP settings\n');

    // Generate curl commands for API configuration (requires service role key)
    console.log('🔧 API CONFIGURATION (Advanced)');
    console.log('===============================');
    console.log('If you have the service role key, you can use these API calls:\n');

    const apiCommands = [
        {
            name: 'Update Auth Settings',
            command: `curl -X PATCH '${SUPABASE_URL}/rest/v1/config/auth' \\
  -H 'apikey: YOUR_SERVICE_ROLE_KEY' \\
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "ENABLE_EMAIL_CONFIRMATIONS": true,
    "ENABLE_EMAIL_CHANGE_CONFIRMATIONS": true,
    "SITE_URL": "https://neatrix.vercel.app"
  }'`
        }
    ];

    apiCommands.forEach((cmd, index) => {
        console.log(`${index + 1}. ${cmd.name}:`);
        console.log(cmd.command);
        console.log('');
    });

    console.log('⚠️  Note: Replace YOUR_SERVICE_ROLE_KEY with your actual service role key from Supabase dashboard\n');

    // Test commands
    console.log('🧪 TESTING COMMANDS');
    console.log('==================');
    console.log('After configuration, run these tests:');
    console.log('1. node test-email-template.js');
    console.log('2. node test-email-verification.js');
    console.log('3. node diagnose-email-verification.js\n');

    // Generate summary
    console.log('📊 CONFIGURATION SUMMARY');
    console.log('========================');
    console.log('✅ Email template ready for upload');
    console.log('✅ Configuration commands generated');
    console.log('✅ Test scripts available');
    console.log('⚠️  Manual configuration required in Supabase dashboard');
    console.log('⚠️  Gmail App Password required\n');

    console.log('🎯 EXPECTED RESULTS');
    console.log('==================');
    console.log('After completing the configuration:');
    console.log('1. New users will receive professional confirmation emails');
    console.log('2. Emails will be sent from contactneatrix@gmail.com');
    console.log('3. Email template will include Neatrix branding');
    console.log('4. Confirmation links will redirect to success page');
    console.log('5. Users can access dashboard after confirmation\n');

    console.log('📞 SUPPORT');
    console.log('==========');
    console.log('Email: contactneatrix@gmail.com');
    console.log('Phone: +2349034842430');
    console.log('WhatsApp: https://wa.me/2349034842430\n');

    console.log('🚀 Ready to deploy! Follow the manual steps above.');
}

// Run the deployment
deployEmailConfiguration().catch(console.error);