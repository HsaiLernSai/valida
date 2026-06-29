# Valida Project Status

## Project overview

Valida is a research community product for validating ideas before they are built. Creators publish survey, interview, prototype, business-idea, design-feedback, or open-discussion requests; community members discover them, review the full brief, and participate through either a Valida native form or an external form.

This repository is a frontend-only product prototype. It intentionally has no server, database, authentication, Supabase client, payment system, or authoritative user identity.

## Current sprint

- **Package version:** `0.1.0`
- **Product iteration:** v0.4D — Final Release QA
- **Current objective:** validate the complete v0.4 native survey release candidate before commit and push.

The code-review, static-contract, lint, and production-build gates pass. Interactive local-browser automation was unavailable during v0.4D, so final manual browser sign-off remains explicitly pending; no subsequent coding sprint is selected.

## Current architecture

### Runtime and routes

- Next.js 14.2 App Router, React 18, TypeScript, Tailwind CSS, and ESLint.
- `/` renders `ResearchWorkspace`, the client-side coordinator for the feed and Create Research Wizard.
- `/research/[id]` renders a dynamic research detail view.
- `/profile` renders participation history.
- `app/layout.tsx` owns global document structure and `app/globals.css` owns global styling.

### Component relationships

`ResearchWorkspace` owns session-created posts and wizard visibility, then passes posts into `AppShell` and `Feed`. `AppShell` composes the left sidebar, compact sticky feed header, feed content, right sidebar, tablet/mobile create control, and mobile navigation. `Feed` renders `PostCard` instances. Every Open/View Research action routes to the detail page rather than opening a form directly from the card.

`CreateResearchWizard` owns a `ResearchWizardData` object and delegates each step to a separate component. Preview reuses the production `PostCard`; native questions are built by `NativeFormBuilder` and previewed/rendered by `NativeFormRenderer`.

`ResearchDetail` resolves a post, reads participation state, and delegates metadata, native-form, or external-form UI to focused components. `ParticipationHistory` joins saved participation records back to mock or session-created posts.

### Data flow and storage

- Static catalog data comes from `lib/mock-data.ts`.
- Wizard data lives in React state until publish.
- `lib/browser-storage.ts` owns storage keys, schema version `1`, versioned collection envelopes, SSR-safe access, parsing, legacy-array upgrades, and failure handling.
- Published posts are prepended in `ResearchWorkspace` and stored through `lib/research-storage.ts` in `sessionStorage` under `valida:session-posts`. They survive navigation and refresh in the same tab session, but not a new browser session.
- Native submissions are stored through `lib/participation-storage.ts` in `localStorage` under `valida:participation-history`.
- Valid legacy bare arrays are upgraded to the v1 envelope on read. Invalid JSON, invalid record shapes, inaccessible storage, and unsupported schema versions resolve to empty collections without crashing.
- Duplicate native submissions are blocked by `postId` in that browser profile.
- Feed, detail, and history use the same participation helpers. A locally completed native request displays `responseCount + 1` in both feed and detail; there is still no shared or authoritative count.
- External submissions leave Valida and cannot be verified in this MVP.

## Completed features

### Community and discovery

- Compact responsive three-column desktop community layout and single-column mobile layout.
- Branded left navigation, sticky community header, feed tabs, compact right-side search, trending research, hashtags, quick-start goals, and Community Pulse widgets.
- Five realistic mock research posts across supported research goals.
- Limited/unlimited response modes and deadline/open-ended display.
- Dense research cards with goal, time, audience chips, hashtags, response status, progress, and social-action counts.
- Internal Open Research links for every post; completed cards remain in the feed.

### Research creation

- Six-step modal/overlay Create Research Wizard.
- Goal, basic details, response method, target audiences, response settings, hashtags, preview, and publish flow.
- External URL support for Google Forms, Microsoft Forms, Typeform, or other providers.
- Professional native form builder with short answer, paragraph, multiple choice, checkbox, rating, dropdown, number, email, phone, date, and time questions.
- Required toggles, editable/unique options, add/remove options, type switching, delete controls, focused editing flow, and publish-time validation.
- Multi-value target audience tags with suggestions and removal.
- Newly published posts appear at the top of the feed and are available on detail routes for the current tab session.

### Participation and detail

- Full research detail metadata and response/progress presentation.
- Native form rendering and required-field validation.
- Frontend-only native submission, success state, local response-count increment, and duplicate prevention.
- Read-only submitted answers and “You already participated” state on return.
- Professional native response layout, type-specific validation, first-error focus, success presentation, and completed read-only answers for all 11 types.
- External form panel with a new-tab CTA and explicit unverified-submission notice.
- Profile participation history with completion date and links back to research detail.

### Product system

- Shared UI components for buttons, cards, badges, search, icons, and the CSS-only Valida logo.
- Central TypeScript models, mock-data catalog, research defaults, participation-storage helper, and design-token catalog.
- Centralized versioned browser storage with typed runtime guards for session research and participation records.
- Blue/purple brand gradient, restrained orange accent, soft canvas, responsive sidebars, mobile bottom navigation, and compact create controls.

## Features in progress

No v0.4 feature is half-built. The remaining release activity is manual browser sign-off for the wizard-to-history lifecycle and mobile layouts. Search, tabs, reactions, bookmarks, and most navigation destinations remain presentational and are outside v0.4.

The status of every named capability is maintained in `FEATURE_MATRIX.md`; completed milestone history is maintained in `SPRINT_HISTORY.md`.

## Known issues

- Browser storage is not an account: clearing storage, changing browsers, or changing devices loses state, and “one account = one submission” is only approximated by one browser profile.
- Created posts intentionally use `sessionStorage`, while participation uses `localStorage`. A participation record can outlive a session-created post; History handles this with a non-clickable “Research unavailable” fallback and the completion date.
- Storage validation is hand-written and collection-level: one invalid item causes that stored collection to resolve safely to empty. There is not yet a formal migration framework beyond the v0 bare-array upgrade.
- Feed tabs, search, Interested, Comment, Share, Explore, My Research, Bookmarks, and most navigation items are visual only.
- External-provider completion cannot be detected or verified.
- Deadlines are displayed but are not used to close requests; limited requests are not automatically closed at their target.
- Native validation and HTTP/HTTPS external-link validation are suitable for a frontend prototype, not production abuse prevention. Phone input intentionally has no region-specific validation.
- There is no automated unit, integration, accessibility, or end-to-end test suite.
- The synced workspace has produced duplicate files with a ` 2` suffix. TypeScript explicitly excludes `**/* 2.ts` and `**/* 2.tsx`; `.next-build` is used because the default `.next` directory was unreliable under sync. Do not treat duplicate-suffix files as canonical.
- `components/ui/Logo.tsx` is legacy; `components/ui/ValidaLogo.tsx` is the active logo component. Confirm imports before removing legacy files.

## UX decisions

- The feed is research/productivity-oriented rather than a Facebook-style social feed.
- The center column prioritizes posts: search lives in the right sidebar and the composer was removed.
- “Start research” in the desktop left sidebar is the primary creation CTA. The floating plus is hidden on desktop and retained for tablet/mobile; mobile navigation keeps a labeled create action.
- Cards expose one clear Open Research action. Metadata is informative and not clickable.
- Native and external response methods remain equal first-class choices, but external submissions are labeled unverified.
- Completed research is never removed from discovery. It shows Completed, explains that the user participated, and switches the CTA to View Research.
- Target audiences are chips backed by `string[]`, allowing specific multi-audience requests.
- Limited requests show a progress bar and remaining need; unlimited requests show a status badge without artificial progress.
- Orange is a small highlight only. Primary actions use the blue-to-purple brand gradient.
- Hashtags improve filtering/discovery; they are not separate community rooms.

## Data model summary

- `ResearchPost`: creator display data, research content, response method, optional external link/native questions, audiences, hashtags, limits/deadlines, response count, and display-action counts.
- `ResearchWizardData`: editable creation state; stricter UI defaults become an optional-field `ResearchPost` on publish.
- `NativeFormQuestion`: one of 11 question types, label, required flag, and optional choices for multiple choice, checkbox, and dropdown.
- `NativeFormAnswers`: question-id keyed strings or string arrays.
- `ParticipationRecord`: post ID, ISO completion time, and submitted answers.
- `NavigationItem`, `TrendingResearchItem`, and `QuickStartItem`: presentation/catalog models.

See `DATABASE.md` for every field, status, and relationship.

## Tested features

- v0.4D static QA confirmed all 11 question types across types, runtime storage validation, builder, and renderer; browser storage access remains isolated to `lib/browser-storage.ts`; external links remain detail-only.
- v0.4D passed `npm run lint` without warnings and `npm run build` on June 29, 2026. The build generated `/`, `/profile`, and `/research/[id]` successfully.
- Product Planning Documentation v0.4 passed `npm run lint` and `npm run build` on June 29, 2026; no application code or runtime behavior changed.
- Client Storage Foundation v0.3 passed `npm run lint` and `npm run build` on June 29, 2026; the development server also returned HTTP 200 for `/`.
- `npm run lint` and `npm run build` passed after the documentation sprint on June 28, 2026.
- Production build routes for `/`, `/profile`, and `/research/[id]` were generated successfully.
- Native required-field gating, submission, local response increment, success state, duplicate prevention, and read-only revisit were manually exercised.
- Completed feed state, View Research replacement, and participation-history completion date/link were manually exercised.
- Multiple target-audience suggestion insertion and wizard progression were manually exercised.
- External detail handoff and the unverified notice were manually exercised.
- The exercised browser flows reported no console errors.

## Remaining testing

- Complete a manual browser release pass for Create Research → publish → feed → detail → submit → completed feed → Profile History.
- Exercise all 11 question types in creation, preview, participant input, validation, and read-only display.
- Verify refresh behavior for session-created posts and local participation, duplicate submission blocking, and feed/detail response-count parity.
- Check mobile wizard keyboard behavior, safe areas, overflow, touch targets, date/time controls, and rating layout on iPhone/Android sizes.
- Verify valid and invalid external HTTP/HTTPS links and confirm external forms still open from detail only.
- The v0.4D in-app browser could not navigate to the local server; do not treat the current release as interactively browser-verified until the manual pass above is recorded.
- Re-run lint and production build after any release-blocking fix.
- Add automated tests for storage parsing, duplicate prevention, form validation, and post conversion.
- Add end-to-end coverage for publish → feed → detail → submit → feed completed → profile history.
- Exercise option deletion/duplicate edge cases, malformed/old storage, and orphaned history records.
- Verify real Google Forms, Microsoft Forms, Typeform, invalid URL, and blocked-popup behavior.
- Test expired deadlines, full response targets, zero/negative targets, and timezone boundaries once closing behavior is implemented.
- Perform keyboard, focus-trap, screen-reader, contrast, reduced-motion, and touch-target audits.
- Check iPhone, Android, iPad, 1024px laptop, 1440px desktop, and 1920px large-monitor layouts.
- Test long translations, long hashtags/audiences, and narrow viewport overflow.
