# Valida Changelog

The npm package remains `0.1.0`; the product labels below describe prototype milestones rather than published semantic-version releases.

## v0.6C — Localization foundation

- Added a central localization dictionary with scalable module-based keys for app chrome, navigation, community, authentication, profile, settings, buttons, search, and language labels.
- Added a lightweight client language provider and translation hook.
- Added supported language options for English, Thai, Myanmar, and Chinese, with English as the complete fallback language.
- Connected Settings → Preferred Language to the language manager so language selection updates the interface immediately and persists locally.
- Persisted language through the existing frontend-only local user/settings layer without backend sync, API integration, or database changes.
- Converted shared app chrome and core visible UI surfaces to translation keys, including navigation, Community header/tabs/search, auth forms, profile shell/details, settings, feed empty state, and primary card action labels.
- Preserved existing routing, authentication flow, survey logic, backend architecture, and package dependencies.
- `npm run lint` and `npm run build` pass.

## v0.6B — User profile and settings foundation

- Expanded the authenticated local user profile with display name, email, avatar placeholder, bio, preferred language, read-only user ID, join date, and local account status.
- Added local profile editing for display name, bio, and preferred language with Save and Cancel actions.
- Added a dedicated protected `/settings` page instead of overloading Profile.
- Added settings sections for Account, Appearance, Language, Notifications, Privacy, Research Preferences, and Danger Zone.
- Added local theme preference support for Light, Dark, and System modes with persisted browser-local settings.
- Added frontend-only notification, privacy, and research-preference toggles/fields with local persistence.
- Added Danger Zone controls for logout, clearing the local session, resetting local user data, resetting settings, and a clearly marked Delete Local Account placeholder.
- Added Settings to authenticated desktop/mobile navigation and Profile-to-Settings navigation.
- Preserved the existing frontend-only architecture: no backend, database, OAuth, cloud storage, external services, uploads, AI, payments, or new dependencies were added.
- `npm run lint` and `npm run build` pass. Production build generates the dedicated `/settings` route.

## v0.6A — Frontend authentication foundation

- Added frontend-only authentication UI for Login, Register, and Forgot Password.
- Added local session state for a minimal user model: `userId`, `displayName`, `email`, `avatar`, `preferredLanguage`, and `createdAt`.
- Added logout behavior that clears the local Valida session and returns the user to Login.
- Protected Profile, My Research, Participation, and Bookmarks with client-side route guards that redirect guests to Login.
- Added dedicated authenticated routes for `/my-research`, `/participation`, and `/bookmarks` while preserving the existing lightweight Profile sections.
- Updated desktop and mobile navigation to show Profile/My Research/Bookmarks for signed-in users and Login/Register for guests.
- Reframed Profile copy from anonymous browser-local profile to signed-in local session while preserving the frontend-only storage boundary.
- Preserved the existing frontend-only architecture: no backend, database, OAuth provider, email verification, profile editing, uploads, AI, analytics, or new dependencies were added.
- `npm run lint` and `npm run build` pass. Production build generates `/login`, `/register`, `/forgot-password`, `/profile`, `/my-research`, `/participation`, and `/bookmarks`.

## v0.5B — Static research sharing

- Replaced the inline share controls with an accessible, responsive Share Research dialog used by feed cards and Research Detail.
- Added public-link copy with success/error feedback and native device sharing where supported.
- Added dependency-free QR generation for the five static public research routes and downloadable PNG QR images.
- Kept browser-local session research truthful: its share dialog explains that public links and QR require future server persistence.
- Preserved direct `/research/[id]` access and polished the public detail header/share entry point.
- `npm run lint` and `npm run build` pass with no package changes. Interactive device-browser sign-off remains pending because local browser navigation did not respond.

## v0.5A — MVP stabilization

- Made Profile available from the shared iPhone/iPad bottom navigation and added working Home, My Research, and Bookmarks destinations.
- Made For You, Following Hashtags, and Latest selectable feed views with truthful filtering/order behavior.
- Completed browser-local community interactions: toggleable animated Interested state, recent and user-posted comments with timestamps/confirmation, copy-link feedback, and native device sharing where supported.
- Added a clear Feed → Research Detail → Start Research → Submit flow; Participate and every Open Research action route to Research Detail.
- Redesigned `/profile` into Overview, My Research, Participation, Bookmarks, and Credits tabs with profile context and basic activity statistics.
- Preserved research title/author/goal snapshots on new participation records so expired session research remains identifiable in History.
- Added framework-native metadata, per-research metadata, `robots.txt`, and `sitemap.xml` without dependencies.
- `npm run lint` and `npm run build` passed on June 29, 2026. Interactive browser automation remained unavailable; iPhone/iPad/desktop interaction sign-off is still pending.
- No authentication, translation, backend, testing framework, or new dependency was added.

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
