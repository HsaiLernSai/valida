# Next Tasks

Only the three immediate priorities belong here. Backend, authentication, credits, and broader roadmap work remain explicitly out of scope.

## Priority 1 — Consolidate and version client storage

**Goal:** Make session-created research, participation, and local response counts use a small typed storage API with schema versioning and safe malformed-data handling. Resolve the current mismatch where detail shows the local `+1` but feed cards retain the base count.

**Files involved:** `lib/participation-storage.ts`, a new `lib/research-storage.ts` or equivalent shared adapter, `components/research/ResearchWorkspace.tsx`, `components/research/ResearchDetail.tsx`, `components/profile/ParticipationHistory.tsx`, `components/feed/PostCard.tsx`, and `lib/types.ts`.

**Acceptance criteria:**

- Storage keys and schema versions are centralized.
- Invalid or old JSON fails safely without crashing a route.
- One native submission remains idempotent by post ID.
- Feed, detail, and history derive the same completed state and locally adjusted response count.
- Session-created post metadata remains resolvable for every retained history item, or retention is made intentionally consistent.
- Existing external-form behavior is unchanged.
- `npm run lint` and `npm run build` pass.

**Dependencies:** Existing `ResearchPost`, `ParticipationRecord`, mock data, and browser storage behavior. No external package or backend is required.

## Priority 2 — Add focused automated coverage

**Goal:** Protect the working native-form journey before more product surfaces are added.

**Files involved:** `package.json`, test configuration selected by the developer, tests adjacent to `lib/participation-storage.ts`, `CreateResearchWizard.tsx`, `NativeFormRenderer.tsx`, `ResearchDetail.tsx`, and one browser-level happy-path specification.

**Acceptance criteria:**

- Unit tests cover malformed storage, duplicate saves, required short/paragraph/single/multi-choice validation, and publish-data conversion.
- An integration or end-to-end test covers publish → detail → native submit → completed feed state → participation history.
- External links remain internal-detail-first and then open in a new tab.
- The test command is documented and deterministic.
- Lint, tests, and production build pass.

**Dependencies:** Priority 1 should land first so tests target one storage contract. Selecting a test runner is an explicit engineering decision, not an implicit dependency addition.

## Priority 3 — Finish local Profile and Bookmarks MVP

**Goal:** Turn existing Profile/Bookmarks navigation into coherent frontend-only product surfaces without introducing identity claims that browser storage cannot support.

**Files involved:** `app/profile/page.tsx`, a new `app/bookmarks/page.tsx`, `components/profile/ParticipationHistory.tsx`, new focused profile/bookmark components, `components/layout/LeftSidebar.tsx`, `components/feed/PostCard.tsx`, `lib/types.ts`, and the consolidated storage adapter from Priority 1.

**Acceptance criteria:**

- Users can bookmark/unbookmark a research request and see it on `/bookmarks`.
- Profile clearly labels data as local to the current browser.
- Participation history and bookmarks handle missing/session-expired posts gracefully.
- Metadata remains non-clickable; research titles/CTAs open internal detail.
- Mobile and desktop navigation reach both surfaces.
- No backend, authentication, or fake cross-device guarantees are added.
- `npm run lint` and `npm run build` pass.

**Dependencies:** Priority 1 storage contract and current research-detail routes. Automated coverage from Priority 2 is strongly preferred before expanding storage state.
