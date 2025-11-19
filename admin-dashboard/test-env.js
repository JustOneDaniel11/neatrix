// Test script to check environment variables in production
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built JavaScript file
const jsPath = path.join(__dirname, 'dist', 'assets', 'admin-main-*.js');
const jsFiles = fs.readdirSync(path.join(__dirname, 'dist', 'assets')).filter(f => f.startsWith('admin-main-') && f.endsWith('.js'));

if (jsFiles.length > 0) {
  const jsContent = fs.readFileSync(path.join(__dirname, 'dist', 'assets', jsFiles[0]), 'utf8');
  
  // Check for environment variable usage
  const envPatterns = [
    /VITE_SUPABASE_URL/,
    /VITE_SUPABASE_ANON_KEY/,
    /import\.meta\.env/,
    /process\.env/
  ];
  
  console.log('Checking built JavaScript for environment variable patterns:');
  envPatterns.forEach(pattern => {
    const matches = jsContent.match(pattern);
    if (matches) {
      console.log(`Found pattern: ${pattern.source} - ${matches.length} occurrences`);
    } else {
      console.log(`Pattern not found: ${pattern.source}`);
    }
  });
  
  // Check if the environment variables are properly injected
  if (jsContent.includes('import.meta.env')) {
    console.log('\nimport.meta.env usage detected in built code');
    // Look for specific environment variable patterns
    const envVars = jsContent.match(/import\.meta\.env\.([A-Z_]+)/g);
    if (envVars) {
      console.log('Found environment variable references:', envVars);
    }
  }
  
} else {
  console.log('No built JavaScript files found');
}