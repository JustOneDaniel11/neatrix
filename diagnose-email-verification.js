/**
 * Email Verification Diagnostic Script
 * ===================================
 * 
 * This script diagnoses email verification issues and provides specific fixes.
 * It checks Supabase configuration, SMTP settings, and email templates.
 * 
 * Usage: node diagnose-email-verification.js
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, 'user-frontend', '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase credentials in user-frontend/.env');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function diagnoseEmailVerification() {
    console.log('🔍 Email Verification Diagnostic Report');
    console.log('======================================\n');

    const issues = [];
    const fixes = [];

    // Test 1: Check Supabase connection
    console.log('1️⃣ Testing Supabase connection...');
    try {
        const { data, error } = await supabase.from('services').select('count').limit(1);
        if (error) {
            console.log('❌ Connection failed:', error.message);
            issues.push('Supabase connection failed');
            return;
        }
        console.log('✅ Supabase connection successful\n');
    } catch (err) {
        console.log('❌ Connection error:', err.message);
        issues.push('Supabase connection error');
        return;
    }

    // Test 2: Test signup flow
    console.log('2️⃣ Testing signup flow...');
    const testEmail = `test.${Date.now()}@example.com`;
    const testPassword = 'TestPassword123!';
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
                emailRedirectTo: `${process.env.VITE_SITE_URL || 'http://localhost:5173'}/email-verification-success`
            }
        });

        if (error) {
            console.log('❌ Signup failed:', error.message);
            
            if (error.message.includes('rate limit')) {
                console.log('⚠️  Rate limit detected - this actually indicates the email system is working!');
                console.log('   The rate limit suggests previous signup attempts were processed.');
                console.log('   Wait 1-2 hours and try with a different email.\n');
            } else if (error.message.includes('sending confirmation email')) {
                console.log('🚨 CRITICAL: Email sending failed - SMTP configuration issue');
                issues.push('SMTP configuration not working');
                fixes.push('Configure SMTP settings in Supabase Dashboard');
            } else if (error.message.includes('Unable to validate email')) {
                console.log('🚨 CRITICAL: Email validation failed');
                issues.push('Email validation system not configured');
                fixes.push('Enable email confirmations in Supabase Dashboard');
            } else {
                issues.push(`Signup error: ${error.message}`);
            }
        } else {
            console.log('✅ Signup successful');
            console.log('📧 User created:', data.user?.email);
            console.log('🔐 Email confirmed:', data.user?.email_confirmed_at ? 'Yes' : 'No');
            
            if (!data.user?.email_confirmed_at) {
                console.log('📬 Verification email should have been sent');
                console.log('   Check spam folder and email provider settings\n');
            }
        }
    } catch (err) {
        console.log('❌ Signup error:', err.message);
        issues.push(`Signup exception: ${err.message}`);
    }

    // Test 3: Check email template files
    console.log('3️⃣ Checking email template files...');
    const templatePath = path.join(__dirname, 'user-frontend/src/email-templates/neatrix-signup-confirmation.html');
    const passwordResetPath = path.join(__dirname, 'user-frontend/src/email-templates/neatrix-password-reset.html');
    
    if (fs.existsSync(templatePath)) {
        console.log('✅ Signup confirmation template exists');
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        if (templateContent.includes('{{ .ConfirmationURL }}')) {
            console.log('✅ Template contains required Supabase variables');
        } else {
            console.log('❌ Template missing {{ .ConfirmationURL }} variable');
            issues.push('Email template missing required variables');
            fixes.push('Update email template with {{ .ConfirmationURL }}');
        }
    } else {
        console.log('❌ Signup confirmation template not found');
        issues.push('Email template file missing');
        fixes.push('Create email template file');
    }

    if (fs.existsSync(passwordResetPath)) {
        console.log('✅ Password reset template exists');
    } else {
        console.log('❌ Password reset template not found');
        issues.push('Password reset template missing');
    }

    // Test 4: Check environment configuration
    console.log('\n4️⃣ Checking environment configuration...');
    console.log('📍 Supabase URL:', SUPABASE_URL);
    console.log('🔑 Anon Key:', SUPABASE_ANON_KEY ? 'Present' : 'Missing');
    console.log('🌐 Site URL:', process.env.VITE_SITE_URL || 'Not set (using default)');

    if (!process.env.VITE_SITE_URL) {
        issues.push('Site URL not configured in environment');
        fixes.push('Set VITE_SITE_URL in user-frontend/.env');
    }

    // Generate diagnostic report
    console.log('\n📋 DIAGNOSTIC SUMMARY');
    console.log('====================');

    if (issues.length === 0) {
        console.log('✅ No critical issues detected');
        console.log('   If users still report email issues, check:');
        console.log('   1. Spam folders');
        console.log('   2. Email provider restrictions');
        console.log('   3. Supabase dashboard logs');
    } else {
        console.log('🚨 Issues detected:');
        issues.forEach((issue, index) => {
            console.log(`   ${index + 1}. ${issue}`);
        });
    }

    if (fixes.length > 0) {
        console.log('\n🔧 REQUIRED FIXES:');
        fixes.forEach((fix, index) => {
            console.log(`   ${index + 1}. ${fix}`);
        });

        console.log('\n📖 DETAILED FIX INSTRUCTIONS:');
        console.log('=============================');

        console.log('\n🔧 SMTP Configuration (CRITICAL):');
        console.log('1. Go to Supabase Dashboard: https://app.supabase.com');
        console.log('2. Navigate to Authentication → Settings → SMTP Settings');
        console.log('3. Enable Custom SMTP and configure:');
        console.log('   - SMTP Host: smtp.gmail.com');
        console.log('   - SMTP Port: 587');
        console.log('   - SMTP User: contactneatrix@gmail.com');
        console.log('   - SMTP Password: [Gmail App Password - see below]');
        console.log('   - Sender Email: contactneatrix@gmail.com');
        console.log('   - Sender Name: Neatrix Professional Cleaning');

        console.log('\n🔑 Gmail App Password Setup:');
        console.log('1. Go to Google Account Settings for contactneatrix@gmail.com');
        console.log('2. Security → 2-Step Verification (enable if not already)');
        console.log('3. Security → App passwords → Generate new');
        console.log('4. Select "Mail" and copy the 16-character password');
        console.log('5. Use this password in Supabase SMTP settings');

        console.log('\n📧 Email Templates:');
        console.log('1. Go to Authentication → Email Templates');
        console.log('2. Update "Confirm signup" template:');
        console.log('   - Subject: Welcome to Neatrix! 🎉 — Confirm your account');
        console.log('   - Body: Copy from user-frontend/src/email-templates/neatrix-signup-confirmation.html');

        console.log('\n🌐 URL Configuration:');
        console.log('1. Go to Authentication → URL Configuration');
        console.log('2. Set Site URL: http://localhost:5173 (development)');
        console.log('3. Add Redirect URLs:');
        console.log('   - http://localhost:5173/email-verification-success');
        console.log('   - http://localhost:5173/auth/callback');

        console.log('\n✅ Enable Email Confirmations:');
        console.log('1. Go to Authentication → Settings → User Management');
        console.log('2. Enable "Enable email confirmations"');
        console.log('3. Enable "Double confirm email changes" (recommended)');
    }

    console.log('\n📞 Support Contacts:');
    console.log('- Email: contactneatrix@gmail.com');
    console.log('- Phone: +2349034842430');
    console.log('- WhatsApp: https://wa.me/2349034842430');

    console.log('\n🧪 After fixing, test with:');
    console.log('node test-email-verification.js');
}

// Run the diagnostic
diagnoseEmailVerification().catch(console.error);