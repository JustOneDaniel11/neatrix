## Goal
Ensure every route used by admin UI and notifications resolves to a valid dashboard tab under `/admin/*`, eliminating blank pages.

## Changes
1. Add alias routes in `admin-dashboard/src/admin-main.tsx`:
   - `/orders` → `AdminDashboard`
   - `/customers` → `AdminDashboard`
   - `/contact-message` → `AdminDashboard`
   - Keep existing routes (e.g., `/bookings`, `/users`, `/notifications`). Basename `/admin` already set.

2. Update `PATH_TO_TAB` in `AdminDashboard.tsx` to map:
   - `/orders` → `bookings`
   - `/customers` → `users`
   - `/contact-message` → `notifications`
   - Keep existing mappings.
   - Continue stripping `/admin` prefix when determining active tab.

3. Verify
   - Build and preview the admin app, test navigation to `/admin/orders`, `/admin/customers`, `/admin/contact-message` and check correct tabs render.

## Rationale
- Notifications and realtime actions produce `action_url` entries like `/admin/orders`, `/admin/customers`, `/admin/contact-message`. Without alias routes, they would navigate to undefined paths and render nothing.
- Aliasing to existing dashboard tabs ensures UI continuity without refactoring components.

## Validation
- Confirm no route renders blank.
- Confirm tab state syncs correctly when visiting aliased paths.