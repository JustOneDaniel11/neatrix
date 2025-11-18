## Goal
Identify and resolve all compile, type, and lint problems across `admin-dashboard`, `user-frontend`, and `shared`, then verify with builds and a local preview.

## Audit & Diagnostics
1. Run TypeScript checks: `tsc --noEmit` in `admin-dashboard`, `user-frontend`, and `shared`.
2. Run ESLint: `eslint .` in `admin-dashboard` and `user-frontend` using existing configs.
3. Build both frontends: `vite build` to surface any runtime/rollup issues.
4. Use the IDE Problems view to confirm post-fix status is clean.

## Known Issues To Fix First
- Incorrect icon import in admin notifications:
  - `admin-dashboard/src/components/NotificationsPage.tsx:18` imports `MarkAsRead` from `lucide-react`, which is not exported by the library. Remove or replace with a valid icon (e.g., `CheckCheck`).
- Type package mismatch in admin:
  - `admin-dashboard/package.json:42` includes `@types/react-router-dom@^5.3.3` while `react-router-dom@^6.30.2` already ships its own types. Remove `@types/react-router-dom` to avoid conflicts.
- Missing dev scripts in admin:
  - Add `lint` and `type-check` scripts mirroring `user-frontend` to standardize maintenance.
- Unused/broken imports and minor type strictness issues:
  - Clean up unused imports reported by ESLint.
  - Normalize props where necessary (e.g., ensure `realTimeConnected` is boolean across usages like `admin-dashboard/src/pages/AdminDashboard.tsx:2466` and `admin-dashboard/src/components/NotificationsPage.tsx:192`).

## Implementation Steps
1. Fix `NotificationsPage.tsx` icon import:
   - Remove `MarkAsRead` import and adjust any usage to an existing icon (`CheckCheck` or `CheckCircle`).
2. Remove `@types/react-router-dom` from `admin-dashboard/package.json` and reinstall to ensure TypeScript resolves v6 types.
3. Add `"lint": "eslint ."` and `"type-check": "tsc --noEmit"` scripts to `admin-dashboard/package.json` for parity.
4. Run `type-check` and `lint` in both apps; address all reported errors:
   - Fix type errors in contexts, pages, and components (e.g., mismatched prop types, missing generics, optional chaining where needed).
   - Remove or correct any invalid imports flagged by the bundler.
5. Build both projects to ensure no bundler errors.
6. Launch previews and perform smoke tests:
   - Navigate through dashboard tabs (overview, notifications, livechat, laundry) and user dashboard to confirm no runtime exceptions.

## Validation
- Problems tab shows 0 errors and 0 warnings for the edited projects.
- `tsc --noEmit` passes in `admin-dashboard`, `user-frontend`, and `shared`.
- `eslint .` passes with no errors; warnings acceptable if stylistic.
- `vite build` succeeds in both projects.

## Risk Management
- Dependency change limited to removing an incompatible type package; rollback by re-adding if needed.
- Icon replacement uses existing library exports to avoid future breakage.

## Deliverables
- Clean Problems tab across the workspace.
- Updated `admin-dashboard` scripts and fixed icon import.
- Verified builds and working local previews.