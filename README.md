# API Test Automation Framework

A standalone API test automation framework built with **Playwright + TypeScript**, testing [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com), a free REST API. Built to practice backend/API-level test automation independently from UI testing — validating status codes, response schemas, data types, and full CRUD behavior.

![API Tests](https://github.com/kaleemfaryad/api-testing-framework/actions/workflows/playwright.yml/badge.svg)

## Features

- Reusable API request abstraction layer (`ApiHelper` class) — tests never call raw endpoints directly
- Full CRUD coverage: GET, POST, PUT, DELETE
- Schema and data-type validation across entire response payloads, not just single records
- Positive and negative test cases (including error-response handling)
- Correct HTTP status code assertions (200, 201) based on REST conventions
- CI/CD integration via GitHub Actions — runs automatically on every push
- Test tagging (`@smoke` / `@regression`) for selective execution

## Tech Stack

- [Playwright](https://playwright.dev/) — API testing via the `request` fixture
- TypeScript
- GitHub Actions — CI/CD pipeline

## Project Structure

```
api-testing-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
│   ├── posts.spec.ts
│   └── users.spec.ts
├── utils/
│   └── apiHelper.ts
├── playwright.config.ts
└── package.json
```

## How to Run

Install dependencies:
```bash
npm install
```

Run the full suite:
```bash
npx playwright test
```

Run only smoke tests:
```bash
npx playwright test --grep "@smoke"
```

Run only regression tests:
```bash
npx playwright test --grep "@regression"
```

View the last HTML report:
```bash
npx playwright show-report
```

## Test Coverage

**Posts API**
- Get all posts (positive case, non-empty array check)
- Schema validation — every post in the response checked for required fields and correct data types (`title` is a string, `userId` is a number)
- Get single post by ID — confirms correct resource returned
- Create post (POST) — verifies `201 Created` status and that submitted data is reflected in the response
- Update post (PUT) — verifies updated fields
- Delete post — verifies success status

**Users API**
- Get all users — verifies non-empty array and validates every user has a well-formed email field

## Design Decisions

- **`ApiHelper` abstraction layer**: all HTTP calls are centralized in one class rather than repeated across test files. If the API's request structure changes (e.g., new auth headers), it's updated in one place instead of every test.
- **Full-array validation over single-record checks**: the schema test loops through *every* item in a response instead of just the first one, catching data-integrity issues that a single-record check would miss.

## What I Learned / Challenges

- Initially built this framework against `fakestoreapi.com`, but discovered tests were passing locally while consistently failing in CI with `403 Forbidden` errors. Investigated and traced the cause to the API's bot-protection blocking requests from GitHub Actions' cloud IP ranges — a good reminder that "works on my machine" doesn't always mean "works in CI," and that environment differences (network origin, IP reputation) can cause failures that have nothing to do with the test code itself.
- Migrated the framework to `jsonplaceholder.typicode.com`, a more CI-reliable public API, restoring consistent pass rates across both local and CI environments.
- Caught an incorrect assumption in my own test code: I initially asserted a `200` status on resource creation, but the API correctly returned `201 Created` per REST conventions — the test failure surfaced the mistake immediately rather than letting a wrong assumption go unnoticed.
- Practiced building a reusable API helper class using TypeScript constructor property shorthand (`constructor(private request: APIRequestContext)`).

## Author

**Kaleem Faryad**
Aspiring SQA Automation Engineer | Playwright | TypeScript
