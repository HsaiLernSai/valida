# Valida Product Blueprint

## Vision

Make early validation a normal, accessible step before people invest heavily in products, services, designs, or research programs.

## Mission

Connect people who need evidence with people willing to share relevant experience, and give both sides a clear, respectful workflow from research request to usable response.

**Brand promise:** Validate Before You Build.

## Problem statement

Founders, students, researchers, designers, and product teams often struggle to find suitable participants quickly. Requests are fragmented across social posts, private groups, spreadsheets, and form links; context is inconsistent, participation status is unclear, and external submissions are hard to verify. Potential participants, meanwhile, cannot easily judge relevance, effort, deadline, or remaining need.

## Target users

- Early-stage founders validating demand and positioning.
- UX and product researchers recruiting interview or usability participants.
- Product managers and designers testing concepts and prototypes.
- Students and academic teams collecting survey or interview data.
- Small-business owners seeking focused customer feedback.
- Community members who enjoy influencing useful products and research.

## Primary personas

### The early founder

Has a hypothesis and limited research operations. Needs quick audience access, a credible request page, and enough responses to decide whether to build.

### The product researcher

Needs qualified participants, precise audience criteria, clear response targets, and eventually structured response management and analytics.

### The student researcher

Needs an approachable way to recruit survey participants, explain a deadline, and share an existing Google or Microsoft form.

### The community participant

Wants relevant, trustworthy requests with transparent effort, purpose, and completion state—and does not want to submit the same request twice.

## Core user journey

1. Discover all open research in one community feed; hashtags and feed controls improve visibility rather than creating separate rooms.
2. Inspect goal, estimated time, target audiences, response need, deadline, and request summary.
3. Open the internal Valida research detail page.
4. Complete a native Valida form, or follow a clearly labeled external-form link.
5. See a success/completed state and retain the research in the feed as View Research.
6. Revisit completed work in Participation History.
7. Creator reviews responses and insights in later phases; this is not implemented today.

## Core features

- Community research feed and research detail pages.
- Research goals: Collect Survey, Find Interview Participants, Prototype Test, Validate Business Idea, Design Feedback, and Open Discussion.
- Limited or unlimited response collection.
- Deadline or no-deadline requests.
- Multi-tag target audiences and hashtags.
- Six-step Create Research Wizard.
- External form links with an explicit unverified warning.
- Native Valida form builder, renderer, validation, submission, and local completion history.

These are prototype capabilities, not production services. The current implementation uses mock data, React state, versioned `sessionStorage`, and versioned `localStorage`; it has no account identity or shared data source.

## Product capability layers

### Layer 1 — Discover and understand research

Community Feed, compact research cards, Research Detail, goal/effort/audience/capacity/deadline metadata, hashtags, and completed state. This layer is working with mock and browser-local data. Search and feed tabs are visible but not functional.

### Layer 2 — Create a research request

The six-step Create Research Wizard supports six goals, external or native collection, multiple audiences, response limits, timing, hashtags, preview, and session publishing. The next coding sprint improves the native survey creation experience; it does not add infrastructure.

### Layer 3 — Participate and retain local history

Native questions can be validated and submitted once per browser profile, then revisited read-only. External forms remain first-class but unverified. Participation History is browser-local and gracefully handles a missing session-created post.

### Layer 4 — Manage and learn

Bookmarks, creator dashboard, authoritative response management, analytics, notifications, collections, and moderation are not implemented. They require individual scoped sprints and, for authoritative/cross-device behavior, later backend decisions.

### Layer 5 — Scale the network

Credits, organizations, AI assistance, multilingual translation, media/file uploads, annotation, verified integrations, authentication, database, and cloud storage are future capabilities. They are not part of the current MVP.

## Create Research Wizard flow

1. **Goal:** choose a supported research goal.
2. **Basic information and response method:** enter title, description, estimated time; choose external link or native form; provide the link or build questions.
3. **Target audience:** add and remove multiple audience tags, including suggestions.
4. **Response settings:** choose limited/unlimited and deadline/no deadline, with conditional target/date inputs.
5. **Hashtags:** add relevant discovery tags.
6. **Preview and publish:** review the card and native form or external destination, then publish to the current session feed.

## Future features

- **Planned product work:** functional search/feed tabs, bookmarks, share links/QR codes, research collections, creator dashboard, analytics, notifications, moderation, and richer interview workflows.
- **Future research tooling:** form templates, conditional logic, additional question types, prototype/image annotation, response exports, and verified Google Forms, Microsoft Forms, and Typeform integrations. Current external links remain supported but unverified.
- **Future language support:** English, Thai, Myanmar, and Chinese UI/content support plus auto-translation with detected source language and cached translated content. None is implemented today.
- **Future media:** image, video, and file uploads only after storage, security, moderation, retention, privacy, limits, and cost policies are approved. There is no real upload logic today.
- **Future intelligence:** AI survey generation and AI response summaries only with explicit data-use policy, quality evaluation, human review, and provider/cost decisions.
- **Future platform:** credits/rewards, organizations, backend accounts, authentication, database persistence, cloud storage, and cross-device synchronization only after explicit product approval.

The authoritative implementation status is maintained in `FEATURE_MATRIX.md`; uncommitted concepts belong in `IDEA_BACKLOG.md`.

## Next product sprint

The next coding sprint is **Professional Native Survey UX v0.4**.

Its goal is to improve the existing native survey builder and preview so creating a clear survey feels deliberate and professional. It should refine question-card hierarchy, type selection, required-state clarity, option editing, validation guidance, builder navigation, empty states, and responsive/keyboard usability while preserving existing form data and response behavior.

The sprint must not absorb unrelated features. It excludes uploads, annotations, translation, AI, sharing, profiles/bookmarks, analytics, credits, notifications, backend, authentication, database, cloud storage, and payment work.

## Product philosophy

- Research requests should explain purpose, audience, effort, and remaining need before asking for attention.
- Completion is useful history, not content to hide.
- Native forms can be verified within Valida’s product flow; external claims must never be presented as verified without integration evidence.
- Start with focused research utility, not generic social-media mechanics.
- Hashtags aid discovery; they do not fragment the community into rooms.
- Build trust through transparent state and restrained claims.
- Keep creation progressive and reusable: each wizard step has one job.

## Competitive advantage

Valida combines participant discovery, a structured research brief, native lightweight forms, external-form compatibility, and visible response need in one flow. Unlike a generic form builder, it starts with finding an audience. Unlike a general social network, it makes research intent, effort, and participation state first-class. The strongest long-term moat would be a trusted participant graph and high-quality research matching—not merely another form editor.

## Monetization ideas

These are hypotheses, not committed pricing:

- Free community requests with paid targeting, boosts, or higher active-request limits.
- Pro creator plans for analytics, exports, templates, integrations, and team workspaces.
- Organization subscriptions with governance, branded studies, shared participant pools, and billing controls.
- Credits that compensate valuable participation or fund request distribution, subject to anti-abuse design.
- Managed recruitment or verified-participant services for higher-stakes studies.

Monetization must not create pay-to-misrepresent verification or conceal participant incentives.

## Long-term vision

Valida becomes an evidence network where a creator can move from uncertain idea to correctly matched participants, trustworthy responses, understandable insights, and a documented decision. The product should support solo builders first and grow toward teams and organizations without losing clarity or participant respect.
