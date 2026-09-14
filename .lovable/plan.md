# Malaysian Kopitiam Clicker Collection

Add a playful Malaysian kopitiam identity to Clicker Lab through four sculpted, pressable food toppers inspired by familiar breakfast-table objects.

## Food toppers

- Add a new **Kopitiam Collection** selector with:
  - **Kaya Toast** — stacked toasted bread with visible kaya and butter layers
  - **Kopi Cup** — ceramic kopitiam cup, dark coffee surface, and saucer detail
  - **Half-Boiled Eggs** — two soft eggs in a shallow dish with yolk and pepper details
  - **Soy & Pepper** — a small condiment plate with dark soy pool and pepper-speck accents
- Keep a **Classic Keycap** option so the current design remains available.
- Use original stylized geometry and details rather than reproducing the reference product exactly.

## Interaction and customization

- Each food topper replaces only the generic keycap; the mechanical shell, collar, underglow, sound selection, spring weight, hover tilt, and press animation remain functional.
- Food toppers travel with the existing cap group so every object visibly presses and springs back.
- Shell finishes remain independently customizable.
- Hide the generic keycap colour and profile controls while a food topper is selected, since each sculpted food has its own materials and silhouette; restore them for Classic Keycap.
- Include food-topper selection in **Surprise me**.

## Visual direction

- Build the food as lightweight procedural compound geometry with varied matte, ceramic, toast, kaya, butter, egg, coffee, and soy materials.
- Add small details that read clearly at the current camera distance, avoiding tiny geometry that disappears on mobile.
- Warm the studio presentation with restrained kopitiam cues in the labels and supporting copy while retaining the existing graphite-and-amber design system.
- Keep the existing 65/35 desktop layout and stacked mobile layout.

## Technical details

- Add a typed topper preset to the existing clicker configuration and randomization flow.
- Split the sculpted topper shapes into focused React Three Fiber components, mounted inside the existing animated cap group.
- Reuse the current lighting and material workflow; no external models or third-party product assets are required.
- Keep the scene within the existing mobile performance budget and current draw-call range.
- Verify all five toppers in the browser at desktop and mobile sizes, including click, Space key, randomized selection, shadow placement, and clean console output.
