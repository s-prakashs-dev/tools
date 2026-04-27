<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Overview
Toolyfy is a collection of free, browser-based online utilities for developers and professionals. Each tool runs entirely client-side with no server uploads.

## Technology Stack
- Next.js 16.2.4 (⚠️ breaking changes from training data)
- React 19.2.4
- TypeScript 5 (strict mode)
- Tailwind CSS 4 (uses `@tailwindcss/postcss`)
- ESLint 9 (flat config)

## Build Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run start` - Run production server
- `npm run lint` - Run ESLint

## Architecture & Conventions
- **App Router**: All pages in `app/` directory
- **Single Source of Truth**: Tool metadata in `lib/tools.ts` (TOOLS array)
- **Component Pattern**: Use `ToolLayout` for consistent UI
- **SEO**: Export `generateMetadata()` in each tool page
- **Imports**: Use `@/` alias for root-relative paths
- **Responsive**: Mobile-first with Tailwind breakpoints

## Adding a New Tool
1. Add entry to `TOOLS[]` in [lib/tools.ts](lib/tools.ts)
2. Create `app/my-tool/page.tsx` (copy from existing tool)
3. Use `ToolLayout` wrapper
4. Export `generateMetadata()` with keywords
5. Navbar/Footer/Homepage auto-update

## Pitfalls to Avoid
- Consult Next.js docs for API changes
- Use `@tailwindcss/postcss` (not old Tailwind config)
- ESLint uses flat config format
- Always update `lib/tools.ts` for new tools
- AdSense optional; placeholder if env var missing

## Key Files
- [lib/tools.ts](lib/tools.ts) - Tool registry
- [components/ToolLayout.tsx](components/ToolLayout.tsx) - Page wrapper
- [app/page.tsx](app/page.tsx) - Homepage
- [README.md](README.md) - Setup instructions
