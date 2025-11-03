import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('🔧 Supabase URL:', supabaseUrl);
console.log('🔧 Anon Key:', supabaseAnonKey ? 'Found' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials!');
  process.exit(1);
}

// Create client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function removeTestOrders() {
  try {
    // First authenticate as admin
    console.log('🔐 Authenticating as admin...');
    const adminEmail = 'contactneatrix@gmail.com';
    const adminPassword = 'RelaxwithDan_11_123456@JustYou';
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (authError) {
      console.error('❌ Admin authentication failed:', authError.message);
      return;
    }

    console.log('✅ Admin authenticated successfully');
    
    // Target tracking codes to remove
    const targetTrackingCodes = ['B47AFB', 'D31D05'];
    
    console.log('🔍 Searching for test orders with tracking codes:', targetTrackingCodes.join(', '));
    
    // Search for orders with these tracking codes
    // The tracking code is typically the last 6 characters of the order ID
    const { data: allOrders, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('❌ Error fetching orders:', fetchError);
      return;
    }

    if (!allOrders || allOrders.length === 0) {
      console.log('📭 No orders found in database');
      return;
    }

    // Find orders with matching tracking codes (last 6 characters of ID)
    const ordersToRemove = allOrders.filter(order => {
      const trackingCode = order.id.slice(-6).toUpperCase();
      return targetTrackingCodes.includes(trackingCode);
    });

    if (ordersToRemove.length === 0) {
      console.log('✅ No orders found with the specified tracking codes');
      console.log('📋 Available tracking codes in database:');
      allOrders.slice(0, 10).forEach(order => {
        const trackingCode = order.id.slice(-6).toUpperCase();
        console.log(`   - ${trackingCode} (${order.customer_name || 'N/A'})`);
      });
      return;
    }

    console.log(`\n🎯 Found ${ordersToRemove.length} orders to remove:`);
    ordersToRemove.forEach(order => {
      const trackingCode = order.id.slice(-6).toUpperCase();
      console.log(`   - Order #${trackingCode}: ${order.customer_name || 'N/A'} (${order.service_name || order.service_type || 'N/A'})`);
    });

    // Remove the orders
    console.log('\n🗑️ Removing test orders...');
    
    for (const order of ordersToRemove) {
      const trackingCode = order.id.slice(-6).toUpperCase();
      console.log(`🗑️ Removing order #${trackingCode}...`);
      
      const { error: deleteError } = await supabase
        .from('bookings')
        .delete()
        .eq('id', order.id);

      if (deleteError) {
        console.error(`❌ Error removing order #${trackingCode}:`, deleteError);
      } else {
        console.log(`✅ Order #${trackingCode} removed successfully`);
      }
    }

    console.log(`\n🎉 Test order removal complete!`);

  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

removeTestOrders();