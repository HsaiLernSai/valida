# Valida Component Architecture

## Route composition

| File/component | Responsibility |
| --- | --- |
| `app/layout.tsx` | Root HTML/body metadata and global wrapper. |
| `app/page.tsx` | Thin home route; renders `ResearchWorkspace`. |
| `app/research/[id]/page.tsx` | Thin dynamic route; passes the URL ID to `ResearchDetail`. |
| `app/profile/page.tsx` | Thin profile route; renders `ParticipationHistory`. |
| `ResearchWorkspace` | Home-page client coordinator: loads session posts, owns wizard open state, prepends/persists published posts, and supplies `AppShell`. |

## Layout and navigation

| Component | Responsibility |
| --- | --- |
| `AppShell` | Responsive page grid and common composition for sidebars, sticky header, feed, create affordances, and mobile navigation. |
| `LeftSidebar` | Desktop Valida logo, grouped Main/My Space navigation, primary Start research CTA, and small footer links. |
| `StickyCommunityHeader` | Compact sticky title, subtitle, and feed tabs above the center column. |
| `RightSidebar` | Desktop discovery rail: search and compact community widgets. |
| `MobileBottomNav` | Persistent small-screen navigation including the labeled New Research action. |
| `CreateResearchButton` | Shared creation trigger presentation; desktop sidebar CTA and tablet/mobile floating behavior ultimately call the same wizard callback. |

Navigation items come from `lib/mock-data.ts`. Only Home, Profile, and internal research detail currently have substantive routes; other destinations are product affordances, not complete pages.

## Community feed and research card

| Component | Responsibility |
| --- | --- |
| `Feed` | Reads local participation IDs and renders ordered posts without removing completed items. |
| `FeedTabs` | Presentational For You, Following Hashtags, and Latest controls; filtering is not implemented. |
| `PostCard` | Canonical compact research summary: creator, goal, content, audience chips, timing, progress, hashtags, completion state, internal detail CTA, and visual action counts. Preview also reuses this component. |

The research card deliberately routes Open Research/View Research to `/research/[id]`. It does not open external forms directly, and metadata chips are not links. Interested, Participate, Comment, and Share are currently display controls; completed native research disables participation semantics and presents View Research.

## Create Research Wizard

| Component | Responsibility |
| --- | --- |
| `CreateResearchWizard` | Modal/overlay controller, six-step navigation, local draft state, validation gates, close behavior, and publish conversion. |
| `ResearchGoalStep` | Selects one of the six research goals. |
| `BasicInfoStep` | Captures title, description, estimated time, and embeds response-method configuration. |
| `ResponseMethodStep` | Switches external/native modes; shows external URL input or `NativeFormBuilder`. |
| `NativeFormBuilder` | Adds/deletes questions, changes among 11 native types, edits labels, toggles required, and manages unique options for multiple choice, checkbox, and dropdown. |
| `TargetAudienceStep` | Manages `string[]` audience tags, suggested-tag insertion, custom entry, and removal. |
| `ResponseSettingsStep` | Configures limited/unlimited responses and deadline/no-deadline timing with conditional inputs. |
| `HashtagsStep` | Manages suggested/custom hashtags. |
| `PreviewPublishStep` | Reuses `PostCard` for the request and previews native questions or the external destination before publish. |

Wizard steps must remain separate. Shared draft contracts live in `lib/types.ts`; options/defaults live in `lib/research-defaults.ts`.

## Research detail and response collection

| Component | Responsibility |
| --- | --- |
| `ResearchDetail` | Resolves mock/session post by ID, reads local completion, owns locally displayed count and submitted state, and composes detail panels. |
| `ResearchMetaPanel` | Presents response mode/count/progress and deadline/open-ended metadata. |
| `NativeFormRenderer` | Renders four control types, tracks answer state, validates required values, submits once, and supports read-only answers after completion. |
| `ExternalFormPanel` | Presents a safe new-tab external CTA and the unverified-submission warning. |

Mock posts come from `lib/mock-data.ts`; newly published posts are read from `valida:session-posts`. Native completion is read/saved through `lib/participation-storage.ts`.

## Profile, history, and bookmarks

| Component/surface | Responsibility/status |
| --- | --- |
| `ParticipationHistory` | Current Profile content: loads completion records, joins them to mock/session posts, formats completion date, and links to detail. |
| Profile | Exists only as the `/profile` history surface; no editable profile or settings model exists. |
| History | Implemented by `ParticipationHistory`, not a separate route. |
| Bookmarks | Navigation affordance only. There is no bookmark component, route, model, or storage behavior yet. |

## Search, sidebars, and community widgets

| Component | Responsibility |
| --- | --- |
| `SearchBar` | Shared compact search input presentation; query/filter behavior is not implemented. |
| `TrendingResearch` | Renders mock trending research topics. |
| `PopularHashtags` | Renders popular hashtag chips/count context from mock data. |
| `QuickStart` | Renders suggested research goals; creation preselection is not implemented. |
| `CommunityPulse` | Renders static online, responses-today, and open-request metrics. |

## Shared UI and libraries

- `Button`, `Card`, `Badge`, `SearchBar`, and `Icon` are shared primitives.
- `ValidaLogo` is the canonical CSS/Tailwind gradient mark with compact/full/mark-only variants. `Logo.tsx` is legacy.
- `lib/types.ts` is the shared contract boundary.
- `lib/mock-data.ts` holds posts, navigation, discovery widgets, and quick-start data.
- `lib/research-defaults.ts` holds wizard choices and initial values.
- `lib/browser-storage.ts` owns storage keys, schema versioning, safe parsing/writing, and legacy collection upgrades.
- `lib/research-storage.ts` validates, reads, merges, finds, and writes session-created research.
- `lib/participation-storage.ts` validates participation, enforces idempotency, and derives completion IDs and local response counts.
- `lib/design-tokens.ts` documents canonical visual values; repeated new styles should start there.

## Data-flow boundaries

Server components are used only as thin route entry points. Any code that touches `window`, `localStorage`, `sessionStorage`, or interactive state is a client component. Browser storage must never be read during server render. Parent coordinators own state; leaf UI components receive typed props and callbacks. Avoid adding a global state library until actual cross-route complexity justifies it.
