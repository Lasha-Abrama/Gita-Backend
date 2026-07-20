# Quibly Backend

Express, MongoDB, JWT, and Socket.IO backend for the Quibly quiz application.

## Environment

Copy `.env.example` to `.env` and set a real MongoDB connection string and a
long random JWT secret.

## Run

```bash
npm install
npm run dev
```

The API runs at `http://localhost:3000`.

## Authentication

- `POST /api/auth/sign-up`
- `POST /api/auth/sign-in`
- `GET /api/auth/current-user`
- `PATCH /api/users/me` — username only

Pass the token as `Authorization: Bearer <token>` when submitting an answer.
Socket.IO clients pass the same token as `auth.token`.
The `online-users:update` event sends each client a list of the other online
accounts, excluding that client's own user.

## Verify the complete auth/live flow

With the backend running:

```bash
npm run test:auth
npm run test:online
```
