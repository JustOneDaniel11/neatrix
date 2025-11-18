## Changes To Apply
1. Admin Layout Integration
- Import `AdminLayout` in `admin-dashboard/src/admin-main.tsx`.
- Wrap all protected admin routes with parent: `<AuthGuard redirectTo="/admin-login"><AdminLayout /></AuthGuard>`.
- Keep router `basename="/admin"` and child routes as exact paths:
  - `/overview`, `/bookings`, `/users`, `/posts`, `/live-chat`, `/notifications`, `/payments`, `/subscriptions`, `/laundry-orders`, `/order-tracking`, `/pickup-delivery`, `/reviews-feedback`.

2. SupabaseDataContext Type Augmentations
- In `admin-dashboard/src/contexts/SupabaseDataContext.tsx`:
  - Extend `User` with optional fields used by UI:
    - `status?: 'active' | 'inactive'`
    - `customerName?: string`
    - `customerEmail?: string`
    - `badge?: string`
  - Confirm `Review` already includes `status?: string` (present).
  - Keep `Booking` index signature and computed optional fields; ensure properties referenced in the UI exist as optional.

3. AdminDashboard Safe Accesses
- Replace risky property reads with safe fallbacks and optional chaining to avoid runtime exceptions:
  - Use `user.full_name || user.email` instead of `user.customerName` when rendering names.
  - Guard optional properties with `?.` and default values.
- Ensure no unintentional comparisons that cause type narrowing warnings.

4. Auth Guard Behavior
- Confirm unauthenticated users are redirected to `/admin-login` and the guard never returns an empty fragment.
- Authenticated users render layout + page content.

5. Tooling & Verification
- Run TypeScript checks: `npm run type-check`.
- Run lint: `npm run lint` and fix any remaining errors.
- Build and preview: `vite build` + `vite preview`.
- Manually verify each admin route renders inside the layout without blank screens.
- Check browser console for red errors and fix them.

6. Hosting Rewrites (Production)
- Ensure admin project routes `/admin/(.*)` to the SPA entry (`admin.html`).
- If admin is under the same domain as user site, configure top-level rewrites so `/admin/*` requests are served by the admin build (or assign `admin.neatrix.site`).

## Outcome
- All Problems tab TS errors resolved.
- No runtime crashes; layout renders header/body with `<Outlet />`.
- Every `/admin/<page>` path renders correctly.
- Production `/admin/*` paths do not 404 and serve the admin SPA.