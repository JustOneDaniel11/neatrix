import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key present:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔍 Testing basic connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('bookings').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection error:', error.message);
      console.log('\n🔧 This is likely an RLS (Row Level Security) issue.');
      console.log('\n📝 To fix this, run this SQL in your Supabase dashboard:');
      console.log(`
-- Allow anonymous read access to bookings
CREATE POLICY "Allow anonymous read access" ON bookings
  FOR SELECT USING (true);

-- Allow anonymous update access to bookings  
CREATE POLICY "Allow anonymous update access" ON bookings
  FOR UPDATE USING (true);

-- Allow anonymous insert access to bookings
CREATE POLICY "Allow anonymous insert access" ON bookings
  FOR INSERT WITH CHECK (true);
      `);
    } else {
      console.log('✅ Connection successful!');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

testConnection().then(() => {
  console.log('\n🏁 Test complete');
  process.exit(0);
});