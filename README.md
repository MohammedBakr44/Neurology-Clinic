# Neurology

Container-only monorepo with:
- TanStack Start
- tRPC
- Drizzle ORM
- PostgreSQL
- shadcn/ui
- Bun workspaces

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

