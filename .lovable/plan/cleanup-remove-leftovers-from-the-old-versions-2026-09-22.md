# Cleanup: remove leftovers from the old versions

The app is now the one-button "boringg" toy. The Malaysian food clicker and the earlier boredom-tracker ideas were never built into the current code — but leftover files from those phases are still sitting in the project. This cleans them out without touching how the app looks or behaves.

## What gets removed

1. **Old backend leftovers** — the project still carries database connection code and a generated type file describing the old "boredom pixels" and "boredom stats" tables. Nothing in the app uses them. Removing them also drops the unused database library from the dependency list, so the app loads a bit leaner.
2. **Stale config file** — a leftover Tailwind colour dump (`src/tailwind.config.lov.json`) that nothing reads.
3. **Old plan file** — the Malaysian food character plan left in `.lovable/plan.md`, which no longer describes the project.
4. **README touch-up** — a short pass so the description matches what the app actually is today, with no references to removed features.

## What stays exactly as is

- The button, the 3D toy, the growth and squeak behaviour, sounds, styling and copy: untouched.
- The favicon and page title/description: untouched.
- The existing tests: untouched, and they must still pass.

## Technical notes

- Delete `src/integrations/supabase/` (client, preview auth storage, generated `types.ts`) and `supabase/config.toml`; remove the now-unused `@supabase/supabase-js` package.
- Delete `src/tailwind.config.lov.json`.
- Verify with `rg` that nothing imports the removed paths, then run `npm run check` (types, lint, tests, build) to confirm the app is unchanged and green.
- Note: removing the backend files means the project no longer has a connected database. Nothing in the app currently uses one, so there is no functional loss — if a future feature needs saved data, it can be re-added then.
