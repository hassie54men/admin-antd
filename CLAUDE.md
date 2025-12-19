# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server (Vite)
npm run build        # Type check (tsc -b) and build for production
npm run lint         # Run ESLint
npm run prettier     # Format code with Prettier
npm run typecheck    # Type check only (no build)
npm run preview      # Preview production build
```

## Architecture

This is a React 19 admin panel using Ant Design, built with Vite. It follows a feature-based architecture with DummyJSON as the backend API.

### Directory Structure

```
src/
├── api/              # Centralized API configuration
│   ├── apiClient.ts  # Axios instance with auth interceptor
│   ├── endpoints.ts  # API endpoint constants
│   └── queryKeys.ts  # TanStack Query key factories
├── app/
│   ├── App.tsx       # Root component (providers)
│   ├── layout/       # Layout components (AdminLayout, AuthLayout)
│   └── routes/       # Route definitions and guards
├── features/         # Feature modules (auth, etc.)
│   └── [feature]/
│       ├── model/    # API calls, queries, mutations, types
│       ├── pages/    # Page components
│       └── ui/       # Feature-specific UI components
├── pages/            # Standalone pages (Home, Admin)
├── shared/           # Shared utilities
│   ├── constants/    # App constants (queryClient, storage keys, routes)
│   ├── hooks/        # Custom hooks (useDebounce, useSearchQuery)
│   ├── types/        # Common TypeScript types
│   └── ui/           # Reusable UI components
└── i18n.ts           # i18next configuration
```

### Key Patterns

**API Layer**: Features use a three-file pattern in `model/`:
- `[feature].api.ts` - Raw API calls using axios
- `[feature].queries.ts` - TanStack Query hooks (useQuery)
- `[feature].mutations.ts` - TanStack Query mutation hooks
- `[feature].types.ts` - TypeScript interfaces

**Query Keys**: Centralized in `src/api/queryKeys.ts` using factory pattern for consistency.

**Authentication**: JWT tokens stored in localStorage. The axios interceptor in `apiClient.ts` attaches tokens automatically. Protected routes use `ProtectedRoute` component that checks auth via `useGetUserQuery`.

**Routing**: React Router v7 with nested routes. `App.tsx` wraps everything in providers, layouts handle structure.

**i18n**: Uses react-i18next with translations in `public/locales/{lang}/translation.json`.

## Tech Stack

- React 19, TypeScript, Vite
- Ant Design v5 (UI components)
- TanStack Query (server state)
- React Router v7 (routing)
- Axios (HTTP client)
- react-i18next (internationalization)
- Husky + lint-staged (pre-commit hooks)
- Commitlint (conventional commits)

## Environment Variables

Create a `.env` file with:
```
VITE_API_URL=https://dummyjson.com
```
