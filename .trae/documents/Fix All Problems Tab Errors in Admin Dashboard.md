## Goals
Resolve all TypeScript errors shown in the Problems tab, prevent runtime blank screens, and verify the admin routes render inside the Admin Layout without crashes.

## Fix Scope
1. Router/Layout
- Ensure `AdminLayout` is imported in `admin-main.tsx` and used as a parent with `<Outlet />`.
- Keep basename `/admin` and nested child routes as previously added.

2. Context Types (TS2339 property errors)
- Augment `SupabaseDataContext` interfaces to match properties used by AdminDashboard:
  - `User`: add optional `status?: 'active' | 'inactive'`, `customerName?: string`, `customerEmail?: string`, `badge?: string`.
  - `Booking`: already includes many computed fields; verify optional props used by AdminDashboard exist.
  - `Review`: ensure `status?: string` is present.
- Retain index signatures where necessary to avoid TS2339 for legacy fields.

3. AdminDashboard property accesses
- Replace incorrect references (e.g., `user.customerName`) with safe fallbacks (`user.full_name || user.email`).
- Use optional chaining and defaults for optional properties to avoid runtime errors.
- Fix any unintentional comparisons causing union type overlap warnings.

4. Auth Guard
- Confirm it never returns empty fragments when unauthenticated; it must redirect to `/admin-login` (already implemented).

5. Verification
- Run `tsc --noEmit` to clear Problems tab.
- Build and preview; hard-refresh; check browser console for red errors.
- Manually visit all routes:
  - `/admin/overview`, `/admin/bookings`, `/admin/users`, `/admin/posts`, `/admin/live-chat`, `/admin/notifications`, `/admin/payments`, `/admin/subscriptions`, `/admin/laundry-orders`, `/admin/order-tracking`, `/admin/pickup-delivery`, `/admin/reviews-feedback`.
- Confirm layout header and page content render without blank screens.

6. Production
- Ensure hosting rewrites route `/admin/(.*)` to the admin SPA entry to avoid 404s.

## Deliverables
- Updated types and AdminDashboard fixes to eliminate TS2339 errors.
- Confirmed layout rendering with nested routes and no runtime crashes.
- Clean TypeScript check and working preview for all admin pages.