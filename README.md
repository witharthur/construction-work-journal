# Construction Work Journal

A production-ready full-stack web application for foremen to track daily completed construction work.

## Stack

- Frontend: React, TypeScript, Vite, Material UI, TanStack Query, React Hook Form, Zod, Axios
- Backend: Node.js, Express, TypeScript, Prisma ORM, Zod
- Database: PostgreSQL

## Project Structure

```text
construction-work-journal/
  backend/
    prisma/
    src/
      controllers/
      middleware/
      repositories/
      routes/
      services/
      validators/
  frontend/
    src/
      api/
      components/
      features/
      lib/
```

## Installation

```bash
npm install
```

## Environment Variables

Create `backend/.env`:

```env
DATABASE_URL="postgres://USER:PASSWORD@HOST:5432/postgres?sslmode=require"
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Prisma Setup

Generate the Prisma client:

```bash
npm run prisma:generate
```

Apply the included migration:

```bash
npm run prisma:deploy
```

Create a new migration during development:

```bash
npm run prisma:migrate
```

Seed work type options and sample entries:

```bash
npm run prisma:seed
```

Open Prisma Studio:

```bash
npm run prisma:studio --workspace backend
```

## Running The App

Run backend and frontend together:

```bash
npm run dev
```

Or separately:

```bash
npm run dev:backend
npm run dev:frontend
```

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/health

## API Examples

List entries:

```bash
curl "http://localhost:5000/api/entries"
```

Filter by date:

```bash
curl "http://localhost:5000/api/entries?date=2026-05-28"
```

Search and sort:

```bash
curl "http://localhost:5000/api/entries?search=concrete&sort=asc"
```

Create an entry:

```bash
curl -X POST "http://localhost:5000/api/entries" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-05-28",
    "workType": "Concrete Pour",
    "volume": 42.5,
    "unit": "m3",
    "workerName": "Aram Petrosyan"
  }'
```

Update an entry:

```bash
curl -X PUT "http://localhost:5000/api/entries/{id}" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-05-29",
    "workType": "Rebar Installation",
    "volume": 1200,
    "unit": "kg",
    "workerName": "Mariam Hakobyan"
  }'
```

Delete an entry:

```bash
curl -X DELETE "http://localhost:5000/api/entries/{id}"
```

List work type options:

```bash
curl "http://localhost:5000/api/work-types"
```

## Quality Commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

The compose file expects `DATABASE_URL` to be available in your shell or in a root `.env` file. The frontend is served on http://localhost:5173 and the backend on http://localhost:5000.

## Notes

- Dates are accepted as `YYYY-MM-DD` and stored as UTC midnight to keep daily reporting stable.
- The delete flow uses an optimistic UI update and rolls back if the API call fails.
- Backend errors return a consistent JSON shape: `{ "message": "...", "details": [...] }`.
