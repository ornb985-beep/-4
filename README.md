# Task Board

A minimal, modern starter application built with **Vite + React + TypeScript**. It
renders an interactive task board (add, complete, filter, and delete tasks) and
serves as the demonstrable app for this repository's Cloud Agent development
environment.

## Requirements

- Node.js 22 (see the version used by the Cloud Agent environment)
- npm 10+

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server on http://localhost:5173
```

## Scripts

| Command             | Description                                   |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the Vite dev server (host 0.0.0.0:5173) |
| `npm run build`     | Type-check and produce a production build     |
| `npm run preview`   | Preview the production build on port 4173     |
| `npm run lint`      | Run ESLint                                    |
| `npm run typecheck` | Type-check without emitting                   |
| `npm run test`      | Run the Vitest unit tests                     |
| `npm run test:watch`| Run Vitest in watch mode                      |

## Cloud Agent environment

The environment is defined in [`.cursor/environment.json`](.cursor/environment.json):

- `install` runs `npm ci` (falling back to `npm install`) to prepare dependencies.
- A `dev` terminal runs `npm run dev` so the app is available on port 5173.
