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
| Community Feed | **Done** | Responsive mock feed, compact cards, completion state, local adjusted counts, sidebars, and mobile navigation work. | Search, sorting, reactions, and live community data are separate features. |
| Create Research | **Done** | Six-step frontend wizard publishes to the current tab session. | No drafts, server persistence, ownership, or collaboration. |
| Research Detail | **Done** | `/research/[id]` resolves mock/session research and renders native or external response flow. | No public server-backed permalink guarantee. |
| Native Survey Builder | **Current MVP** | Professional builder supports short answer, paragraph, multiple choice, checkbox, rating, dropdown, number, email, phone, date, and time; required state, option editing, delete, and preview work. | Advanced logic, uploads, and additional field types remain future work. |
| Native Survey Response | **Current MVP** | All eleven native types render with required/type validation, local submit, idempotency by post ID, read-only revisit, and completed state. | Needs automated browser coverage; responses remain browser-local. |
| External Forms | **Done** | Google Forms, Microsoft Forms, Typeform, and other URLs open from Research Detail only with an unverified warning. | Provider verification/integration is future work. |
| Profile | **Current MVP** | `/profile` exists as a browser-local Participated surface. | No editable/public identity, settings, ownership, or account. |
| Participation History | **Done** | Lists local native completions, dates, detail links, and graceful missing-session-post fallback. | Not cross-device or account-backed. |
| Bookmarks | **Planned** | Navigation affordance only; no route, model, or persistence. | Build after survey UX/testing using the versioned storage adapter. |
| Search | **Planned** | Compact search input is visual only. | Add deterministic frontend filtering before any server search. |
| Feed tabs | **Planned** | For You, Following Hashtags, and Latest are visual only. | Define Latest ordering and Following semantics before implementation. |
| QR sharing | **Planned** | Not implemented. | Depends on a share-link policy and durable URLs. |
| Share links | **Planned** | Share action is visual; internal detail route shape exists. | Add clipboard/Web Share and social metadata after permalink behavior is defined. |
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
