# Neurology

Neurology is a container-only monorepo for a referral intake app. It keeps the web app, database access, and UI pieces in separate packages so the code stays easy to change and safe to run in Docker.

## Technology

- TanStack Start: app framework and routing
- tRPC: typed API between browser and server
- Drizzle ORM: database access with type-safe queries
- PostgreSQL: persistent referral storage
- shadcn/ui: shared UI building blocks
- Bun workspaces: fast monorepo package management
- Docker Compose: isolated local development and runtime

## Run

```bash
docker compose -f docker/docker-compose.yml up --build
```

## Logs

```bash
docker compose -f docker/docker-compose.yml logs -f web
docker compose -f docker/docker-compose.yml logs -f db
```

## Install packages

Install inside the web container only:

```bash
docker compose -f docker/docker-compose.yml exec web bun add <package>
```

For binaries you can also use `bunx` inside the container:

```bash
docker compose -f docker/docker-compose.yml exec web bunx <binary>
```

## Request funnel

```text
Browser
  -> TanStack Start route
  -> TanStack Form validation
  -> tRPC mutation
  -> Drizzle insert/query
  -> PostgreSQL
  -> tRPC response
  -> toast + table refresh
```

## How the pieces interact

| Layer | Role | Talks to |
|---|---|---|
| Browser | Renders the form and referrals table | TanStack Start route |
| TanStack Start | Handles routing and server entry | tRPC, React Query |
| TanStack Form | Manages form state and validation | Zod schema |
| Shadcn | Styles UI elements, provides a handful of components to rapid the development | Styling |
| tRPC client | Sends typed requests | tRPC server router |
| tRPC server | Exposes `referrals.create` and `referrals.list` | Drizzle ORM |
| Drizzle ORM | Maps TypeScript fields to SQL columns | PostgreSQL |
| PostgreSQL | Stores referral records | Drizzle ORM |


## Data flow

1. The user fills out the referral form in the browser.
2. TanStack Form validates the input before submit.
3. The submit handler calls the `referrals.create` tRPC mutation.
4. tRPC validates the payload again on the server.
5. Drizzle writes the referral into PostgreSQL.
6. The mutation succeeds or fails.
7. Sonner shows a toast and the referrals query is refreshed.
8. The table tab renders the latest referrals from the database.


