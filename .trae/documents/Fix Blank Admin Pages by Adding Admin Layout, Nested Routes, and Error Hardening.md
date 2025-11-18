## Diagnosis Steps
1. Check browser console for red errors (undefined variables, missing imports, hook violations, context failures).
2. Verify providers mount correctly (`DarkModeProvider`, `SupabaseDataProvider`, `AdminProvider`).
3. Confirm auth guard does not return an empty fragment when unauthenticated; it should redirect to `/admin-login`.

## Structural Fix: Admin Layout + Nested Routes
1. Create `src/components/AdminLayout.tsx`:
   - Render shared UI: header (status, actions), optional sidebar placeholder.
   - Include `<Outlet />` to render page bodies inside the layout.
2. Update router (`src/admin-main.tsx`) to nested structure under basename `/admin`:
   - Parent route: `element={<AuthGuard><AdminLayout /></AuthGuard>}`.
   - Child routes for all required pages:
     - `/overview`, `/bookings`, `/users`, `/posts`, `/live-chat`, `/notifications`, `/payments`, `/subscriptions`, `/laundry-orders`, `/order-tracking`, `/pickup-delivery`, `/reviews-feedback`.
   - Keep `/admin-login` outside the guarded layout.
3. Page components:
   - Use existing AdminDashboard to render content by tab (it already maps path → tab). Child routes can point to `AdminDashboard` and let it resolve the tab.
   - Alternatively, create small wrapper components if needed (but not required since path mapping in `AdminDashboard` is implemented).

## Routing Alignment
1. Ensure AdminDashboard `PATH_TO_TAB` includes all aliases:
   - `/live-chat`, `/laundry-orders`, `/order-tracking`, `/pickup-delivery`, `/reviews-feedback`.
2. Normalize tab detection:
   - Strip `/admin` basename before mapping.
3. Redirects:
   - `/admin-login` → after successful login, navigate to `/overview` (already aligned).

## Error Hardening
1. Wrap risky render blocks in `AdminDashboard` with safe guards (check for `state` arrays before mapping, optional chaining on possibly undefined entries).
2. Ensure all imports exist and are correctly cased; remove any invalid icon imports.
3. Validate contexts provide default non-null values where required.

## Verification
1. Build and run preview.
2. Manually load each route:
   - `/admin/overview`, `/admin/bookings`, `/admin/users`, `/admin/posts`, `/admin/live-chat`, `/admin/notifications`, `/admin/payments`, `/admin/subscriptions`, `/admin/laundry-orders`, `/admin/order-tracking`, `/admin/pickup-delivery`, `/admin/reviews-feedback`.
3. Confirm layout (header/optional sidebar) is visible and page body renders; no blank screens.
4. Confirm `/admin/admin-login` renders; login redirects to `/admin/overview`.
5. Fix any console warnings/errors that appear.

## Deliverables
- New `AdminLayout` component with `<Outlet />`.
- Updated router using nested routes with `/admin` basename.
- Ensured all required routes render inside the layout without blank screens.
- Verified auth guard redirects properly and does not return an empty fragment.
