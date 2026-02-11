# web-Hib (frontend + backend)

This workspace contains a React frontend and a simple Node.js + Express backend prototype.

## Backend (server)
- Stack: Node.js, Express, MySQL (mysql2), JWT auth, bcrypt for password hashing
- Mock integrations: SMS and Payment are provided as mocked endpoints (no real gateway calls).

Environment (.env) variables (copy from `server/.env.example`):
- `DB_HOST` - MySQL host (default localhost)
- `DB_PORT` - MySQL port (default 3306)
- `DB_USER` - MySQL user
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name (default web_hib)
- `JWT_SECRET` - Secret for signing JWT tokens
- `PORT` - Backend port (default 4000)

Quick start (backend):

```bash
# from repository root
cd server
npm install
# create a .env from .env.example and set DB credentials
# ensure MySQL server is running and the DB user can create the DB
node index.js
# or for development with nodemon
npm run dev
```

APIs (examples):
- `POST /api/auth/register` {name,email,password} -> registers a citizen
- `POST /api/auth/login` {email,password} -> returns `{ token, user }`
- `POST /api/applications` -> create application (requires Authorization: Bearer <token>)
- `GET /api/applications` -> list applications
- `POST /api/payments/pay` -> mock payment (requires auth)
- `POST /api/sms/send` -> mock SMS send (requires auth)

Notes:
- A default admin user is created on first run: `admin@example.com` / `admin123`.
- This backend is a minimal prototype to support UI integration and DFD flows. Replace mock payment/SMS with real integrations in production.

## Frontend (React + Vite)

Run the frontend from the repository root:

```bash
npm install
npm run dev
```

Pages of the prototype:
- `/` Home
- `/apply` New application (save draft or submit)
- `/renew` Renewal
- `/drafts` Offline drafts (sync)
- `/payment/:id` Payment stub
- `/eo` Verification officer queue
- `/admin` Admin dashboard (issue policy)

This project implements role-based logins (citizen, verifier/EO, admin) and basic flows that follow the provided DFD and workflow diagram. Payment, OTP, SMS and policy generation are simulated by the backend stubs.

If you need a diagram or deeper architecture docs, ask and I'll add them.
