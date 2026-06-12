# Contributing to Tan Compose

Thanks for your interest in contributing! This guide covers setup, workflow, and
conventions so your PR lands smoothly.

## Prerequisites

- [Deno](https://deno.com/) v2+ installed
- Git
- A modern browser (for manual testing)

## Getting Started

```bash
# Clone the repo
git clone https://github.com/RA9/tan-compose.git
cd tan-compose

# Verify everything works
deno task ci
```

The `ci` task runs formatting check, lint, type check, and the full test suite
in one shot.

## Project Structure

```text
tan-compose/
├── mod.ts            # Public API entry point
├── build.ts          # Core: registers custom elements
├── describe.ts       # Core: validates component descriptions
├── types.ts          # TypeScript type definitions
├── test/             # Core test suite (happy-dom)
├── kit/              # @ra9/tan-compose-kit (38 components)
│   └── test/         # Kit test suite
├── icons/            # @ra9/tan-compose-icons (98 icons)
│   └── test/         # Icons test suite
├── dist/             # Pre-built bundles (generated)
├── site/             # Documentation site source
├── blog/             # Blog posts (Markdown)
├── examples/         # Standalone example files
└── scripts/          # Build & utility scripts
```

## Development Tasks

| Command               | Description                                    |
| --------------------- | ---------------------------------------------- |
| `deno task test`      | Run all tests                                  |
| `deno task test:cov`  | Run tests with coverage report                 |
| `deno task check`     | Type-check core source files                   |
| `deno task fmt`       | Format all source files                        |
| `deno task fmt:check` | Check formatting (CI mode)                     |
| `deno task lint`      | Lint all source files                          |
| `deno task bundle`    | Build the `dist/` bundles                      |
| `deno task ci`        | Full CI pipeline (fmt + lint + check + test)   |

## Making Changes

### 1. Create a branch

```bash
git checkout -b feat/my-feature
```

Use a prefix that describes the change:

- `feat/` — new feature
- `fix/` — bug fix
- `docs/` — documentation only
- `refactor/` — code change that neither fixes a bug nor adds a feature
- `test/` — adding or updating tests

### 2. Write code

- Keep changes focused — one concern per PR.
- Follow the existing code style. Deno's formatter (`deno fmt`) handles layout;
  the linter (`deno lint`) catches common issues.
- Add JSDoc on public-facing exports.
- Avoid adding new dependencies unless clearly justified.

### 3. Write tests

All changes to `build.ts`, `describe.ts`, or `types.ts` should have
corresponding tests in `test/mod.test.ts`. Kit component changes go in
`kit/test/kit.test.ts`, icon changes in `icons/test/icons.test.ts`.

Tests use [happy-dom](https://github.com/nicedayfor/happy-dom) for DOM
simulation — no browser required.

```bash
# Run just the core tests
deno test --allow-read --allow-env --allow-net --allow-write test/

# Run kit tests only
deno test --allow-read --allow-env --allow-net --allow-write kit/test/

# Run icons tests only
deno test --allow-read --allow-env --allow-net --allow-write icons/test/
```

### 4. Validate

Before pushing, run the full CI check locally:

```bash
deno task ci
```

All of these must pass:

- ✅ `deno fmt --check` — no formatting drift
- ✅ `deno lint` — no lint errors
- ✅ `deno check` — no type errors
- ✅ `deno test` — all tests green

### 5. Update documentation

If your change affects the public API:

- Update `README.md` (or `kit/README.md` / `icons/README.md` as appropriate)
- Add a changelog entry to `CHANGELOG.md` under an `[Unreleased]` heading

### 6. Open a Pull Request

- Target the `main` branch.
- Write a clear title and description explaining *what* and *why*.
- Reference any related issues (e.g. `Fixes #42`).
- Keep the PR small and reviewable — split large changes into stacked PRs if
  needed.

## Code Conventions

### TypeScript

- Strict mode is enabled — no `any` leaks.
- Use `interface` for object shapes, `type` for unions/intersections.
- Prefer `const` over `let`; avoid `var`.
- Use explicit return types on exported functions.

### Component Descriptions

- `describe()` validates at runtime — lean on that for user-facing errors.
- Lifecycle hooks are called with `.call(this)` — document that `function`
  syntax is required when `this` access is needed.
- `template` can be a string or function — function templates must return safe
  HTML (no sanitization is applied).

### Tests

- Each test gets a unique tag name (use the `uniqueTag()` helper).
- Clean up DOM nodes after assertions (`document.body.removeChild(el)`).
- Test behavior, not implementation details.

## Workspace Packages

This is a Deno workspace with three publishable packages:

| Package                     | Path     | Registry                                      |
| --------------------------- | -------- | --------------------------------------------- |
| `@ra9/tan-compose`          | `/`      | [jsr.io/@ra9/tan-compose](https://jsr.io/@ra9/tan-compose) |
| `@ra9/tan-compose-kit`      | `/kit`   | [jsr.io/@ra9/tan-compose-kit](https://jsr.io/@ra9/tan-compose-kit) |
| `@ra9/tan-compose-icons`    | `/icons` | [jsr.io/@ra9/tan-compose-icons](https://jsr.io/@ra9/tan-compose-icons) |

Changes to shared types in `types.ts` may affect all three — run the full test
suite when touching those files.

## Reporting Bugs

Open an issue at
[github.com/RA9/tan-compose/issues](https://github.com/RA9/tan-compose/issues)
with:

- A minimal reproduction (code snippet or link to a playground)
- Expected vs. actual behavior
- Browser / Deno version

## Requesting Features

Open an issue with the `enhancement` label. Describe the use case and how it
fits the library's philosophy (declarative, no build step, platform-native).

## License

By contributing, you agree that your contributions will be licensed under the
project's [MIT License](./LICENSE).
