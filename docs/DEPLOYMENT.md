# Deployment

## Local development

Requirements: a supported Node.js release and npm. Install dependencies once with `npm install`, then start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`. The current application is frontend-only and needs no environment variables.

## Production validation

Every deploy candidate must pass:

```bash
npm run lint
npm run build
```

Use `npm start` to serve a completed production build locally when needed.

## Future hosting target

The intended web deployment target is **Vercel**, using the repository’s production branch and the framework defaults for Next.js. Preview deployments should be used for product and responsive review before production promotion. Domain, analytics, monitoring, and rollback policy must be decided before launch.

## Future backend target

The intended database and authentication target is **Supabase**. Do not add Supabase, database access, or authentication until explicitly requested and the data/authorization design has been approved.

## Environment variable placeholders

A future local `.env.local` may include placeholders such as:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

These variables are not currently required. Never commit `.env.local` or secrets. Only variables prefixed with `NEXT_PUBLIC_` may be exposed to browser code; service-role keys must remain server-only and in managed deployment secrets.
