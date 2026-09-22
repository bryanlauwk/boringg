# Malaysian Food Characters for Clicker Lab

Add a set of Malaysian food clicker characters, in the spirit of the Wai Company kaya toast set: chunky, cute, collectible desk toys with faces.

## What gets added

A new first step in the control panel: **01 PICK YOUR SNACK** — choose the character the giant clicker becomes. Everything else (switch voice, spring weight, colours, underglow) keeps working on top of it.

Characters (all built in 3D, no downloads):

1. **Plain Clicker** — the current mechanical switch toy, kept as the default option.
2. **Kaya Toast Set** — toasted bread slab with a kaya-and-butter layer as the press cap, sitting on a saucer base, with a half-boiled egg buddy beside it.
3. **Teh Tarik** — classic pulled-tea cup with a frothy dome as the button and a stainless saucer base.
4. **Nasi Lemak** — banana-leaf wrapped bundle with a rice dome cap, a sambal blob, and a cucumber slice.
5. **Durian** — spiky green husk with a creamy golden pod as the press cap.
6. **Roti Canai** — folded flaky roti stack on a tin plate, with a small dhal bowl.

Each one has a simple cute face (dot eyes, blush, tiny mouth) that squints on press, so they read as characters not props. A toggle lets you turn faces off for a plain product look.

## Feel and sound

- Each snack presses, springs back and shockwaves exactly like the current toy, so the hover-tilt and Space-bar behaviour stay identical.
- Picking a snack auto-selects a sound that suits it (toast = muted thock, durian = heavy brick, teh tarik = light tick), but the user can still change the switch voice and spring weight afterwards.
- Shell finish and keycap colour keep applying to the base/saucer and the topper, so you can still make a brass durian if you want.

## Copy

Quirky, MSCHF-ish, short: "SNACK MODE", "CERTIFIED KOPITIAM GRADE", "DURIAN — 120g of commitment", "Half-boiled, fully committed."

## Technical notes

- New `src/components/clicker/characters/` folder with one procedural component per snack (`KayaToast.tsx`, `TehTarik.tsx`, `NasiLemak.tsx`, `Durian.tsx`, `RotiCanai.tsx`) plus a shared `Face.tsx` billboard-style face using a canvas texture.
- `ClickerModel.tsx` refactors so the press/spring/tilt/shockwave rig stays in one place and the character supplies two parts: a static `base` group and a pressable `cap` group. The existing switch body becomes `PlainSwitch.tsx` under the same contract.
- `clickerPresets.ts` gains a `CHARACTERS` array (id, name, tagline, suggested voice, suggested weight, palette) and `ClickerConfig` gains `character`.
- `useClickerConfig` gets a `setCharacter` action that applies the suggested voice/weight, and `randomize` includes characters.
- Geometry uses primitives + lathe/extrude shapes with subtle noise for the durian husk and toast crust; textures are canvas-generated (toast char marks, banana leaf veins) — no external assets or CDN fetches.
- Verified in the browser with a screenshot per character before finishing.
