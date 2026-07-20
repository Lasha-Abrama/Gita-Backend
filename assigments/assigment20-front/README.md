# Quibly Frontend

Production-style quiz interface connected to the `assigment20` Express,
MongoDB, and Socket.IO backend.

## Features

- Landing page and searchable quiz catalog
- JWT sign-up/sign-in with persistent sessions
- Account menu with username editing and logout (email stays read-only)
- Quiz introduction, answering, feedback, saved progress, and results
- Practice retry mode that does not change leaderboard points
- REST leaderboard with real-time Socket.IO updates
- Clickable live online-user list that excludes the signed-in account
- Georgian/English language toggle, including all 100 questions and answers
- Responsive layouts, accessible controls, loaders, empty states, and toasts

## Environment

Copy `.env.example` to `.env.local` when custom URLs are needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:5173
```

## Run locally

Start the backend first from `assigment20`, then in this directory run:

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:3000`

The backend `.env` must contain `MONGO_URL` and `JWT_SECRET`. A safe template is
available in `assigment20/.env.example`.

## Verify

```bash
npm run lint
npm run build
npm test
```
