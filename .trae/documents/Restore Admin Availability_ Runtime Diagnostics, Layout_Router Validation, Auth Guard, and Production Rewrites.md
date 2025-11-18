## Immediate Checks
1. Open browser console on an admin route and capture all red errors (component crashes, undefined variables, missing imports, hook violations). Fix each to eliminate exceptions during render.
2. Verify providers mount: `DarkModeProvider`, `SupabaseDataProvider`, `AdminProvider`.
3. Confirm Supabase env variables are present in production; ping `/rest/v1` and `/auth/v1/token` to ensure project isn’t paused.

## Layout & Router
1. Admin Layout: ensure it returns valid JSX and includes `<Outlet />`. Header/sidebar must not throw if `state` is undefined; guard with optional chaining.
2. Nested routing: parent route element is `<AuthGuard><AdminLayout /></AuthGuard>`; child routes exactly:
   - `/admin/overview`, `/admin/bookings`, `/admin/users`, `/admin/posts`, `/admin/live-chat`, `/admin/notifications`, `/admin/payments`, `/admin/subscriptions`, `/admin/laundry-orders`, `/admin/order-tracking`, `/admin/pickup-delivery`, `/admin/reviews-feedback`.
3. Admin login remains `/admin/admin-login`; successful login redirects to `/admin/overview`.

## Auth Guard Behavior
1. Not authenticated → `<Navigate to="/admin-login" replace />`.
2. Authenticated → render layout + page content; never return empty fragments.
3. While initializing → show a loader component instead of blank.

## Component Imports & Tab Mapping
1. Validate each route points to a real component and renders without throwing.
2. Ensure `PATH_TO_TAB` maps all aliases (live-chat, laundry-orders, order-tracking, pickup-delivery, reviews-feedback) and strip `/admin` from path before mapping.

## Production Hosting
1. Fix 404s for admin paths on `https://neatrix.site` by adding rewrites so `/admin/(.*)` serves the admin SPA entry (admin.html). If the user and admin are separate Vercel projects, configure domain and rewrites appropriately or move admin under a subdomain.
2. Rebuild and redeploy; hard-refresh and verify.

## Deliverables
- All admin routes render layout + content without blank screens.
- Zero red errors in browser console.
- Admin login works and redirects correctly.
- Admin pages accessible under `https://neatrix.site/admin/<page-name>` via proper rewrites.