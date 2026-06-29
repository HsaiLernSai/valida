# Valida Feature Matrix

## How to read status

| Status | Meaning |
| --- | --- |
| **Done** | Implemented and working to the explicitly limited frontend-prototype contract. It does not imply production infrastructure. |
| **Current MVP** | Usable today, but intentionally narrow or incomplete as a product capability. |
| **Next** | Approved focus of a future coding sprint. No next sprint is selected while v0.4 awaits manual browser sign-off. |
| **Planned** | Accepted product direction, but not in the next sprint. |
| **Future** | Longer-horizon idea requiring later product/technical decisions. Not implemented. |
| **Out of scope now** | Explicitly prohibited in the current frontend-only phase. |

Status is singular per row. The implementation-truth column records visible shells and partial foundations so they are not mistaken for completed behavior.

## Product capability matrix

| Feature | Status | Current implementation truth | Intended boundary / next condition |
| --- | --- | --- | --- |
| Community Feed | **Done** | Responsive mock feed, functional view tabs, local engagement state, completion state, adjusted counts, sidebars, and mobile navigation work. | Search and live community data remain separate features. |
| Create Research | **Done** | Six-step frontend wizard publishes to the current tab session. | No drafts, server persistence, ownership, or collaboration. |
| Research Detail | **Done** | `/research/[id]` resolves mock/session research, renders native/external response flow, and exposes sharing. Static catalog routes are directly public. | Session-created research has no public server-backed permalink guarantee. |
| Native Survey Builder | **Current MVP** | Professional builder supports short answer, paragraph, multiple choice, checkbox, rating, dropdown, number, email, phone, date, and time; required state, option editing, delete, and preview work. | Advanced logic, uploads, and additional field types remain future work. |
| Native Survey Response | **Current MVP** | All eleven native types render with required/type validation, local submit, idempotency by post ID, read-only revisit, and completed state. | Needs automated browser coverage; responses remain browser-local. |
| External Forms | **Done** | Google Forms, Microsoft Forms, Typeform, and other URLs open from Research Detail only with an unverified warning. | Provider verification/integration is future work. |
| Profile | **Current MVP** | `/profile` uses focused Overview, My Research, Participation, Bookmarks, and Credits tabs with browser-local activity statistics and truthful inactive-feature states. | No editable/public identity, settings, authoritative ownership, credits system, or account. |
| Participation History | **Done** | Lists local completions, dates, detail links, and stored post context for new records when session research expires. | Legacy records without a snapshot use an explicit expired-session fallback; history is not cross-device. |
| Bookmarks | **Planned** | Navigation affordance only; no route, model, or persistence. | Build after survey UX/testing using the versioned storage adapter. |
| Search | **Planned** | Compact search input is visual only. | Add deterministic frontend filtering before any server search. |
| Feed tabs | **Done** | For You preserves community order, Following Hashtags filters to the prototype followed-tag set, and Latest prioritizes current-session publications. | User-managed followed hashtags require a later profile/settings decision. |
| QR sharing | **Current MVP** | Static public research has dependency-free QR generation and PNG download in the Share dialog. | Browser-local research is excluded until server persistence exists; customization is not implemented. |
| Share links | **Current MVP** | Static public research has a responsive dialog, link copy feedback, native device share where supported, QR, and social metadata. | Session-created research truthfully reports that public sharing is unavailable. |
| Auto translation | **Future** | Not implemented. | Detect source language and cache translations only after data/storage architecture is approved. |
| Multi-language: English, Thai, Myanmar, Chinese | **Future** | UI and content are English-only. | Requires localization architecture, translation policy, font/layout QA, and language metadata. |
| Image upload | **Future** | Not implemented; no upload UI or storage. | Requires approved cloud storage, file policy, limits, moderation, and privacy design. |
| Video upload | **Future** | Not implemented; no upload UI or storage. | Requires transcoding/delivery, cloud storage, moderation, limits, and cost policy. |
| File upload | **Future** | Not implemented; no upload UI or storage. | Requires secure storage, scanning, access control, retention, and download policy. |
| Prototype/image annotation | **Future** | Prototype Test is a research goal, but no annotation canvas exists. | Requires asset handling, coordinate/version models, and a dedicated interaction design. |
| Interview research | **Current MVP** | “Find Interview Participants” can be created with native questions or an external link. | Screening, scheduling, consent, quotas, and interview workflow are not implemented. |
| Research collections | **Planned** | Not implemented. | Define private/public ownership and grouping behavior first. |
| Creator dashboard | **Planned** | Not implemented. | Depends on creator identity, authoritative research ownership, and response data. |
| Analytics | **Planned** | Mock counts and one local response adjustment exist; no events or dashboard. | Define metrics and privacy rules before instrumentation. |
| Credits | **Future** | Not implemented. | Requires economic rules, ledger integrity, abuse prevention, and likely backend identity. |
| Notifications | **Planned** | Not implemented. | Requires event definitions and preference/delivery rules; real delivery needs backend work. |
| Moderation | **Planned** | Not implemented. | Define policies, report reasons, review workflow, enforcement, and appeals first. |
| AI survey generation | **Future** | Not implemented. | Requires approved AI provider, prompt/data policy, review UX, safety, and cost controls. |
| AI summary | **Future** | Not implemented. | Requires authoritative response data, consent/privacy policy, quality evaluation, and human review. |
| Backend | **Future** | No server-side product persistence or API exists. | Explicitly out of scope now; architecture requires separate approval. |
| Authentication | **Future** | No accounts or real user identity exist. | Explicitly out of scope now; identity and authorization policy must be approved first. |
| Database | **Future** | No database exists; browser storage is the prototype source. | Explicitly out of scope now; documented models are candidates, not migrations. |
| Cloud storage | **Future** | No object storage, uploads, or remote assets exist. | Explicitly out of scope now; required before real media/file upload. |

## Next sprint boundary

**Professional Native Survey UI v0.4A** and **Rich Native Question Types v0.4B** are implemented. No subsequent coding sprint is selected by this matrix. The current native workflow must continue to preserve external forms, routes, component architecture, browser storage, and frontend-only constraints.

It does **not** include new uploads, translation, AI, analytics, credits, authentication, backend services, database work, or cloud storage.
