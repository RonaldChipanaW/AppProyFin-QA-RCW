# Task Manager - Test Automation Course Project

Includes:
- Express backend (CRUD)
- Vitest unit and integration tests (supertest)
- Cypress E2E tests
- Simple frontend in /public

How to run:
1. `npm install`
2. `npm run dev` (starts server on :3000)
3. `npm test` (runs vitest)
4. `npx cypress open` or `npm run cypress:open` (run E2E; ensure server is running)

Notes:
- The project uses a simple JSON file as a datastore at `src/data/tasks.json`.
- Tests reset that file in their beforeEach hooks.
