# Valida Data Model Reference

## Scope and persistence status

Valida has no database. This document records the exact frontend contracts in `lib/types.ts`, the conceptual models implied by current screens, and concrete future persistence shapes. “Current” means an exported TypeScript type or stored browser record. “Planned” means no runtime model or table exists yet.

## Current models

### ResearchPost

The feed/detail unit and the parent of native form questions.

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | `string` | Unique route/storage identifier. |
| `initials` | `string` | Creator avatar fallback text. |
| `author` | `string` | Creator display name. |
| `role` | `string` | Creator role subtitle. |
| `time` | `string` | Human-readable publish time. |
| `goal` | `ResearchGoal` | One of the six supported goals. |
| `goalStyle` | `string` | Tailwind classes for goal presentation. |
| `avatarStyle` | `string` | Tailwind classes for the avatar placeholder. |
| `title` | `string` | Research title. |
| `description` | `string` | Research summary/full description. |
| `responseMethod` | `"external" \| "native"` | How participation is collected. |
| `externalLink` | `string?` | Destination for external research. |
| `formQuestions` | `NativeFormQuestion[]?` | Native Valida form definition. |
| `hashtags` | `string[]` | Discovery labels. |
| `estimatedTime` | `string` | Participant effort copy, such as “5 min”. |
| `targetAudience` | `string[]` | Multiple audience labels. |
| `responseMode` | `"limited" \| "unlimited"` | Whether a target exists. |
| `responseTarget` | `number?` | Required for a limited request by product rule. |
| `responseCount` | `number` | Base/mock count; not authoritative. |
| `timeMode` | `"deadline" \| "no_deadline"` | Whether a close date exists. |
| `deadline` | `string?` | Date value for a deadline request. |
| `interestedCount` | `number` | Presentational engagement count. |
| `participantCount` | `number` | Presentational participant/action count. |
| `commentCount` | `number` | Presentational comment count. |
| `shareCount` | `number` | Presentational share count. |

### NativeForm

There is no separate exported `NativeForm` object today. The implemented native form is the combination of `ResearchPost.responseMethod === "native"` and `ResearchPost.formQuestions`. Its current concrete shape is therefore:

| Field | Type | Meaning |
| --- | --- | --- |
| `researchPostId` | `ResearchPost.id` (implicit) | Parent identity. |
| `questions` | `NativeFormQuestion[]` | Ordered form definition from `formQuestions`. |

A future normalized record should use `id`, `postId`, `version`, `status`, `createdAt`, and `updatedAt`, but those fields do not exist in the application yet.

### Question / NativeFormQuestion

| Field | Type | Meaning |
| --- | --- | --- |
| `id` | `string` | Unique within the form and answer-map key. |
| `type` | `NativeFormQuestionType` | Renderer/builder control type. |
| `label` | `string` | Prompt shown to participants. |
| `required` | `boolean` | Blocks submit when no valid value is supplied. |
| `options` | `string[]?` | Choices for multiple-choice, checkbox, and dropdown questions. |

Question types are `short_text` (single-line string), `paragraph` (multiline string), `multiple_choice` (one string), `checkbox` (string array), `rating` (a string from `1`–`5`), `dropdown` (one option string), `number` (numeric input stored as a string), `email`, `phone`, `date`, and `time` (all stored as strings). This preserves the existing `NativeFormAnswers` contract.

### Response / NativeFormAnswers

The application has no standalone response object. Submitted answers are `NativeFormAnswers = Record<string, string | string[]>`, keyed by question ID, and are embedded in a participation record. Empty/required validity is enforced in the renderer before save.

A future normalized response needs `id`, `postId`, `formVersion`, `participantId`, `status`, `submittedAt`, and child answer rows or JSON answers. Those fields are not currently captured.

### ParticipationHistory / ParticipationRecord

Stored in `localStorage` at `valida:participation-history` as `{ version: 1, data: ParticipationRecord[] }`. The adapter upgrades a valid legacy bare array on read and rejects malformed or unsupported data safely.

| Field | Type | Meaning |
| --- | --- | --- |
| `postId` | `string` | Research joined to mock/session posts. |
| `completedAt` | `string` | ISO timestamp generated on submit. |
| `answers` | `NativeFormAnswers` | Submitted native answers. |

The storage helper returns the existing record when the same `postId` is saved twice. This is browser-local duplicate protection, not account-level enforcement.

### ResearchWizardData

| Field | Type | Meaning |
| --- | --- | --- |
| `goal` | `ResearchGoal \| null` | Step-one selection. |
| `title` | `string` | Draft title. |
| `description` | `string` | Draft summary. |
| `responseMethod` | `"external" \| "native"` | Draft collection method. |
| `externalLink` | `string` | Draft external URL; blank for native. |
| `formQuestions` | `NativeFormQuestion[]` | Draft native form. |
| `estimatedTime` | `string` | Draft participant effort. |
| `targetAudience` | `string[]` | Draft audience tags. |
| `responseMode` | `"limited" \| "unlimited"` | Draft limit selection. |
| `responseTarget` | `number` | Draft numeric target; ignored for unlimited. |
| `timeMode` | `"deadline" \| "no_deadline"` | Draft timing selection. |
| `deadline` | `string` | Draft date; blank for no deadline. |
| `hashtags` | `string[]` | Draft discovery tags. |

## Planned models that do not yet exist

These are concrete candidate contracts, not claims about implemented code.

### Bookmarks

`id: string`, `postId: string`, `profileId: string`, `createdAt: string`. A profile has many bookmarks; a post has many bookmark joins. For the next frontend sprint, `profileId` can be replaced by a documented browser-profile constant.

### Profile

`id: string`, `displayName: string`, `initials: string`, `role: string`, `bio: string`, `avatarUrl: string | null`, `expertise: string[]`, `languages: string[]`, `createdAt: string`, `updatedAt: string`. Current creator fields are denormalized directly on each `ResearchPost`; there is no editable profile model.

### Settings

`profileId: string`, `theme: "system" | "light"`, `language: "en" | "th" | "my" | "zh"`, `emailNotifications: boolean`, `inAppNotifications: boolean`, `researchUpdates: boolean`, `translationEnabled: boolean`, `updatedAt: string`. No settings screen or stored settings exist today.

## Future relational map

- One Profile/User creates many ResearchPosts.
- One ResearchPost owns zero or one NativeForm; one NativeForm owns ordered Questions.
- One Profile/User can submit at most one finalized Response per ResearchPost; a Response contains answers keyed/joined to Questions.
- Profiles and ResearchPosts form a many-to-many bookmark relationship through Bookmarks.
- Participation History is a read model derived from submitted Responses, not a separate source of truth in a backend design.
- Settings belong one-to-one to a Profile/User.
- Hashtags and ResearchPosts become many-to-many through `post_hashtags` when normalized.

Future translation support should retain `sourceLanguage`, translated language, source-content version/hash, translated content, provider/model metadata, and timestamps so English, Thai, Myanmar, and Chinese translations can be detected and cached safely.

## Future backend table candidates

When a backend is explicitly approved, evaluate: `users`, `profiles`, `settings`, `posts`, `native_forms`, `questions`, `responses`, `answers`, `comments`, `reactions`, `hashtags`, `post_hashtags`, `bookmarks`, `notifications`, `credits`, and `surveys`. Authorization, deletion/retention, consent, response anonymity, and one-user-one-submission constraints must be designed before migrations—not inferred from the browser prototype.
