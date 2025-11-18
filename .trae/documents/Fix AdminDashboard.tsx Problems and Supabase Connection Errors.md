## Goals
1. Resolve the 22 Problems reported in `admin-dashboard/src/pages/AdminDashboard.tsx` (types, hooks, and handler signatures).
2. Eliminate runtime auth/network errors (`ERR_CONNECTION_REFUSED` and `TypeError: Failed to fetch`) by guarding Supabase calls when env is missing/misconfigured.

## Root Causes Identified
- Supabase client attempts auth with invalid URL (`http://localhost/auth/v1/token`) when env vars are missing or overridden; this causes `ERR_CONNECTION_REFUSED`.
- `AdminDashboard.tsx` has lax typing (`any`) and hook dependency warnings that show up as Problems.
- Data-fetch effects run based only on `state.isAuthenticated`; but when Supabase is not configured, fetches may still be attempted by contexts.

## Implementation Plan
1. Supabase guards in AdminDashboard:
   - Import `isSupabaseConfigured` from `admin-dashboard/src/lib/supabase`.
   - Add a `const supabaseReady = isSupabaseConfigured && state.isAuthenticated` and gate all data-fetching `useEffect`s and background loaders on `supabaseReady`.
   - Add a lightweight UI banner in the dashboard header when `!isSupabaseConfigured`, indicating missing `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` (visible only in development), and prevent auth/data calls.
2. Type fixes in AdminDashboard:
   - Replace `any` usages with concrete interfaces for `Post`, `Review`, `SupportTicket`, `ContactMessage` based on fields used in the file.
   - Update state hooks: `editingPost: Post | null`, `selectedReview: Review | null`, `selectedTicket: SupportTicket | null`, `selectedContactMessage: ContactMessage | null`, etc.
   - Strongly type handler parameters like `handleContactMessageClick(message: ContactMessage)` and `handleDeleteContactMessage(message: ContactMessage)`.
3. Hook dependency refinements:
   - For the overview/tab loader `useEffect`, keep intentional exclusions but convert fetch function references into stable wrappers inside the component using `useCallback` to silence dependency warnings without changing behavior.
   - For first critical-data `useEffect`, depend on `supabaseReady` instead of `state.isAuthenticated` and keep fetch functions out of deps (use internal async function).
4. Minor cleanups:
   - Ensure `realTimeConnected` remains boolean across components.
   - Normalize log messages and remove redundant ones.
5. Verification:
   - Run `npm run type-check` and `npm run lint` for admin to ensure Problems tab clears.
   - Build admin and run preview to confirm no `ERR_CONNECTION_REFUSED` or `Failed to fetch` logs in the console (when env is missing, see guard banner instead).

## Deliverables
- Updated `AdminDashboard.tsx` with proper types, guarded effects, and refined hook deps.
- No runtime auth/network errors triggered by misconfiguration; clear Problems tab for the file (warnings minimized).