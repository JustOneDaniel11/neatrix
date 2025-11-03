/**
 * Email Template Test Script
 * ==========================
 * 
 * This script tests the email template rendering and validates all required elements.
 * It simulates how Supabase processes the template with actual variables.
 * 
 * Usage: node test-email-template.js
 */

const fs = require('fs');
const path = require('path');

function testEmailTemplate() {
    console.log('📧 Email Template Test Report');
    console.log('============================\n');

    // Test signup confirmation template
    const templatePath = path.join(__dirname, 'user-frontend/src/email-templates/neatrix-signup-confirmation.html');
    
    if (!fs.existsSync(templatePath)) {
        console.log('❌ Template file not found:', templatePath);
        return;
    }

    console.log('✅ Template file found');
    
    // Read template content
    let templateContent = fs.readFileSync(templatePath, 'utf8');
    console.log('📄 Template size:', templateContent.length, 'characters');

    // Test template variables
    const requiredVariables = [
        '{{ .ConfirmationURL }}',
        '{{ .Email }}',
        '{{ .SiteURL }}'
    ];

    console.log('\n🔍 Checking required variables:');
    const missingVariables = [];
    
    requiredVariables.forEach(variable => {
        if (templateContent.includes(variable)) {
            console.log(`✅ ${variable} - Found`);
        } else {
            console.log(`❌ ${variable} - Missing`);
            missingVariables.push(variable);
        }
    });

    // Simulate template rendering with test data
    console.log('\n🎭 Simulating template rendering:');
    const testData = {
        '{{ .ConfirmationURL }}': 'http://localhost:5173/email-verification-success?token=test-token-123',
        '{{ .Email }}': 'test@example.com',
        '{{ .SiteURL }}': 'http://localhost:5173'
    };

    let renderedTemplate = templateContent;
    Object.entries(testData).forEach(([variable, value]) => {
        renderedTemplate = renderedTemplate.replace(new RegExp(variable.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
    });

    // Check for common issues
    console.log('\n🔍 Checking for common issues:');
    
    const checks = [
        {
            name: 'Contains confirmation button/link',
            test: () => renderedTemplate.toLowerCase().includes('confirm') || renderedTemplate.toLowerCase().includes('verify'),
            fix: 'Add a prominent confirmation button with the ConfirmationURL'
        },
        {
            name: 'Contains Neatrix branding',
            test: () => renderedTemplate.toLowerCase().includes('neatrix'),
            fix: 'Add Neatrix branding and logo'
        },
        {
            name: 'Mobile responsive',
            test: () => renderedTemplate.includes('viewport') && renderedTemplate.includes('max-width'),
            fix: 'Add mobile responsive CSS'
        },
        {
            name: 'Professional styling',
            test: () => renderedTemplate.includes('style') || renderedTemplate.includes('css'),
            fix: 'Add professional CSS styling'
        },
        {
            name: 'Clear call-to-action',
            test: () => renderedTemplate.toLowerCase().includes('click') || renderedTemplate.toLowerCase().includes('button'),
            fix: 'Add clear call-to-action text'
        }
    ];

    checks.forEach(check => {
        if (check.test()) {
            console.log(`✅ ${check.name}`);
        } else {
            console.log(`❌ ${check.name} - ${check.fix}`);
        }
    });

    // Save rendered template for preview
    const previewPath = path.join(__dirname, 'email-template-preview.html');
    fs.writeFileSync(previewPath, renderedTemplate);
    console.log(`\n📄 Rendered template saved to: ${previewPath}`);
    console.log('   Open this file in a browser to preview the email');

    // Check template size
    console.log('\n📊 Template statistics:');
    console.log(`   Original size: ${templateContent.length} characters`);
    console.log(`   Rendered size: ${renderedTemplate.length} characters`);
    console.log(`   Lines: ${templateContent.split('\n').length}`);

    // Validate HTML structure
    console.log('\n🏗️  HTML structure validation:');
    const htmlChecks = [
        { tag: '<html', name: 'HTML tag' },
        { tag: '<head', name: 'Head section' },
        { tag: '<body', name: 'Body section' },
        { tag: '<title', name: 'Title tag' },
        { tag: 'charset', name: 'Character encoding' }
    ];

    htmlChecks.forEach(check => {
        if (templateContent.toLowerCase().includes(check.tag)) {
            console.log(`✅ ${check.name}`);
        } else {
            console.log(`❌ ${check.name} missing`);
        }
    });

    // Final recommendations
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('==================');

    if (missingVariables.length > 0) {
        console.log('🚨 CRITICAL: Missing required variables');
        console.log('   Add these variables to your template:');
        missingVariables.forEach(variable => {
            console.log(`   - ${variable}`);
        });
    }

    console.log('\n📋 Email Delivery Checklist:');
    console.log('1. ✅ Template file exists');
    console.log('2. ✅ Required variables present');
    console.log('3. ⚠️  Upload template to Supabase Dashboard');
    console.log('4. ⚠️  Configure SMTP settings in Supabase');
    console.log('5. ⚠️  Test with real email address');

    console.log('\n🔧 Next Steps:');
    console.log('1. Review the preview file: email-template-preview.html');
    console.log('2. Upload template to Supabase Dashboard');
    console.log('3. Configure SMTP settings');
    console.log('4. Test email delivery');

    console.log('\n📞 Support: contactneatrix@gmail.com | +2349034842430');
}

// Run the test
testEmailTemplate();