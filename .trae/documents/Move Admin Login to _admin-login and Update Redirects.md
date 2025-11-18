## Goal
Serve the admin login page at `/admin-login` (under router basename `/admin`), and update all redirects and navigations to prevent blank pages.

## Changes
1. Router updates (`admin-dashboard/src/admin-main.tsx`):
   - Change login route path from `/login` to `/admin-login`.
   - Change `/` route to redirect to `/admin-login`.
   - Update all `AuthGuard` `redirectTo` props from `/login` to `/admin-login`.
   - Keep basename `/admin` so full login URL is `/admin/admin-login`.

2. Navigation updates:
   - Change `navigate('/login')` to `navigate('/admin-login')` in `AdminDashboard.tsx` (logout).
   - Grep and update any other `/login` usages inside `admin-dashboard`.

3. Validate
   - Build and preview the admin app.
   - Visit `/admin/admin-login` and check the login renders.
   - Visit any protected route while unauthenticated to confirm redirection to `/admin/admin-login`.

## Rationale
- Aligns the login route to your requested path while keeping the `/admin/(page)` structure intact.
- Prevents blank pages caused by redirects pointing to an old path.