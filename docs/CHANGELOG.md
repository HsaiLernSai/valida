# Valida Changelog

The npm package remains `0.1.0`; the product labels below describe prototype milestones rather than published semantic-version releases.

## v0.4D — Final Release QA

### Release validation

- Reviewed the complete v0.4A–v0.4C implementation and all type-dependent builder, renderer, wizard, storage, completion, and external-form branches.
- Added strict HTTP/HTTPS validation for external-form links because wizard navigation does not submit the native URL input directly.
- Added visible keyboard-focus treatment to custom required toggles and rating controls.
- Verified all 11 native question types are present across the TypeScript union, session-post runtime validator, builder, and renderer.
- Verified product storage access remains isolated to the versioned browser-storage adapter.
- `npm run lint` passed with no warnings and `npm run build` generated `/`, `/profile`, and `/research/[id]` on June 29, 2026.

### QA limitation

- Automated in-app browser navigation to the local development server was unavailable during v0.4D. Interactive wizard, submission, refresh persistence, history, response-count, and mobile sign-off must therefore be performed manually before calling the release fully browser-verified.

## v0.4C — Professional UX polish

- Refined wizard hierarchy, step progress, disabled guidance, responsive spacing, safe-area footer, focus trapping, Escape behavior, and trigger-focus restoration.
- Improved builder focus flow, duplicate-option validation, empty/error guidance, and keyboard-visible custom controls.
- Added native-survey first-error focus, stronger success/read-only states, and responsive touch targets.
- Added research-detail and participation-history loading states, feed/profile empty states, not-found presentation, shared button states, mobile navigation safe areas, and reduced-motion handling.

## v0.4A — Professional Native Survey UI

- Redesigned the native survey header, question cards, numbering, required/optional labels, inputs, choices, validation summary, submit area, success state, and read-only answers.
- Reworked the builder into structured question cards with direct type-add controls, clearer option editing, responsive spacing, and consistent v0.4 visual styling.
- Refined Research Detail integration and metadata presentation without changing external forms or storage behavior.

## v0.4B — Rich Native Question Types

### Completed features

- Added Rating (fixed 1–5), Dropdown, Number, Email, Phone, Date, and Time to the existing native survey contract.
- Added creator controls and option editing for the new types without changing the question/answer storage shape.
- Added participant rendering, required validation, email/number/rating/date/time validation, preview support, and completed read-only display.
- Extended session-post runtime validation so newly published research using rich types survives navigation and refresh in the current tab.

### Preserved behavior

- Existing four question types, schema-v1 browser storage, idempotent native submission, completion/history/count synchronization, and external forms remain unchanged.

## v0.3 — Versioned client storage foundation

### Completed features

- Central storage keys and schema version `1` in `lib/browser-storage.ts`.
- Versioned collection envelopes for session-created research and participation history.
- SSR-safe, exception-safe reads and writes for `sessionStorage` and `localStorage`.
- Runtime record guards for research posts, native questions, participation records, and answer values.
- Automatic upgrade of valid legacy bare arrays to the v1 envelope.
- Safe empty-state behavior for malformed JSON, invalid record shapes, unavailable browser storage, and unsupported schema versions.
- Typed research storage helpers for reading, merging, finding, and adding session-created posts.
- Shared completion selectors and locally adjusted response counts across feed, detail, and history.
- Graceful history fallback when a local participation record outlives its session-created research post.

### Improvements

- Native submission remains idempotent by `postId` through the shared participation adapter.
- Feed cards and research detail now both display the same local `responseCount + 1` after native participation.
- Components no longer parse or write product storage directly.
- External research still enters internal detail first and remains explicitly unverified.

## v0.2 — Native Form UX and participation continuity

### Completed features

- Internal `/research/[id]` detail route for native and external research.
- Full detail metadata, progress, timing, audience chips, and hashtags.
- Native form response submission with required-field validation.
- Browser-local duplicate protection by research post ID.
- Response submitted state, locally incremented detail count, and read-only answers on revisit.
- Completed feed state that retains the research and switches to View Research.
- `/profile` Participation History with completion dates and links back to detail.
- Multi-select target-audience tags with suggestions, custom tags, and removal.
- Session-published research carries link/native questions, audiences, limits, timing, and hashtags into the same card/detail UI.
- External links remain supported through a dedicated panel with an unverified MVP notice.

### Improvements

- All research-card Open Research actions now route internally before external handoff.
- Action copy standardized to Interested, Participate, Comment, and Share.
- Completed users no longer see an active Participate action.
- Canonical participation storage helper centralizes local history reads/saves.
- Documentation expanded for current limitations, future language/translation, and external-provider integrations.

## v0.1 — Community, design system, and native form foundation

### Completed features

- Next.js 14 TypeScript App Router project with Tailwind CSS and ESLint.
- Responsive community feed with compact sticky header, feed tabs, left/right sidebars, mobile navigation, and mock research cards.
- Blue/purple Valida brand system, CSS-only gradient V logo, shared UI primitives, and design tokens.
- Trending Research, Popular Hashtags, Quick Start, compact search, and Community Pulse widgets.
- Limited/unlimited response modes and deadline/no-deadline request states.
- Card progress, remaining-participant copy, estimated time, audiences, hashtags, and action counts.
- Six-step Create Research Wizard opened by shared desktop/tablet/mobile entry points.
- Six research goals, external/native response-method choice, basic details, response settings, hashtags, preview, and publish.
- Native form builder for short answer, paragraph, multiple choice, and checkbox questions.
- Required toggles, choice-option management, delete-question behavior, and native preview.
- External support for Google Forms, Microsoft Forms, Typeform, and generic URLs.
- Frontend-only session publish behavior that prepends a new request to the feed.

### Improvements

- Removed the oversized center composer and moved search to the right rail.
- Increased feed density and reduced excessive card/sidebar spacing.
- Made desktop Start research the primary CTA and limited the floating plus to smaller breakpoints.
- Renamed sidebar widgets to research-oriented language and added compact section labels/footer placement.
- Kept orange as a restrained accent rather than a primary theme.
- Refactored the home page into layout, feed, sidebar, research, profile, and UI component families with shared typed data.
