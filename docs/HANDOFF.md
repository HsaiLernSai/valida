# Valida Handoff

## Project summary

Valida is a frontend-only research community prototype built with Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, and ESLint. Users can browse structured research requests, create an external or native request through a six-step wizard, open a full detail route, submit a native form once in the current browser profile, and revisit completed research through Profile → Participated.

The repository contains no backend, database, authentication, Supabase client, API persistence, payments, or real account identity.

## Current sprint

- **Package version:** `0.1.0`
- **Product iteration:** v0.4D — Final Release QA
- **Sprint state:** v0.4A–v0.4C implementation is code-complete; static, lint, and production-build gates pass.
- **Objective:** complete manual browser sign-off before commit/push. Interactive local-browser automation was unavailable during v0.4D, so the release is not yet recorded as browser-verified.

## Completed work

- Responsive compact community shell with left navigation, sticky feed header, right discovery rail, mobile navigation, and shared creation triggers.
- Five mock requests with six supported goals, multiple audiences, hashtags, estimated time, limited/unlimited capacity, and deadline/open-ended state.
- Research cards with progress/status, internal detail CTA, visual action counts, and completed/View Research behavior.
- Six-step Create Research Wizard with separate step components and session publish.
- External-form link choice plus Google Forms, Microsoft Forms, Typeform, and generic URL compatibility.
- Professional native form builder/renderer for short text, paragraph, multiple choice, checkbox, rating, dropdown, number, email, phone, date, and time.
- Required-field validation, native submission, browser-local duplicate prevention, submitted success, read-only revisit, and local detail count increment.
- Dynamic `/research/[id]` detail route and `/profile` participation-history route.
- Blue/purple design system, restrained orange accent, CSS-only Valida logo, UI primitives, design tokens, typed mock/default data, and storage helper.
- Full project status, feature matrix, roadmap, sprint history, immediate tasks, product blueprint, models, architecture, UI guide, changelog, backlog, deployment, responsive, and development documentation.
- Final validation on June 28, 2026: `npm run lint` passed with no warnings/errors and `npm run build` generated `/`, `/profile`, and `/research/[id]` successfully.
- Client Storage Foundation validation on June 29, 2026: lint passed cleanly, the production build generated all preserved routes, and the development server returned HTTP 200 for `/`.
- Product Planning Documentation v0.4 validation on June 29, 2026: lint and production build passed; the sprint changed documentation only.
- v0.4A professionalized the builder, survey renderer, success/read-only states, and detail presentation.
- v0.4B added seven rich types while preserving the string/string-array answer contract and schema-v1 storage.
- v0.4C added wizard focus containment, responsive/safe-area polish, duplicate-option validation, loading/empty/error states, and shared accessibility treatment.
- v0.4D fixed external HTTP/HTTPS link validation and custom-control focus visibility; lint and production build passed on June 29, 2026.

## Current issues

1. `valida:session-posts` and `valida:participation-history` intentionally have different lifetimes. History can outlive a session-created post and then shows a graceful unavailable fallback.
2. Browser-local duplicate prevention is not “one account = one submission”; there are no accounts.
3. Search, tabs, reactions, bookmarks, Explore, My Research, comments, and sharing are presentational.
4. External form completion is explicitly unverified and must stay that way until a real integration exists.
5. Target/deadline states do not automatically close research.
6. No automated unit/integration/end-to-end suite exists. Wizard focus trapping/restoration is implemented but still needs manual assistive-technology/browser sign-off.
7. The cloud-synced workspace can generate duplicate files with ` 2` suffixes, including stale Markdown copies. Unsuffixed files are canonical; TypeScript excludes duplicate `.ts`/`.tsx`. Do not edit suffix copies or delete sync artifacts casually.

## Next priorities

1. Manually test Create Research end-to-end with all 11 native question types, validation, preview, and publish.
2. Verify submit, duplicate prevention, completed/read-only revisit, Profile History, response-count sync, and refresh persistence.
3. Verify mobile layouts, keyboard/safe-area behavior, and external links; record the outcome before commit/push.

The release checklist and current verification boundary are recorded in `PROJECT_STATUS.md`; the older `NEXT_TASK.md` implementation plan is historical until it is deliberately replaced.

## Recommended first task

Start with the manual v0.4 release checklist in `PROJECT_STATUS.md` under Remaining Testing. Do not begin another feature sprint or describe v0.4 as browser-verified until that pass succeeds.

## Files to read first

1. `docs/FEATURE_MATRIX.md` — authoritative implemented/next/planned/future boundaries.
2. `docs/PROJECT_STATUS.md` and `docs/SPRINT_HISTORY.md` — release status, remaining QA, and milestone sequence.
3. `docs/CHANGELOG.md` — v0.4A–v0.4D implementation and validation record.
4. `docs/DEVELOPMENT_RULES.md` — scope and quality guardrails.
5. `lib/types.ts` and `lib/research-defaults.ts` — native survey contracts/defaults.
6. `components/research/CreateResearchWizard.tsx`, `NativeFormBuilder.tsx`, `NativeFormRenderer.tsx`, and `PreviewPublishStep.tsx` — v0.4 release surface.
7. `lib/browser-storage.ts`, `lib/research-storage.ts`, and `lib/participation-storage.ts` — stable versioned browser-state contract.

Use `COMPONENT_ARCHITECTURE.md`, `DATABASE.md`, and `UI_GUIDELINES.md` as references rather than inferring intended boundaries from markup.

## Developer notes

- Home route: `/`; research detail: `/research/[id]`; participation history: `/profile`.
- Mock data is the base catalog. Wizard-published posts are prepended and saved through `lib/research-storage.ts` to versioned `sessionStorage` under `valida:session-posts`.
- Native participation is saved through `lib/participation-storage.ts` to versioned `localStorage` under `valida:participation-history`.
- `saveParticipation` is idempotent by `postId`. `ResearchDetail` additionally guards against submitting while participation state is set.
- Every card enters internal detail first. Only `ExternalFormPanel` opens an external destination.
- `targetAudience` is canonically `string[]`; compatibility normalization in detail is defensive.
- `responseCount` is a base/mock number. Never present it as network-authoritative.
- `ValidaLogo.tsx` is canonical; `Logo.tsx` is legacy. Search imports before cleanup.
- Next build output is `.next-build` by `next.config.mjs`, not `.next`.

## Warnings

- Do not add backend, auth, Supabase, database tables, or environment requirements without an explicit new sprint.
- Do not redesign the application, collapse components into route files, or replace external-form support.
- Do not call external participation verified.
- Do not claim browser-local state is account-secure, cross-device, private storage, or production persistence.
- Do not edit/delete duplicate-suffix sync artifacts casually; compare imports and canonical filenames first.
- Preserve shared UI components and design tokens; orange is not a primary CTA color.
- Every implementation change must pass `npm run lint` and `npm run build` and should update the project-memory docs.

## Future sprint recommendation

Finish manual v0.4 browser sign-off, then commit/push only when explicitly requested. Do not start another sprint from this handoff. Credits, analytics, AI, uploads, translation, and backend work remain later phases.
