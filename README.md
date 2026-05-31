# SDET Playwright TypeScript

Playwright starter framework for the UST Global SDET training retail app.

## Setup

```bash
npm install
npx playwright install
npm test
```

Set the app URL when needed:

```bash
BASE_URL=http://localhost:4000 npm test
```

## Structure

- `tests/`: Test specifications.
- `pages/`: Page objects.
- `fixtures/`: Test fixtures and authenticated state.
- `utils/`: Reusable helpers and test data.
