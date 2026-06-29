# Valida UI System

## Brand direction

Valida is **modern, premium, friendly, startup-focused, and research-driven**. It should make structured validation feel approachable without turning serious research into generic social engagement. Valida is not a Facebook clone: hierarchy favors research intent, participation fit, evidence, and progress over vanity metrics or an infinite entertainment feed.

The brand tagline is **Validate Before You Build**.

The product should feel focused and crafted, with calm surfaces, precise typography, small moments of warmth, and enough visual energy to feel like a contemporary startup tool. Avoid corporate logo conventions, heavy green treatments, noisy gradients, and overly playful rainbow palettes.

## Color system

- **Primary navy** (`ink`): headings and essential body text.
- **Blue primary** (`brand`): links, focus states, active navigation, and the start of the primary CTA gradient.
- **Purple secondary** (`secondary`): completes the brand gradient and distinguishes Valida from generic enterprise blue.
- **Cyan highlight** (`highlight`): a restrained glint in brand marks and select data visualization.
- **Orange accent** (`accent`): small tags, signals, and editorial highlights only. Orange is not a main button color.
- **Soft off-white** (`canvas`): application background.
- **Light surface** (`surface`): cards, inputs, navigation, and elevated content.

Primary actions use the blue-to-purple brand gradient. Status colors retain semantic meaning: green for success, amber for caution, and red for destructive/error states.

Canonical values live in `lib/design-tokens.ts` and are exposed to Tailwind through `tailwind.config.ts`. Components should consume semantic token classes instead of repeating raw color, gradient, radius, or shadow values.

## Typography rules

- Keep the current system sans-serif stack for app body copy while it remains clear and performant.
- Logo typography should feel rounded, modern, startup-like, and less corporate. The intended character is in the same broad product-design family as Linear, Arc, Figma, Stripe, and Notion without copying any of their marks or wordmarks.
- The Valida wordmark uses a confident heavy weight and compact tracking; the tagline uses small uppercase text with measured tracking.
- Page titles: bold or extra-bold, compact letter spacing, one clear `h1` per page.
- Section titles: semibold/bold and visually subordinate to the page title.
- Body copy: at least 14px, with 1.5–1.7 line height for readable research descriptions.
- Metadata: 11–12px is acceptable when contrast remains accessible.
- Do not use weight alone to communicate interactive state.

## Button rules

- Primary: one dominant action per region; blue-to-purple gradient with white text.
- Secondary: white or soft gray surface with navy text and a subtle border; it should not compete with the primary action.
- Accent: orange is reserved for small highlights, never a main CTA fill.
- Ghost: navigation and low-priority actions.
- Destructive: explicit red treatment and confirmation where consequences are irreversible.
- Buttons need clear verb-led labels, visible focus states, disabled states, and a minimum 44×44px touch target when practical.
- Use `components/ui/Button.tsx` instead of duplicating base button styles.

## Card rules

- Light surface, subtle neutral border, 16–24px radius, restrained tokenized shadow.
- Internal spacing should generally be 16px on mobile and 20–24px on larger screens.
- Cards group one coherent object or task; do not nest multiple decorative cards.
- Hover elevation is allowed only when the card or a clear child action is interactive.
- Use `components/ui/Card.tsx` for the base surface.

## Badge rules

- Badges label research goals, status, or compact categories.
- Use concise text, sentence case, and consistent goal-to-color mapping.
- Never use color as the only source of meaning; the text label is required.
- Badges are informational unless they have button/link semantics and focus behavior.

## Spacing rules

Use Tailwind’s 4px spacing scale. Prefer these common intervals:

- 4–8px: icon/text and tightly related metadata.
- 12–16px: controls and internal groups.
- 20–24px: card padding and section groups.
- 32–48px: major page regions.

Avoid arbitrary values unless they encode a deliberate layout constraint. Use the shared spacing notes in `lib/design-tokens.ts`, and maintain consistent vertical rhythm before adding decorative spacing.

## Logo usage

Use `components/ui/ValidaLogo.tsx` for every brand lockup:

- `compact`: gradient V mark with the Valida wordmark.
- `full`: mark, wordmark, and “Validate Before You Build” tagline.
- `markOnly`: V mark for constrained spaces; it still needs an accessible name.

The mark is CSS/Tailwind-only. Do not recreate it with one-off markup in feature components. Keep surrounding space clear and avoid placing it on visually noisy gradients.

## Accessibility basics

- Meet WCAG AA contrast for text and controls.
- Preserve semantic heading order, landmarks, labels, and button/link distinctions.
- Every input needs an accessible label; every icon-only control needs an accessible name.
- Keyboard focus must be visible and follow a logical order.
- Do not rely on hover; all actions must work with touch and keyboard.
- Respect reduced-motion preferences for nonessential animation.
- Announce dynamic validation, loading, and completion states when interactions become functional.
