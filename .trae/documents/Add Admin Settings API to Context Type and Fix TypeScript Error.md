## Fix
1. Update `SupabaseDataContextType` to include:
   - `fetchAdminSettings: () => Promise<void>`
   - `updateAdminSettings: (updates: Partial<AdminSettings>) => Promise<void>`
2. Keep value object as-is (already exports these functions).
3. Re-run type-check to confirm the error disappears.

## Verification
- `tsc --noEmit` passes in `admin-dashboard`.
- AdminDashboard compiles where it destructures `fetchAdminSettings` and `updateAdminSettings`.
- Settings inputs (e.g., `serviceRadiusMiles`) are correctly typed and update without errors.