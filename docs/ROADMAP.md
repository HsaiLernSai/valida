# Valida Roadmap

This roadmap separates shipped prototype capability from the next coding sprint and longer-horizon product work. “Completed” always means completed to the current frontend-only prototype contract—not production-ready or server-backed. The detailed per-feature truth lives in `FEATURE_MATRIX.md`.

## Phase 1 — Community foundation

### Completed

- Responsive community shell, compact feed/cards, mock discovery widgets, six research goals, response-limit/deadline metadata, audiences, hashtags, internal detail links, completed state, and local adjusted counts.

### In progress

- None.

### Planned

- Functional search and feed tabs, real bookmark behavior, share links, QR sharing, and request close-state rules.

### Future

- Recommendation ranking, richer discussion, collections, topic following, reporting, and moderation.

## Phase 2 — Research creation and native surveys

### Completed

- Six-step Create Research Wizard, external/native selection, four native question types, required controls, choice editing, preview, session publishing, native response validation/submission, duplicate protection, and read-only revisit.

### In progress

- Documentation and scope preparation only; no UI implementation is currently active.

### Planned

- Complete manual v0.4 browser release sign-off, then add focused automated tests for storage, form validation, publish, submit, completion, history, and external handoff.

### Future

- Templates, sections, conditional logic, richer question types, drafts, response editing policy, exports, and verified provider integrations.

## Phase 3 — Profiles and personal organization

### Completed

- Browser-local Participation History with completion dates, detail links, and missing-session-post fallback.

### In progress

- None.

### Planned

- Local Profile clarification, Bookmarks route/storage, My Research, and saved research organization.

### Future

- Public profiles, expertise, reputation, teams, organizations, privacy controls, and real account identity after backend approval.

## Phase 4 — Sharing and collections

### Completed

- Internal detail route shapes exist; external form links open from detail only.

### In progress

- None. Current Share controls are presentational.

### Planned

- Clipboard/Web Share behavior, durable share-link policy, Open Graph metadata, QR codes, and research collections.

### Future

- Embeds, campaigns, referral attribution, social previews, and organization-branded sharing.

## Phase 5 — Research operations

### Completed

- Interview-participant recruitment exists only as a research goal using the generic native/external workflow.

### In progress

- None.

### Planned

- Creator dashboard specifications, response management, analytics definitions, notifications, moderation, and richer interview recruitment workflows.

### Future

- Scheduling, screening/quotas, team review, repositories, exports, benchmarks, and verified participant pools.

## Phase 6 — Language, media, and advanced feedback

### Completed

- None. The current product is English-only and has no upload or annotation capability.

### In progress

- None.

### Planned

- Product/design research for multilingual architecture and safe asset workflows; no implementation commitment yet.

### Future

- English, Thai, Myanmar, and Chinese localization; detected/cached auto-translation; image/video/file uploads; and prototype/image annotation.

## Phase 7 — Intelligence and incentives

### Completed

- None.

### In progress

- None.

### Planned

- Define AI data-use, evaluation, review, and cost policies; define credit economics and anti-abuse rules before implementation.

### Future

- AI survey generation, AI summaries/insights, credits, creator boosts, participant rewards, subscriptions, and paid research plans.

## Phase 8 — Backend platform

### Completed

- Versioned browser-storage adapters and documented model candidates provide a frontend contract. No backend capability exists.

### In progress

- None. Backend, authentication, database, Supabase, cloud storage, payments, and real uploads are explicitly out of scope now.

### Planned

- Only after explicit approval: choose architecture, define identity/authorization, consent, retention/deletion, moderation, upload security, and migration requirements.

### Future

- Authentication, approved database/backend, row-level authorization, object/cloud storage, realtime notifications, jobs, observability, backups, multi-device synchronization, and billing infrastructure.

## Sequencing rule

Do not pull a feature forward merely because a visible control already exists. Each coding sprint must name one product outcome, list explicit exclusions, preserve the external-form path, and pass lint/build. No new coding sprint is selected until v0.4 manual browser sign-off is recorded.
