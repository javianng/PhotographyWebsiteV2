# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

This is a Next.js photography website in its initial scaffold state (bootstrapped with `create-next-app` + `shadcn`). `app/page.tsx` is still the default starter homepage and `components/ui/` only contains the shadcn `button` component — no photography-specific pages, galleries, or content have been built yet.

Note: this directory is not a git repository yet.

## Commands

- `npm run dev` — start the dev server (Next.js, default port 3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint (flat config in `eslint.config.mjs`)

There is no test runner configured in this project.

To add more shadcn/ui components, use the shadcn CLI (config in `components.json`), e.g. `npx shadcn@latest add <component>`.

## Architecture

- **Next.js App Router** (`app/` directory) on Next.js 16, React 19, TypeScript with strict mode.
- **Styling**: Tailwind CSS v4, configured via `@theme` in `app/globals.css` (no separate `tailwind.config`). Colors are defined as CSS custom properties in OKLCH and consumed through Tailwind's `@theme inline` block; dark mode uses a `.dark` class variant (`@custom-variant dark (&:is(.dark *))`). `--radius` is currently set to `0` (square corners).
- **shadcn/ui**: style `radix-vega`, base color `neutral`, icon library `lucide`. Components are generated into `components/ui/` and use `radix-ui`'s unified package (not individual `@radix-ui/react-*` packages) plus `class-variance-authority` for variants. Path aliases from `components.json` map `@/components`, `@/components/ui`, `@/lib`, `@/hooks` to their respective directories (only `@/*` -> `./*` is actually declared in `tsconfig.json`).
- **`lib/utils.ts`**: exports the standard `cn()` helper (`clsx` + `tailwind-merge`) used across components for conditional class merging.
- **Fonts**: Geist Sans, Geist Mono, and Inter are all loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`, `--font-sans`).
- **Lightbox dependency**: `yet-another-react-lightbox` is installed but not yet wired into any component — expected to back the photo gallery/lightbox viewing experience once built.
