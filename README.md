# boringg

One button. Press it, watch it grow muscles, then hear a squeak as it shrinks back down.

The interface is an acid-yellow and purple interactive poster, with a lavender toy base, crooked stickers, and comic reactions. The background eases through lime and pink as the toy grows. Reduced-motion preferences disable decorative animation.

## Development

Requires Node.js 22.12 or newer and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (port 8080 by default). Hosted previews use the network-accessible server and `npm run build:dev`. For a separate local instance, use `npm run dev -- --host 127.0.0.1 --port 8087`.

Click or tap the toy, or press Space. The first 24 presses grow the toy; the 25th resets it. The 900 ms cooldown lets the reset land.

## Checks

```sh
npm run check
npm audit
```

Checks cover types, lint, interaction regression tests, and the production build. Tests mock the 3D renderer: visual appearance and WebGL rendering still require a real browser.

## Source

- `src/pages/Index.tsx`: interaction, keyboard handling, cooldown, and fallback.
- `src/components/SwoleToy.tsx`: procedural 3D toy and growth animation.
- `src/lib/swoleAudio.ts`: synthesized click and squeak.
- `src/index.css`: responsive appearance.
- `src/App.tsx`: home and not-found routes.

No database, account, environment variables, or backend is required. No audio files or remote 3D assets are loaded. Google Fonts supplies the typography, with local fallback fonts.

The former dashboard, customization components, Supabase scaffolding, and unused UI library were removed. Their tracked versions remain recoverable from Git history.
