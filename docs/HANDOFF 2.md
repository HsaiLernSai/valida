# Valida Handoff

## Current completed features

- Next.js 14 App Router foundation with TypeScript, Tailwind CSS, and ESLint.
- Responsive community feed, sidebars, compact header, and mobile navigation.
- Typed research posts with goals, target audiences, hashtags, capacity, deadlines, and progress.
- Create Research Wizard with separate step components.
- External Form Link and Valida Native Form creation methods.
- Native form builder and renderer for four question types.
- Research Detail page for both external and native requests.
- Current-session native response validation, duplicate prevention, completion message, and local count increment.
- Product, UI, database, responsive, deployment, and development documentation.

## Current sprint

**Research Detail Page v0.1** adds `/research/[id]`, full request metadata, native-form completion, external form handoff, and current-session detail resolution for newly created posts.

## Next recommended sprint

Build **Research Detail Polish and Session State Unification** as described in `docs/NEXT_TASK.md`. Prioritize one typed session-state source shared by the feed, wizard, and detail route before adding more product surfaces.

## Important rules

- **No backend yet.** Do not add Supabase, server persistence, authentication, or database logic without an explicit request.
- **Preserve component structure.** Keep routes compositional and place feature logic in focused components under `components/`.
- **Native form is frontend-only.** Its answers and completion status are local session data and are not production-safe records.
- **External form is unverified.** Opening or returning from an external form must not count as a verified response.
- **Response count is local only for now.** Native submissions increment UI state for the current session; there is no authoritative shared count.
- Continue using shared TypeScript types, design tokens, and UI primitives.
- Every feature must pass `npm run lint` and `npm run build`.
