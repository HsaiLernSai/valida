# Responsive Layout

## Responsive-first rule

Build from the smallest supported viewport upward. Content hierarchy and task completion must work in one column before adding sidebars or denser controls. Breakpoints respond to available space, not assumed device identity.

## Viewport ranges

| Range | Width | Expected layout behavior |
| --- | ---: | --- |
| Mobile | `< 640px` | Single feed column, compact sticky header, bottom navigation, full-width cards, touch-first controls. |
| Tablet | `640–1023px` | Single centered feed with more card padding; no permanent sidebars. Ensure portrait and landscape both work. |
| Laptop | `1024–1439px` | Left navigation plus center feed; right discovery sidebar may remain hidden when space is constrained. |
| Desktop | `1440–1919px` | Full three-column layout with bounded content widths and visible discovery sidebar. |
| Large monitor | `>= 1920px` | Keep readable maximum widths; add outer whitespace instead of stretching text and cards. |

## Required device support

Valida must remain usable and visually coherent on:

- iPhone, including narrow current viewports and safe-area insets.
- Android phones across common Chrome viewport sizes.
- iPad in portrait and landscape.
- MacBook displays at common scaled resolutions.
- Windows laptops with browser zoom and varied display scaling.
- Desktop PCs and large monitors.

## Implementation checks

- No horizontal page scrolling at any supported width.
- Primary actions remain visible and have practical touch targets.
- Fixed mobile navigation must not obscure the final feed content.
- Text should wrap without clipping; cards must tolerate longer names, titles, badges, and translated copy.
- Keyboard focus must not be hidden behind sticky or fixed UI.
- Sidebars should become part of an accessible mobile navigation or secondary flow, not simply disappear forever.
- Test at boundary widths: 320, 375, 639, 640, 768, 1023, 1024, 1280, 1439, 1440, 1920, and browser zoom at 200%.
