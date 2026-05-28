# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR at http://localhost:5173
npm run build     # Production build to dist/
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

There are no tests in this project.

## Architecture

Single-page portfolio built with React 19 + Vite. The app is a vertical scroll of full-width sections with a sticky header. No routing, no state management — purely presentational.

**Structure:**
- `src/App.jsx` — root layout: `<Header>` + `<main>` containing the four sections in order
- `src/components/` — one file per section: `GeneralSection`, `AboutSection`, `ProjectsSection`, `ContactSection`, `Header`
- `src/index.css` — CSS custom properties (design tokens), base resets, typography
- `src/App.css` — all component styles, including responsive breakpoints (760px mobile, 761–980px tablet)

**Styling pattern:** Plain CSS with custom properties defined in `index.css`. Light/dark themes are handled via `@media (prefers-color-scheme: dark)`. No CSS framework or CSS modules — class names follow a BEM-adjacent flat convention (e.g., `.project-card`, `.skill-chip`, `.section-eyebrow`). The `.skill-chip` class is shared between `AboutSection` and `ProjectsSection`.

**Content pattern:** Static data arrays are defined at the module level in each component file (e.g., `skillGroups` in `AboutSection.jsx`, `projects` in `ProjectsSection.jsx`, `contactLinks` in `ContactSection.jsx`). To add/edit content, update those arrays directly.

**Assets:** `public/JS_Resume.pdf` is served statically and linked from the Header. Section anchor IDs (`#home`, `#about`, `#projects`, `#contact`) are used for in-page navigation.
