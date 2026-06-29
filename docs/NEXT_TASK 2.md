# Next Task

## Recommended sprint: Research Detail Polish and Session State Unification

The next sprint should consolidate session post and response state behind a small typed client-side repository or context. The feed and detail route should display the same locally updated response count after navigation in either direction.

Suggested scope:

- Add a shared session-state adapter for created posts and completed native responses.
- Restore current-session created posts into the community feed after returning from a detail page.
- Show a compact “You responded” state on feed cards.
- Add detail-page not-found, expired-session, and closed/deadline states.
- Add form-level validation summaries and focus the first invalid required question.
- Add focused component tests for response-mode and question-type branches.

Out of scope until explicitly approved: Supabase, authentication, database migrations, server actions, payments, email, and provider OAuth.
