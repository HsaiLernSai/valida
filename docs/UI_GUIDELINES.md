# Valida UI Guidelines

## Visual character

Valida should feel modern, premium, friendly, startup-focused, and research-driven—closer to Linear, Notion, and Figma Community than a generic social network. Density is compact but calm. Avoid heavy green, corporate logo treatments, loud rainbow surfaces, and social-media engagement dominance.

## Colors

Canonical values are in `lib/design-tokens.ts`:

| Role | Value | Use |
| --- | --- | --- |
| Primary navy/ink | `#121A33` | Headings and essential text. |
| Primary blue | `#2563EB` | Links, focus, brand entry. |
| Dark blue | `#1D4ED8` | Strong blue state. |
| Secondary purple | `#7C3AED` | Brand gradient endpoint. |
| Cyan | `#22D3EE` | Sparse gradient highlight. |
| Orange accent | `#F97316` | Small tags/highlights only; never the main CTA system. |
| Canvas | `#F7F8FC` | Soft page background. |
| Surface | `#FFFFFF` | Cards/dialogs. |
| Muted surface | `#F1F5F9` | Secondary controls and quiet blocks. |

Primary CTAs use the blue → indigo → purple gradient. Do not invent repeated one-off brand colors inside components.

## Typography

- Body uses the current neutral system sans-serif stack for fast product reading.
- Headings are bold/extra-bold with slightly tightened tracking; hierarchy comes from weight and spacing, not oversized type.
- Metadata is 11–12px medium/semibold and must retain sufficient contrast.
- Logo typography is rounded, modern, compact, and startup-like. The sidebar omits the tagline to keep the mark quiet.
- Sentence case is preferred for buttons, tabs, labels, and headings.

## Spacing and density

Token anchors are 0.5rem tight, 0.75rem control, 1.25rem card, 2rem section, and 3rem page. Feed gaps and card padding intentionally sit toward the compact end. Use whitespace to group related information, not to make the feed sparse. Touch layouts may need larger hit areas even when visual padding stays compact.

## Cards

- White/light surface, subtle border, `1.25rem` default radius, and low-elevation card shadow.
- Keep one clear content hierarchy: identity → goal/title/description → metadata → status/progress → CTA/actions.
- Do not make an entire research card clickable; preserve text selection and explicit navigation.
- Sidebar cards are smaller and more tightly spaced than feed cards.

## Buttons

- Primary: blue/purple gradient, high-contrast white text, reserved for the next/submit/open/create action.
- Secondary: white or muted gray, subtle border, navy text.
- Destructive: restrained red treatment and explicit copy; do not reuse brand orange as danger.
- Disabled: visibly muted, non-interactive, and still legible.
- Icon-only controls need accessible names and comfortable hit areas.
- Use the shared `Button` component when its variants fit.

## Badges and chips

- Use `Badge` or an existing chip pattern for goals, response mode, deadline state, audience, hashtag, and completion.
- Badges communicate status/category; they must not look clickable unless they filter or navigate.
- Orange is acceptable for a small highlight. Do not make every metadata group colorful.

## Inputs and forms

- Inputs use clear labels, quiet borders, rounded controls, visible focus, and readable helper/error copy.
- Placeholder text does not replace a label.
- Conditional fields appear immediately below their controlling choice.
- Native required validation occurs before submit and identifies missing questions.
- Multiple-choice is single-value; checkbox is multi-value. Options remain strings in the current model.
- Audience and hashtag entries display removable tags and prevent accidental duplicates where practical.

## Dialogs and overlays

- The Create Research Wizard is the only large modal flow. It needs a clear title/step indicator, consistent back/continue placement, close affordance, scroll containment, and mobile-safe height.
- Escape/close must be predictable. Future dialog changes must add a complete focus trap and restore focus to the trigger.
- Do not nest dialogs for native builder actions.

## Radius and shadow

- Control radius: `0.75rem`.
- Card radius: `1.25rem`.
- Feature/dialog radius: `1.5rem`.
- Pills: `9999px`.
- Card/soft shadows are subtle; floating and brand shadows are reserved for overlays or emphasized CTA controls.

## Responsive rules

- **Mobile `<640px`:** single column, mobile bottom navigation, labeled New Research action, no desktop sidebars.
- **Tablet `640–1023px`:** feed-first layout, compact tablet/mobile create control, no persistent desktop left rail.
- **Laptop `1024–1439px`:** left sidebar appears; right sidebar waits until extra-large width.
- **Desktop `1440–1919px`:** full three-column layout with feed around its compact maximum width.
- **Large monitor `≥1920px`:** retain bounded content width; do not stretch cards into long unreadable lines.

Required device classes are iPhone, Android, iPad, MacBook, Windows laptop, and desktop PC. See `RESPONSIVE_LAYOUT.md` for layout-specific notes.

## Interaction patterns

- Open/View Research always enters the internal detail route first.
- External destinations open in a new tab from detail and carry an unverified note.
- Completed research stays visible, says Completed / You already participated, disables repeat participation, and offers View Research.
- Desktop creation is led by Start research in the left rail. Floating plus is tablet/mobile only; mobile navigation keeps the full label.
- Use visible hover, focus-visible, active, loading, disabled, success, and error states where relevant.
- Respect reduced motion; transitions should clarify state and never block interaction.
