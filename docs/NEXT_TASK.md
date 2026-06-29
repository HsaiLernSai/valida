# Next Tasks

## Next coding sprint — Professional Native Survey UX v0.4

**Outcome:** make the existing native survey builder and preview feel clear, efficient, trustworthy, responsive, and keyboard-usable without changing infrastructure or mixing in unrelated roadmap features.

**Sprint guardrails:** frontend-only; preserve the four existing question types and stored data shape; preserve external forms and current routes; no uploads, annotation, translation, AI, profiles/bookmarks, analytics, credits, notifications, backend, auth, database, Supabase, cloud storage, payments, or real file handling.

## Priority 1 — Professional question editor foundation

**Goal:** Refine the existing `NativeFormBuilder` into a focused question-editing experience with clear question hierarchy, type selection, required state, option editing, add/delete actions, and useful empty state. Keep components small rather than growing one monolith.

**Files involved:** `components/research/NativeFormBuilder.tsx`, `components/research/ResponseMethodStep.tsx`, focused new question-editor components under `components/research/`, `components/ui/` primitives where genuinely reusable, `lib/types.ts`, and `lib/research-defaults.ts`.

**Acceptance criteria:**

- Short answer, paragraph, multiple choice, and checkbox remain supported with the existing `NativeFormQuestion` contract.
- Each question clearly shows its type, prompt, required state, options where applicable, and delete action.
- Multiple-choice/checkbox options can be added, edited, and removed without losing unrelated draft data.
- New questions receive collision-safe IDs within the current frontend session.
- Empty and incomplete question states provide actionable guidance.
- The editor remains usable on mobile and desktop and does not redesign the rest of the wizard.
- External-link creation is unchanged.
- `npm run lint` and `npm run build` pass.

**Dependencies:** Existing wizard state, `NativeFormQuestion`, design tokens, shared controls, and current builder behavior. No new persistence or service dependency.

## Priority 2 — Validation and preview confidence

**Goal:** Make creation-time validation and Step 6 preview accurately communicate what participants will receive before publication.

**Files involved:** `components/research/CreateResearchWizard.tsx`, `components/research/NativeFormBuilder.tsx`, `components/research/PreviewPublishStep.tsx`, `components/research/NativeFormRenderer.tsx`, and small validation helpers under `lib/` if shared by builder and renderer.

**Acceptance criteria:**

- Blank prompts and invalid empty choice sets cannot silently publish.
- Validation appears near the affected question and preserves entered data.
- Preview uses the same labels, required indicators, option order, and control types as Research Detail.
- External-form preview and publication remain unchanged.
- Existing native submissions remain idempotent and completed responses remain read-only.
- No new question types or conditional logic are introduced in this sprint.
- `npm run lint` and `npm run build` pass.

**Dependencies:** Priority 1 question-editor structure and current `NativeFormRenderer` contract.

## Priority 3 — Accessibility and regression coverage

**Goal:** Protect the professional survey flow with keyboard/focus improvements and focused automated tests.

**Files involved:** the Priority 1–2 components, `components/research/CreateResearchWizard.tsx`, `lib/browser-storage.ts`, `lib/research-storage.ts`, `lib/participation-storage.ts`, `package.json`, selected test configuration, and focused unit/component/browser specifications.

**Acceptance criteria:**

- Question type, required, add-option, delete, wizard navigation, close, preview, and publish controls are keyboard operable with visible focus.
- Wizard dialog focus entry, Escape/close behavior, and trigger focus restoration are audited and corrected within the existing modal design.
- Tests cover question validation, option mutations, preview parity, native publish/submit/completed revisit, storage schema failures/upgrades, and external handoff.
- The documented test command is deterministic.
- `npm run lint`, the chosen test command, and `npm run build` pass.

**Dependencies:** Priorities 1 and 2. Selecting a test runner remains an explicit engineering choice; do not add unrelated tooling.
