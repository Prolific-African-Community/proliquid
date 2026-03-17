# Proliquid

## Authentication + Funds API

This project now includes JWT authentication, role-based API access, and Prisma/PostgreSQL integration.

### Roles

- `ADMIN`
- `GP`
- `LP`

### Environment

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

Required variables:

- `DATABASE_URL`
- `JWT_SECRET`

### Prisma

```bash
npm run prisma:generate
npm run prisma:migrate -- --name init
```

### API Endpoints

- `POST /api/auth/register`
  - body: `{ "email": string, "password": string, "role"?: "ADMIN" | "GP" | "LP" }`
- `POST /api/auth/login`
  - body: `{ "email": string, "password": string }`
- `GET /api/funds`
  - requires `Authorization: Bearer <token>`
  - allowed roles: `ADMIN`, `GP`
