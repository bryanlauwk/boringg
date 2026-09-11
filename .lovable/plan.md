# Clicker Toy Customizer

Replace the global boredom tracker with a solo stress-relief toy: a big 3D mechanical clicker you can press, hear, and customize.

## Screen layout

```text
+---------------------------------+------------------+
|                                 |  SENSORY PANEL   |
|      3D CLICKER (65%)           |  step 1 sound    |
|      tilts to cursor            |  step 2 spring   |
|      presses on click           |  step 3 shell    |
|                                 |  click counter   |
+---------------------------------+------------------+
```

- Left: dark studio scene, soft spotlight, floor reflection, the clicker centered like a coffee-mug-sized object.
- Right: translucent frosted glass panel, stacked steps, each step a labeled row of choices.
- Mobile: clicker on top, panel below as scrollable steps.

## The toy

- Body shell, collar ring, and a large round keycap that travels down about 4mm on press then springs back.
- Whole object tilts a few degrees toward the cursor and lifts slightly on hover.
- Press works on mouse, touch, and the space bar.
- Press releases a tiny shockwave ring and a subtle camera shake tuned to the chosen spring weight.

## Step 1 - The Acoustic Engine (switch sound)

Six voices, all generated live in the browser (no audio files, zero load time). Each is a short noise burst plus a tuned resonant body:

| Voice | Character |
| --- | --- |
| Clicky Blue | sharp double click, bright leaf snap |
| Tactile Brown | rounded thock, muted bump |
| Linear Red | soft smooth press, almost no top end |
| Creamy Marble | deep low thock, long body |
| Snappy Silver | fast high-pitch tick |
| Vintage Buckling | loud metallic spring ping |

Picking a voice plays a preview instantly. A master volume slider and a mute toggle sit under the list.

## Step 2 - Tactile Resistance (spring weight)

A slider from 35g to 120g with named stops (Feather, Light, Standard, Heavy, Brick). Weight changes three things at once:

- press depth and how fast the cap returns
- pitch and length of the sound (heavier = lower, slower)
- strength of the impact shake

A live readout shows the gram value and a short description of the feel.

## Step 3 - Aesthetic Shell & Keycap

- Shell finish: Brushed Aluminium, Matte Charcoal, Polished Brass, Translucent Smoke, Glossy Cherry.
- Keycap colour: a row of swatches.
- Keycap profile: Flat, Domed, Deep Dish - changes the cap silhouette.
- Optional underglow with a colour picker, off by default.

Every change updates the 3D toy instantly. A "Surprise me" button randomizes all steps at once.

## Session counter

A quiet counter of presses in this session, plus a small "personal best streak" of presses per 10 seconds. Nothing is saved to a server.

## Technical notes

- Add `three`, `@react-three/fiber@^8.18`, `@react-three/drei@^9.122`, `@types/three` (React 18 pins these majors).
- New `src/components/clicker/` with `ClickerCanvas`, `ClickerModel`, `Studio` (lights + Lightformer environment, no CDN presets), and the panel components.
- Toy state lives in one `useClickerConfig` hook shared by canvas and panel.
- Audio via a small Web Audio synth module: noise burst through a bandpass plus a damped sine body, parameters driven by voice and spring weight. AudioContext created on first user gesture.
- Delta-time animation and exponential damping in `useFrame`; pixel ratio capped at 2.
- Design tokens for the new studio palette go in `index.css` and `tailwind.config.ts`; no hardcoded colour classes.

## Removed

- Boredom grid, ticker, live indicator, era system, boredom facts modal, confetti, and the `useBoredomData` realtime hook and its components.
- The database tables stay in place but are no longer read or written; say the word and I will drop them.
