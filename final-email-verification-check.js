/**
 * Final Email Verification System Check
 * ====================================
 * 
 * This script performs a comprehensive final check of the email verification system
 * to ensure everything is properly configured and ready for production.
 * 
 * Usage: node final-email-verification-check.js
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

async function performFinalCheck() {
    console.log('🔍 Final Email Verification System Check');
    console.log('========================================\n');

    const results = {
        passed: 0,
        failed: 0,
        warnings: 0,
        issues: []
    };

    // Test 1: Environment Configuration
    console.log('1️⃣ Environment Configuration');
    console.log('----------------------------');
    
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        console.log('✅ Supabase credentials configured');
        results.passed++;
    } else {
        console.log('❌ Missing Supabase credentials');
        results.failed++;
        results.issues.push('Configure SUPABASE_URL and SUPABASE_ANON_KEY in .env');
    }

    if (process.env.VITE_SITE_URL) {
        console.log('✅ Site URL configured:', process.env.VITE_SITE_URL);
        results.passed++;
    } else {
        console.log('⚠️  Site URL not set (using default)');
        results.warnings++;
    }

    // Test 2: Email Template Files
    console.log('\n2️⃣ Email Template Files');
    console.log('-----------------------');
    
    const templateFiles = [
        'user-frontend/src/email-templates/neatrix-signup-confirmation.html',
        'user-frontend/src/email-templates/neatrix-password-reset.html'
    ];

    templateFiles.forEach(templatePath => {
        const fullPath = path.join(__dirname, templatePath);
        if (fs.existsSync(fullPath)) {
            console.log('✅', path.basename(templatePath), 'exists');
            
            const content = fs.readFileSync(fullPath, 'utf8');
            const requiredVars = ['{{ .ConfirmationURL }}', '{{ .Email }}', '{{ .SiteURL }}'];
            const missingVars = requiredVars.filter(v => !content.includes(v));
            
            if (missingVars.length === 0) {
                console.log('   ✅ All required variables present');
                results.passed++;
            } else {
                console.log('   ❌ Missing variables:', missingVars.join(', '));
                results.failed++;
                results.issues.push(`Add missing variables to ${path.basename(templatePath)}`);
            }
        } else {
            console.log('❌', path.basename(templatePath), 'not found');
            results.failed++;
            results.issues.push(`Create ${templatePath}`);
        }
    });

    // Test 3: Frontend Routes
    console.log('\n3️⃣ Frontend Routes');
    console.log('------------------');
    
    const routeFiles = [
        'user-frontend/src/pages/EmailVerificationSuccessPage.tsx',
        'user-frontend/src/App.tsx'
    ];

    routeFiles.forEach(routePath => {
        const fullPath = path.join(__dirname, routePath);
        if (fs.existsSync(fullPath)) {
            console.log('✅', path.basename(routePath), 'exists');
            
            if (routePath.includes('App.tsx')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                if (content.includes('/email-verification-success')) {
                    console.log('   ✅ Email verification route configured');
                    results.passed++;
                } else {
                    console.log('   ❌ Email verification route missing');
                    results.failed++;
                    results.issues.push('Add email verification route to App.tsx');
                }
            } else {
                results.passed++;
            }
        } else {
            console.log('❌', path.basename(routePath), 'not found');
            results.failed++;
            results.issues.push(`Create ${routePath}`);
        }
    });

    // Test 4: Supabase Connection
    console.log('\n4️⃣ Supabase Connection');
    console.log('----------------------');
    
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
        try {
            const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            const { data, error } = await supabase.from('services').select('count').limit(1);
            
            if (error) {
                console.log('❌ Connection failed:', error.message);
                results.failed++;
                results.issues.push('Fix Supabase connection');
            } else {
                console.log('✅ Supabase connection successful');
                results.passed++;
            }
        } catch (err) {
            console.log('❌ Connection error:', err.message);
            results.failed++;
            results.issues.push('Fix Supabase connection error');
        }
    } else {
        console.log('❌ Cannot test connection - missing credentials');
        results.failed++;
    }

    // Test 5: Generated Files
    console.log('\n5️⃣ Generated Configuration Files');
    console.log('--------------------------------');
    
    const generatedFiles = [
        'EMAIL-VERIFICATION-SOLUTION.md',
        'deploy-email-config.js',
        'diagnose-email-verification.js',
        'test-email-template.js',
        'supabase-email-template.html'
    ];

    generatedFiles.forEach(fileName => {
        const fullPath = path.join(__dirname, fileName);
        if (fs.existsSync(fullPath)) {
            console.log('✅', fileName, 'ready');
            results.passed++;
        } else {
            console.log('⚠️ ', fileName, 'not found');
            results.warnings++;
        }
    });

    // Generate Final Report
    console.log('\n📊 FINAL SYSTEM STATUS');
    console.log('======================');
    
    const total = results.passed + results.failed + results.warnings;
    const passRate = ((results.passed / total) * 100).toFixed(1);
    
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`⚠️  Warnings: ${results.warnings}`);
    console.log(`📈 Pass Rate: ${passRate}%\n`);

    if (results.failed === 0) {
        console.log('🎉 SYSTEM READY FOR DEPLOYMENT!');
        console.log('================================');
        console.log('✅ All critical components are properly configured');
        console.log('✅ Email templates contain all required variables');
        console.log('✅ Frontend routes are set up correctly');
        console.log('✅ Supabase connection is working');
        console.log('✅ Configuration files are ready\n');
        
        console.log('🚀 NEXT STEPS:');
        console.log('1. Follow the instructions in EMAIL-VERIFICATION-SOLUTION.md');
        console.log('2. Configure SMTP settings in Supabase Dashboard');
        console.log('3. Upload email template to Supabase');
        console.log('4. Enable email confirmations');
        console.log('5. Test with real email addresses\n');
    } else {
        console.log('🚨 ISSUES DETECTED');
        console.log('==================');
        console.log('The following issues need to be resolved:\n');
        
        results.issues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue}`);
        });
        
        console.log('\n🔧 Fix these issues before deployment.');
    }

    console.log('📋 DEPLOYMENT CHECKLIST');
    console.log('=======================');
    console.log('□ Configure SMTP in Supabase Dashboard');
    console.log('□ Generate Gmail App Password');
    console.log('□ Upload email template to Supabase');
    console.log('□ Set redirect URLs in Supabase');
    console.log('□ Enable email confirmations');
    console.log('□ Test email delivery');
    console.log('□ Verify confirmation flow\n');

    console.log('📞 SUPPORT');
    console.log('==========');
    console.log('Email: contactneatrix@gmail.com');
    console.log('Phone: +2349034842430');
    console.log('WhatsApp: https://wa.me/2349034842430');

    return results.failed === 0;
}

// Run the final check
performFinalCheck()
    .then(success => {
        if (success) {
            console.log('\n🎯 System is ready for email verification deployment!');
            process.exit(0);
        } else {
            console.log('\n⚠️  Please fix the issues above before deployment.');
            process.exit(1);
        }
    })
    .catch(console.error);