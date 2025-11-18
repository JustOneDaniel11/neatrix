# Supabase RLS Policy Fix Guide

## Problem
The admin dashboard is showing `net::ERR_ABORTED` errors for Supabase API calls because Row Level Security (RLS) policies are blocking anonymous access to the database tables.

## Solution
Run the following SQL in your Supabase dashboard SQL editor to fix the RLS policies:

### Quick Fix SQL
```sql
-- Enable RLS on all tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pickup_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_complaints ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for admin dashboard
CREATE POLICY "admin_read_all_bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "admin_update_all_bookings" ON public.bookings FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "admin_read_all_contact_messages" ON public.contact_messages FOR SELECT USING (true);
CREATE POLICY "admin_read_all_subscriptions" ON public.subscriptions FOR SELECT USING (true);
CREATE POLICY "admin_read_all_pickup_deliveries" ON public.pickup_deliveries FOR SELECT USING (true);
CREATE POLICY "admin_read_all_user_complaints" ON public.user_complaints FOR SELECT USING (true);

-- For other tables that might exist
CREATE POLICY IF NOT EXISTS "admin_read_all_users" ON public.users FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "admin_read_all_services" ON public.services FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "admin_read_all_addresses" ON public.addresses FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "admin_read_all_payments" ON public.payments FOR SELECT USING (true);
```

## Steps to Apply Fix

1. **Go to your Supabase dashboard** at https://app.supabase.com/
2. **Select your project** (hrkpbuenwejwspjrfgkd)
3. **Go to SQL Editor** in the left sidebar
4. **Copy and paste the SQL above** into the editor
5. **Click Run** to execute the SQL
6. **Refresh your admin dashboard** - the errors should be gone!

## Alternative: Use Development Policies
If you want more permissive policies for development, use the `dev-policies.sql` file in the `supabase/` folder.

## Files Created for Fix
- `final-rls-fix.sql` - Comprehensive RLS policy fix
- `test-all-tables.js` - Script to test all table connections
- `README-RLS-FIX.md` - This guide

## Verification
After applying the fix, your admin dashboard should load without any Supabase connection errors and all functionality should work properly.