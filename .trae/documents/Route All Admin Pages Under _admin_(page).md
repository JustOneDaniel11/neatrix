## Goal
Make every admin page accessible under `/admin/(page)` while keeping internal navigation consistent and predictable.

## Approach
1. Set Router basename to `/admin` in `admin-dashboard/src/admin-main.tsx`:
   - Change `<Router>` to `<Router basename="/admin">` so paths like `/overview` resolve to `/admin/overview` in the browser.
   - Keep existing route path definitions (`/overview`, `/users`, etc.). With basename, they map under `/admin` automatically.
   - Keep `AuthGuard redirectTo="/login"` — it becomes `/admin/login`.
   - The `/` route continues to render the login page at `/admin/`.

2. Normalize tab routing inside `AdminDashboard`:
   - Update the logic that maps `location.pathname` to tabs to be basename-aware: parse `location.pathname.replace(/^\/admin/, '')` before matching.
   - Keep `TAB_ROUTES` using unprefixed paths (`/overview`, `/users`, etc.) so `navigate('/users')` becomes `/admin/users` under the basename.

3. Review hard-coded `/admin/...` links:
   - Notifications and context actions already use `/admin/...`; these continue to work even with the basename set (absolute paths remain correct).
   - For consistency, future refactor can convert them to unprefixed paths, but not required for correctness.

4. Verify behavior:
   - Build and preview the admin app; confirm all pages load under `/admin/*` (e.g., `/admin/login`, `/admin/overview`, `/admin/users`).
   - Test internal navigation (menu/tab changes, redirects) to ensure URLs reflect the `/admin` prefix.

## Files To Change
- `admin-dashboard/src/admin-main.tsx`: set `<Router basename="/admin">`.
- `admin-dashboard/src/pages/AdminDashboard.tsx`: adjust PATH_TO_TAB parsing to strip `/admin` before mapping.

## Validation
- Navigating to `/admin/login` shows the login page.
- Navigating to `/admin/overview`, `/admin/users`, `/admin/laundry`, etc. renders the dashboard.
- Programmatic `navigate('/livechat')` yields `/admin/livechat` with basename.

## Notes
- No need to change Vite config or HTML files; React Router basename handles the prefix.
- We will not alter existing absolute `/admin/...` URLs in notifications during this pass; they remain valid.