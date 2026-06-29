# Valida

**Validate Before You Build.**

Valida is a research community product for discovering participants and collecting useful feedback before committing significant time or money to an idea. Creators can publish surveys, interview requests, prototype tests, business-idea validations, design-feedback requests, and open discussions. Participants can review a structured brief and respond through either a native Valida form or an external form.

This repository contains the frontend-only Valida prototype. The implementation is intentionally focused on validating the product experience before introducing production infrastructure.

## Current prototype scope

The prototype supports the complete browser-local journey from discovery to participation:

1. Browse research requests in the responsive Community Feed.
2. Inspect the goal, estimated time, target audiences, response need, and deadline.
3. Create and preview a request through the six-step Create Research Wizard.
4. Publish the request to the current browser-tab session.
5. Open a dedicated research detail page.
6. Complete a native Valida form or continue to an external form.
7. Revisit locally completed native research from Profile → Participated.

Mock research is the base catalog. Newly created requests are stored in `sessionStorage`; native participation records are stored in `localStorage`.

## Tech stack

- [Next.js 14](https://nextjs.org/) with the App Router
- [React 18](https://react.dev/)
- TypeScript
- Tailwind CSS
- ESLint with the Next.js configuration
- React state, `sessionStorage`, and `localStorage` for prototype data

## Core features

- Compact responsive community feed with desktop sidebars and mobile navigation.
- Research goals for surveys, interviews, prototypes, business ideas, design feedback, and open discussions.
- Limited or unlimited response collection.
- Deadline-based or open-ended requests.
- Multiple target-audience tags and hashtags.
- Six-step Create Research Wizard with preview and session publishing.
- Native form builder with short answer, paragraph, multiple-choice, and checkbox questions.
- Required-field validation, browser-local submission, duplicate protection, and read-only completed responses.
- External form support for Google Forms, Microsoft Forms, Typeform, and other URLs.
- Dedicated research detail pages and local participation history.
- Shared UI primitives, design tokens, and reusable layout, feed, research, profile, and sidebar components.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Community Feed and Create Research Wizard entry points. |
| `/research/[id]` | Full research details and native or external response flow. |
| `/profile` | Browser-local Participated history. |

Several navigation controls—including Explore, My Research, and Bookmarks—are currently product affordances rather than completed routes.

## Local setup

Requirements: a supported Node.js release and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Validate a production candidate with:

```bash
npm run lint
npm run build
```

To serve a completed production build locally:

```bash
npm start
```

No environment variables are required for the current prototype.

## Important limitations

- **Frontend-only:** there is no server-side product logic or persistent API.
- **No backend or database:** all research and response state is mock, React, or browser storage data.
- **No authentication:** there are no real accounts or authoritative user identities.
- **No Supabase:** it is only a possible future database/auth target and is not installed or configured.
- Browser-local duplicate protection approximates one submission per browser profile, not one submission per account.
- Session-created research disappears when its tab session ends; participation history can outlive that request metadata.
- Response counts are local/mock values and are not shared or authoritative.
- External form submissions are supported but cannot be verified by Valida in this MVP.
- Search, feed tabs, reactions, comments, sharing, and bookmarks are currently presentational.

See [Project Status](docs/PROJECT_STATUS.md) for the complete issue and testing inventory.

## Current sprint status

- **Package version:** `0.1.0`
- **Product iteration:** Native Form v0.2
- **State:** Native-form UX, participation continuity, documentation, and validation are complete at frontend-prototype scope.
- **Objective:** stabilize the browser-local research journey before expanding Profile, Bookmarks, or other product surfaces.

There is no partially implemented product feature in the current workspace. The latest documented lint and production-build checks pass.

## Next priorities

1. **Consolidate and version client storage.** Centralize keys and parsing, handle malformed/old data safely, align the lifetime of created research and participation, and synchronize local counts across feed, detail, and history.
2. **Add focused automated coverage.** Protect storage, native validation, publish/submit/completed-state behavior, participation history, and external handoff with unit and end-to-end tests.
3. **Finish the local Profile and Bookmarks MVP.** Add browser-local bookmark behavior and a truthful profile surface after the shared storage contract is stable.

Acceptance criteria, dependencies, and exact files are documented in [Next Tasks](docs/NEXT_TASK.md).

## Project documentation

- [Handoff](docs/HANDOFF.md) — fastest starting point for a new development session.
- [Project Status](docs/PROJECT_STATUS.md) — implementation, completed work, issues, and testing.
- [Product Blueprint](docs/PRODUCT_BLUEPRINT.md) — vision, users, journey, and product direction.
- [Roadmap](docs/ROADMAP.md) — phased long-term plan.
- [Component Architecture](docs/COMPONENT_ARCHITECTURE.md) — route, component, and data-flow boundaries.
- [Data Model Reference](docs/DATABASE.md) — current frontend contracts and future model candidates.
- [Development Rules](docs/DEVELOPMENT_RULES.md) — scope, architecture, responsive, and quality guardrails.
- [UI Guidelines](docs/UI_GUIDELINES.md) and [UI System](docs/UI_SYSTEM.md) — visual and interaction standards.
- [Changelog](docs/CHANGELOG.md) and [Idea Backlog](docs/IDEA_BACKLOG.md) — completed milestones and unimplemented ideas.
