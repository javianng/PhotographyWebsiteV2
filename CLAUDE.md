# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a photography portfolio website built with Next.js 15, showcasing street and landscape photography from Flickr. The site is bootstrapped with T3 Stack and uses React 19, TypeScript, and Tailwind CSS 4.

## Development Commands

```bash
# Development
npm run dev              # Start dev server with Turbo mode

# Code Quality
npm run check            # Run linting and type checking together
npm run lint             # Run ESLint
npm run lint:fix         # Run ESLint with auto-fix
npm run typecheck        # Run TypeScript compiler without emitting files
npm run format:check     # Check code formatting with Prettier
npm run format:write     # Format code with Prettier

# Build & Deploy
npm run build            # Build for production
npm run preview          # Build and start production server
npm run start            # Start production server
```

## Architecture

### Data Flow - Flickr Integration

The application fetches photography data directly from Flickr API on the client side:

- **Home page** (`src/app/page.tsx`): Fetches photosets (albums) list and displays them as a grid
- **Photoset page** (`src/app/photoset/[id]/PhotosetPageClient.tsx`): Fetches individual photos from a specific photoset

All Flickr API calls use axios and follow this pattern:

- Hardcoded API key: `521e8b255af8876e8e360b43bc80f910`
- User ID: `185878362@N05`
- Image URLs follow format: `https://live.staticflickr.com/{server}/{id}_{secret}_c.jpg`

### Project Structure

```
src/
├── app/                    # Next.js 15 App Router pages
│   ├── layout.tsx         # Root layout with theme provider, navbar, footer
│   ├── page.tsx           # Home page (photosets grid)
│   ├── about-me/          # About page
│   └── photoset/[id]/     # Dynamic photoset detail pages
├── components/
│   ├── ui/                # shadcn/ui components (button, dialog, skeleton, etc.)
│   ├── layout/            # Layout components (navbar, footer)
│   ├── mode-toggle.tsx    # Dark/light mode toggle
│   └── theme-provider.tsx # next-themes wrapper
├── lib/
│   ├── constants.ts       # Site config, metadata, SEO utilities
│   └── utils.ts           # Utility functions (cn for class merging)
└── styles/
    └── globals.css        # Global styles and Tailwind directives
```

### Key Configuration Files

- **Path alias**: `~/*` maps to `./src/*` (configured in tsconfig.json)
- **Environment validation**: Uses `@t3-oss/env-nextjs` with Zod schemas in `src/env.js`
- **Image optimization**: Next.js configured to allow images from `live.staticflickr.com`
- **Styling**: Tailwind CSS 4 with `prettier-plugin-tailwindcss` for class sorting

### SEO Strategy

All SEO configuration is centralized in `src/lib/constants.ts`:

- `SITE_CONFIG`: Site-wide constants (name, description, URLs, social links)
- `METADATA`: Next.js metadata object used in root layout
- `generatePhotosetMetadata()`: Creates dynamic metadata for photoset pages
- `generateStructuredData()`: Generates JSON-LD structured data for website/person/photography types

Each page includes structured data scripts for better search engine indexing.

### TypeScript Configuration

- Strict mode enabled with `noUncheckedIndexedAccess`
- Type imports enforced with `@typescript-eslint/consistent-type-imports`
- JSX preserved for Next.js processing

### Theme System

Uses `next-themes` for dark/light mode:

- Theme provider wraps entire app in `layout.tsx`
- Default theme is "system" (follows OS preference)
- Mode toggle component available in navbar

### Component Patterns

- **UI components**: Built with shadcn/ui, using Radix UI primitives and class-variance-authority
- **Client components**: All data-fetching pages use `"use client"` directive
- **Loading states**: Skeleton components displayed during data fetching
- **Image modal**: Photoset pages include a dialog for fullscreen image viewing
