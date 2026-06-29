# Valida Changelog

The npm package remains `0.1.0`; the product labels below describe prototype milestones rather than published semantic-version releases.

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
