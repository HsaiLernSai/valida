# Valida Roadmap

Status describes the current repository, not an external production service. Items under “In progress” are intentionally explicit; most phases have no active implementation yet.

## Phase 1 — Community

### Completed

- Responsive community shell, compact feed, research cards, internal detail links, mock discovery widgets, hashtag presentation, and creation entry points.
- Research goals, limited/unlimited responses, deadline/open-ended status, and multi-audience chips.

### In progress

- None. The present feed is a stable frontend prototype.

### Planned

- Functional search, feed sorting/tabs, hashtag filters, bookmarks, and reaction state.
- Open/closed request rules based on target and deadline.

### Future

- Moderation, reporting, recommendation ranking, collections, and richer discussions.

## Phase 2 — Native Forms

### Completed

- Native/external response choice; four native question types; required validation; builder, preview, detail rendering, local submit, duplicate protection, completed state, and read-only answers.

### In progress

- None. v0.2 is complete at frontend-prototype scope.

### Planned

- Versioned client storage, synchronized local counts, draft recovery, validation tests, and better builder accessibility.

### Future

- Conditional logic, sections, richer field types, response editing policy, exports, templates, and verified provider integrations.

## Phase 3 — Profiles

### Completed

- Participation History route with completion dates and research-detail links.

### In progress

- None.

### Planned

- Local profile/settings model, My Research, saved/bookmarked research, and clearer history states.

### Future

- Public researcher profiles, expertise, reputation, organizations, teams, privacy controls, and real account identity after backend approval.

## Phase 4 — Sharing

### Completed

- Research has stable client-side route shapes and external forms open in a new tab.

### In progress

- None; Share controls are presentational.

### Planned

- Web Share/clipboard behavior, shareable research links, Open Graph metadata, and QR codes.

### Future

- Embeds, campaigns, referral attribution, social previews, and organization-branded sharing.

## Phase 5 — Credits

### Completed

- No credit or reward logic exists.

### In progress

- None.

### Planned

- Define earning/spending rules, anti-abuse constraints, expiry policy, and transparent balances before UI implementation.

### Future

- Participation credits, creator boosts, rewards, subscriptions, and paid research plans.

## Phase 6 — Analytics

### Completed

- Cards and detail pages display mock response and engagement counts; native detail can add one local response.

### In progress

- None.

### Planned

- Creator dashboard specifications: views, opens, starts, completions, conversion, drop-off, response timing, and audience breakdown.

### Future

- Funnels, cohorts, exports, AI summaries/insights, benchmarks, team reports, and privacy-aware event analytics.

## Phase 7 — Backend

### Completed

- Frontend types and documented relational candidates provide a starting contract. No backend code exists.

### In progress

- None. Backend, Supabase, and authentication are explicitly out of current scope.

### Planned

- Approve an architecture, define authorization/retention requirements, create migrations and APIs, then migrate browser data safely.

### Future

- Authentication, PostgreSQL/Supabase or approved alternative, row-level authorization, realtime notifications, file storage, jobs, observability, backups, and multi-device synchronization.
