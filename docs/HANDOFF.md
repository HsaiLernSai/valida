# Valida Handoff

## Project summary

Valida is a frontend-only research community prototype built with Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, and ESLint. Users can browse structured research requests, create an external or native request through a six-step wizard, open a full detail route, submit a native form once in the current browser profile, and revisit completed research through Profile → Participated.

The repository contains no backend, database, authentication, Supabase client, API persistence, payments, or real account identity.

## Current sprint

- **Package version:** `0.1.0`
- **Product iteration:** Native Form v0.2
- **Sprint state:** feature work, permanent documentation, and final validation are complete.
- **Objective:** stabilize the browser-local research journey before expanding Profile/Bookmarks or adding more product surfaces.

## Completed work

- Responsive compact community shell with left navigation, sticky feed header, right discovery rail, mobile navigation, and shared creation triggers.
- Five mock requests with six supported goals, multiple audiences, hashtags, estimated time, limited/unlimited capacity, and deadline/open-ended state.
- Research cards with progress/status, internal detail CTA, visual action counts, and completed/View Research behavior.
- Six-step Create Research Wizard with separate step components and session publish.
- External-form link choice plus Google Forms, Microsoft Forms, Typeform, and generic URL compatibility.
- Native form builder/renderer for short text, paragraph, multiple choice, and checkbox questions.
- Required-field validation, native submission, browser-local duplicate prevention, submitted success, read-only revisit, and local detail count increment.
- Dynamic `/research/[id]` detail route and `/profile` participation-history route.
- Blue/purple design system, restrained orange accent, CSS-only Valida logo, UI primitives, design tokens, typed mock/default data, and storage helper.
- Full project status, roadmap, immediate tasks, product blueprint, models, architecture, UI guide, changelog, backlog, deployment, responsive, and development documentation.
- Final validation on June 28, 2026: `npm run lint` passed with no warnings/errors and `npm run build` generated `/`, `/profile`, and `/research/[id]` successfully.

## Current issues

1. `valida:session-posts` and `valida:participation-history` have different lifetimes. History can outlive a session-created post.
2. Detail adds one local response after completion; the matching feed card keeps its base count.
3. Storage JSON is unversioned and lacks runtime shape validation.
4. Browser-local duplicate prevention is not “one account = one submission”; there are no accounts.
5. Search, tabs, reactions, bookmarks, Explore, My Research, comments, and sharing are presentational.
6. External form completion is explicitly unverified and must stay that way until a real integration exists.
7. Target/deadline states do not automatically close research.
8. Wizard/dialog accessibility needs a focus-trap and focus-restoration audit; no automated test suite exists.
9. The cloud-synced workspace can generate duplicate files with ` 2` suffixes. TypeScript excludes duplicate `.ts`/`.tsx`; do not edit them as canonical files.

## Next priorities

1. Consolidate and version browser storage, synchronize local completion counts across feed/detail/history, and make retained post metadata consistent.
2. Add focused unit and end-to-end coverage for storage, validation, publish, submit, completed feed state, history, and external handoff.
3. Build a truthful browser-local Profile/Bookmarks MVP using the consolidated storage contract.

Exact goals, files, dependencies, and acceptance criteria are in `NEXT_TASK.md`.

## Recommended first task

Start with **Priority 1 — Consolidate and version client storage**. Do not begin Bookmarks by adding a third ad hoc storage key. First introduce one typed adapter, safe parsing/schema versioning, and selectors that give feed, detail, and history the same posts, completion state, and locally adjusted count.

The key product choice to make explicitly is retention: either move session-created research to durable `localStorage`, or keep participation for those posts session-scoped. The current mixed lifetime creates orphaned history. Document the selected behavior before migration code.

## Files to read first

1. `docs/PROJECT_STATUS.md` — current implementation, tested behavior, and issues.
2. `docs/NEXT_TASK.md` — only the immediate work.
3. `docs/DEVELOPMENT_RULES.md` — scope and quality guardrails.
4. `lib/types.ts` — canonical TypeScript contracts.
5. `lib/mock-data.ts` and `lib/research-defaults.ts` — catalog and creation defaults.
6. `lib/participation-storage.ts` — current durable browser storage.
7. `components/research/ResearchWorkspace.tsx` — feed/wizard/session-post coordination.
8. `components/research/ResearchDetail.tsx` — post resolution and participation state.
9. `components/research/CreateResearchWizard.tsx` — draft flow and post conversion.
10. `components/feed/PostCard.tsx`, `components/research/NativeFormRenderer.tsx`, and `components/profile/ParticipationHistory.tsx` — user-visible completion behavior.

Use `COMPONENT_ARCHITECTURE.md`, `DATABASE.md`, and `UI_GUIDELINES.md` as references rather than inferring intended boundaries from markup.

## Developer notes

- Home route: `/`; research detail: `/research/[id]`; participation history: `/profile`.
- Mock data is the base catalog. Wizard-published posts are prepended and saved to `sessionStorage` under `valida:session-posts`.
- Native participation is saved to `localStorage` under `valida:participation-history` as `{ postId, completedAt, answers }`.
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

After the storage/testing priorities, run **Local Profile & Bookmarks v0.1**: browser-labeled profile summary, bookmark toggle/list, graceful missing-post handling, and responsive navigation. Keep it frontend-only. Then consider functional search/sharing. Credits, analytics, AI, and backend work should wait until their product and data policies are explicitly decided.
