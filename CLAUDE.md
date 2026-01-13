# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16.1.1 application called "What to Cook v2" - a Frontend Mentor project challenge. The project uses React 19.2.3 with Tailwind CSS v4 for styling.

## Commands

### Development
```bash
npm run dev          # Start development server at http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 16.1.1 with App Router
- **React**: Version 19.2.3
- **Styling**: Tailwind CSS v4 (using @tailwindcss/postcss plugin)
- **Fonts**: Libre Baskerville and DM Sans (via next/font/google)
- **Linting**: ESLint 9 with eslint-config-next

### Project Structure
- `app/` - Next.js App Router directory containing pages and layouts
  - `layout.js` - Root layout with Libre Baskerville + DM Sans fonts configured
  - `page.js` - Recipe finder component with ingredient input and results display
  - `globals.css` - Design system with cream/terracotta color palette and animations
- `public/` - Static assets (SVG files for UI icons)
- Path alias `@/*` configured in jsconfig.json to reference root directory

### Styling Architecture
- Uses Tailwind CSS v4 with PostCSS integration
- Design system with CSS custom properties in globals.css:
  - `--color-bg`: #faf8f5 (cream background)
  - `--color-surface`: #ffffff (card surface)
  - `--color-text`: #2d2d2d (primary text)
  - `--color-text-muted`: #6b6b6b (secondary text)
  - `--color-accent`: #d97642 (terracotta accent)
  - `--color-accent-hover`: #c46535
  - `--color-border`: #e8e4df
  - Shadow tokens: --shadow-sm, --shadow-md, --shadow-lg
- Custom animations: fadeInUp, fadeIn, loadingDot
- Tailwind utility classes used in components
- Next.js Image component for optimized images

### Key Configuration Files
- `next.config.mjs` - Next.js configuration (currently minimal)
- `eslint.config.mjs` - ESLint v9 flat config using Next.js core-web-vitals preset
- `postcss.config.mjs` - PostCSS configuration with @tailwindcss/postcss plugin
- `jsconfig.json` - Path alias configuration for cleaner imports

# Design Reference

✅ **Design implemented** - The UI now matches `design-reference.html`

## Implemented Design Elements

- ✅ Editorial/magazine aesthetic with warm, earthy tones
- ✅ Typography: Libre Baskerville (serif) + DM Sans (sans-serif)
- ✅ Color palette: Cream background (#faf8f5) with terracotta accent (#d97642)
- ✅ Recipe cards with images and color-coded ingredient tags
- ✅ Smooth animations and hover effects throughout
- ✅ Responsive layout adapting to mobile/tablet/desktop

## Implementation Status

### Completed Features
✅ Recipe finder UI with editorial design aesthetic
✅ Ingredient input with focus states and validation
✅ Loading animation with pulsing dots
✅ Recipe cards with color-coded ingredient tags:
  - Used ingredients (green)
  - Missed ingredients (orange)
  - Unused ingredients (gray)
✅ Smooth animations and hover effects
✅ Fully responsive design (mobile/tablet/desktop)
✅ Mock data integration (3 sample recipes)

### Current Architecture
- **Single page component** (`app/page.js`) with React state management
- **Client-side interactivity** using 'use client' directive
- **Mock API simulation** with 1.5s setTimeout
- **Responsive grid layout** - 2 columns on desktop, 1 column on mobile

### Implementation Steps Taken
1. **Font Configuration** - Configured Libre Baskerville (400, 700) and DM Sans (400, 500, 600, 700) in `layout.js`
2. **Design System** - Set up color tokens, shadows, and keyframe animations in `globals.css`
3. **Recipe Finder UI** - Built complete interface with:
   - Header with logo and tagline
   - Input card with textarea and "Find Recipes" button
   - Results card with recipe list and ingredient tags
   - Empty state handling
4. **Interactivity** - Added form handling, loading states, Enter key submission
5. **Responsive Design** - Implemented mobile-first responsive layout
6. **Image Optimization** - Used Next.js Image component with Unsplash images

### Next Steps (Not Yet Implemented)
- [ ] Replace mock data with real recipe API (Spoonacular, TheMealDB, etc.)
- [ ] Add API key configuration
- [ ] Implement advanced filtering (dietary restrictions, cuisine types)
- [ ] Add recipe detail modal with full instructions
- [ ] Add favorites/save functionality
- [ ] Implement recipe sharing features
- [ ] Add unit tests for components
- [ ] Add E2E tests for user flows
