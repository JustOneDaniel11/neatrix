## Immediate Diagnostics
1. Open the browser console on an admin route and list all red errors (component crashes, undefined variables, missing imports, hook violations).
2. Confirm providers mount without throwing: `DarkModeProvider`, `SupabaseDataProvider`, `AdminProvider`.
3. Validate that the auth guard does not render an empty fragment when unauthenticated and performs a redirect to `/admin-login`.

## Admin Layout (React Router)
1. Ensure the Admin Layout component exists and returns valid JSX.
2. Verify the layout includes `<Outlet />` so child routes render inside the layout.
3. Confirm common UI (header/sidebar) renders above `<Outlet />` and cannot throw due to undefined `state` (use defensive checks).

Example structure:
```
<div className="admin-container">
  <AdminSidebar />
  <main>
    <Outlet />
  </main>
</div>
```

## Router Refactor to Nested /admin Routes
1. Keep router `basename="/admin"`.
2. Wrap all protected admin routes under a parent route:
   - Parent element: `<AuthGuard redirectTo="/admin-login"><AdminLayout /></AuthGuard>`
   - Child routes (exact list):
     - `/overview`
     - `/bookings`
     - `/users`
     - `/posts`
     - `/live-chat`
     - `/notifications`
     - `/payments`
     - `/subscriptions`
     - `/laundry-orders`
     - `/order-tracking`
     - `/pickup-delivery`
     - `/reviews-feedback`
3. Keep `/admin-login` outside the guarded layout and redirect unauthenticated users there.

## Auth Guard Behavior
1. Unauthenticated → return `<Navigate to="/admin-login" replace />`.
2. Authenticated → render layout + page content (do not return empty fragment).
3. While initializing → show loader (never blank).

## Page Components & Imports
1. Ensure each route points to a real component that renders without throwing.
2. Fix import paths, casing, and remove any invalid icon/component imports.
3. Resolve circular imports if present.

## Tab Mapping (AdminDashboard)
1. Ensure `PATH_TO_TAB` maps all aliases to existing tab keys:
   - `/live-chat` → `livechat`
   - `/laundry-orders` → `laundry`
   - `/order-tracking` → `tracking`
   - `/pickup-delivery` → `delivery`
   - `/reviews-feedback` → `reviews`
2. Normalize tab detection by stripping `/admin` from `location.pathname` before mapping.

## Hosting & 404 Fix on neatrix.site
1. Add hosting rewrites so `/admin/*` routes do not 404 server-side:
   - Example (Vercel) rewrite: `{ "source": "/admin/(.*)", "destination": "/admin.html" }`.
2. Confirm production build uses the `/admin` basename and rewrites route all admin paths to the SPA entry.

## Verification
1. Rebuild locally and preview.
2. Visit each admin route manually:
   - `/admin/overview`, `/admin/bookings`, `/admin/users`, `/admin/posts`, `/admin/live-chat`, `/admin/notifications`, `/admin/payments`, `/admin/subscriptions`, `/admin/laundry-orders`, `/admin/order-tracking`, `/admin/pickup-delivery`, `/admin/reviews-feedback`.
3. Confirm layout (header/sidebar) and page body render; no blank screens.
4. Check the browser console for zero red errors and fix any warnings where actionable.
5. Validate `/admin-login` renders and successful login redirects to `/admin/overview`.

## Deliverables
- Working Admin Layout with `<Outlet />`.
- Nested router structure under `/admin` covering the full route list.
- Auth guard redirecting correctly without rendering empty fragments.
- Verified page components render fully with no runtime errors.
- Hosting rewrites in place so `https://neatrix.site/admin/<page-name>` never 404s or blank-renders.