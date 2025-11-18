## Overview
We will stabilize the admin dashboard rendering by finalizing the layout/route nesting, aligning types used by AdminDashboard with the context, hardening component property access, and validating builds and previews. We'll also confirm hosting rewrites for production `/admin/*` paths.

## Implementation Steps
1. Import and Wire AdminLayout
- Import `AdminLayout` in `admin-dashboard/src/admin-main.tsx`.
- Wrap all protected admin routes with `<AuthGuard redirectTo="/admin-login"><AdminLayout /></AuthGuard>` and ensure `<Outlet />` is present in `AdminLayout`.

2. Route Coverage
- Keep `basename="/admin"` and define child routes for:
  - `/overview`, `/bookings`, `/users`, `/posts`, `/live-chat`, `/notifications`, `/payments`, `/subscriptions`, `/laundry-orders`, `/order-tracking`, `/pickup-delivery`, `/reviews-feedback`.
- Ensure `/admin-login` remains unprotected and successful login redirects to `/admin/overview`.

3. Context Type Augmentations
- In `SupabaseDataContext.tsx`:
  - Extend `User` with `status?: 'active' | 'inactive'`, `customerName?: string`, `customerEmail?: string`, `badge?: string`.
  - Confirm `Review` has `status?: string`.
  - Retain `Booking` index signature; ensure optional computed fields referenced in AdminDashboard exist.

4. Safe Property Access in AdminDashboard
- Replace risky reads with safe fallbacks (e.g., `user.full_name || user.email`).
- Use optional chaining (`?.`) and default values to avoid runtime exceptions.
- Fix any unintentional comparisons that cause type warnings.

5. Auth Guard Behavior
- Confirm unauthenticated users redirect to `/admin-login` and the guard never returns empty fragments; authenticated users render layout + content; show loader while initializing.

6. Tooling & Validation
- Run `npm run type-check` and `npm run lint`; fix remaining errors.
- `vite build` and `vite preview`; hard-refresh.
- Manually verify all admin routes render within layout and no blank screens occur.
- Check browser console and resolve any red errors.

7. Production Rewrites
- Ensure hosting rewrites route `/admin/(.*)` to `admin.html` so `/admin/<page>` paths do not 404 in production.

## Deliverables
- Admin dashboard renders consistently under `/admin/*` with layout and content.
- Clean TypeScript and lint passes; no runtime errors.
- Verified production routing for admin pages.