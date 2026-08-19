# Shopping App Testing Lab

[![CI](https://github.com/grkmuygunn/shopping-app-testing-lab/actions/workflows/playwright.yml/badge.svg)](https://github.com/grkmuygunn/shopping-app-testing-lab/actions/workflows/playwright.yml)

A small but fully working e-commerce app built as a dedicated QA testing ground. The application itself was scaffolded with AI assistance; all of the tests, the automation and the CI pipeline are hand-built.

## Stack

- **Frontend:** React (Create React App), Yarn
- **Backend:** Ruby + Sinatra, SQLite
- **Unit tests:** Jest + React Testing Library
- **E2E and API tests:** Playwright
- **CI:** GitHub Actions

## Test suite

| Layer | What runs | Where |
|---|---|---|
| Unit | 14 Jest suites, 79 tests, against every page and service | `frontend/src/**/__tests__` |
| E2E + API | 4 Playwright specs covering the shopping flows and the REST API | `tests/` |
| CI | Both layers run on every push and pull request to `master` | `.github/workflows/playwright.yml` |

Unit-test coverage is enforced in CI with Jest thresholds (90% statements, lines and functions). Current measured coverage: **~96% statements, ~98% lines, 100% functions**.

## How to run

Backend (from `backend/`):

```bash
ruby app.rb
curl -X POST http://localhost:4567/api/seed   # seed the SQLite DB
```

Frontend (from `frontend/`):

```bash
yarn install
yarn start
```

## How to run the tests

```bash
# unit tests (from frontend/)
yarn test:unit
yarn test:unit:coverage

# E2E + API tests (from the repo root)
yarn playwright test
yarn playwright test tests/path/filename   # a single spec
```

## Database access

```bash
sqlite3 backend/shopping.db
```
