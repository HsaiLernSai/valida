# Valida Development Rules

## Scope guardrails

1. The current product is frontend-only.
2. Do not add backend services, API routes that persist product data, authentication, database logic, or Supabase until the user explicitly requests and approves that sprint.
3. Use React state and browser storage for prototype persistence. `localStorage` is the default for durable browser-local user state; use `sessionStorage` only when the shorter lifetime is intentional and documented.
4. Never describe browser-local duplicate protection as real account enforcement.
5. Preserve Google Forms, Microsoft Forms, Typeform, and generic external-link support. External submissions remain unverified.
6. Codex must not make consequential product decisions alone. Document meaningful alternatives and request direction when a choice changes product scope, data policy, identity, monetization, or backend architecture.

## Architecture

1. Keep App Router route files thin. Product behavior belongs in focused components or `lib` helpers.
2. Keep components small, typed, and reusable. Wizard steps must remain separate components.
3. Reuse shared UI primitives and `lib/design-tokens.ts` instead of hardcoding repeated styles when practical.
4. Put repeated catalog/mock data in `lib/mock-data.ts` or `lib/research-defaults.ts`, not inside render functions.
5. Put shared interfaces and unions in `lib/types.ts`; avoid `any` and implicit data shapes.
6. Keep storage access behind typed helpers. Components should not proliferate new keys or incompatible parsing logic.
7. Avoid duplicate components. Search existing layout, feed, research, sidebar, profile, and UI folders before creating a new abstraction.
8. `components/ui/ValidaLogo.tsx` is canonical; `components/ui/Logo.tsx` is legacy pending safe cleanup.
9. Do not collapse the component hierarchy back into `app/page.tsx`.

## Product and UI change discipline

1. Do not redesign the existing UI unless the user asks for a redesign.
2. Preserve the blue/purple primary system, restrained orange accent, soft off-white canvas, light cards, compact density, and research/productivity character.
3. Keep primary creation entry points and navigation behavior consistent across breakpoints.
4. Do not make informational metadata look interactive.
5. Keep completed research visible and use truthful state labels.
6. Add product capabilities incrementally; do not silently remove native or external workflows.

## Responsive and accessibility rules

1. Design and test responsive-first: mobile below 640px, tablet 640–1023px, laptop 1024–1439px, desktop 1440–1919px, large monitor 1920px and above.
2. Support iPhone, Android, iPad, MacBook, Windows laptop, and desktop PC layouts.
3. Preserve keyboard access, visible focus, semantic labels, adequate contrast, touch targets, and screen-reader context.
4. Dialog work must consider focus entry, trapping, escape/close behavior, and focus restoration.

## Quality gates

1. Every implementation change must pass `npm run lint`.
2. Every implementation change must pass `npm run build`.
3. Test the affected user journey, not only isolated rendering.
4. Update `PROJECT_STATUS.md`, `CHANGELOG.md`, `NEXT_TASK.md`, and `HANDOFF.md` when shipped behavior or priorities change.
5. Do not claim a feature is verified unless it has actually been exercised.
6. Preserve unrelated user changes and avoid destructive repository commands.

## Workspace-specific cautions

- This synced folder has generated duplicate filenames ending in ` 2`. TypeScript excludes duplicate `.ts`/`.tsx` files; never edit a suffix copy as the canonical source.
- Next uses `.next-build` through `next.config.mjs` because sync interference made `.next` unreliable. Keep generated build output ignored.
