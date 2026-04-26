# Portfolio

A stylized React + Vite portfolio with a paper-editorial theme, animated navigation, interactive project panels, and a mobile-optimized layout.

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS (utility classes in JSX)
- Plain CSS for custom animation/motion systems

## Current Experience

### Home
- Editorial hero layout with:
  - Center headline (`All Work!`)
  - Role tags (`ML Engineer`, `UI/UX Designer`)
  - `About Us` quick-link button
  - Side visual GIF elements (`/public/ascii.gif`)
- Sketch-circle hover and highlighter-brush accent for hero action buttons

### Work
- Panel-based project showcase (accordion behavior on desktop)
- Project metadata:
  - Title
  - Badge (tech tag)
  - Year
  - Description
  - Optional live-site preview (iframe when URL is available)
- Mobile-specific stacked layout for better readability and touch navigation

### About
- Personal intro and dark-humor copy
- Contact section:
  - Phone: `9025726185`
  - Email: `christopherjesuraj678@gmail.com`
- Social icon links:
  - GitHub
  - Instagram

### Global
- Paper-style fullscreen menu transition and hamburger morph animation
- Page transition overlay with paper-sheet style animation
- Branding title updated to `Portfolio`
- Browser favicon set to rabbit stamp image:
  - `/public/Rabbit Stamp with Postage Text.png`

## Project Structure

```text
.
├─ public/
│  ├─ Rabbit Stamp with Postage Text.png
│  └─ ascii.gif
├─ src/
│  ├─ PaperPortfolio.jsx
│  ├─ paperPortfolio.css
│  ├─ index.css
│  └─ main.jsx
├─ index.html
├─ package.json
└─ vite.config.js
```

## Local Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## Customization Guide

### Update personal details
Edit `src/PaperPortfolio.jsx`:
- Contact text and links in About section
- Hero role tags (`ML Engineer`, `UI/UX Designer`)
- About quick-link behavior

### Update projects
Edit `projectPanels` array in `src/PaperPortfolio.jsx`:
- `title`
- `badge`
- `year`
- `tag`
- `desc`
- `img`
- `siteUrl`
- `showMedia`

### Update visual assets
Replace files inside `public/` and keep paths same, or update references in JSX:
- `/ascii.gif`
- `/Rabbit Stamp with Postage Text.png`

### Update motion/animation
Edit `src/paperPortfolio.css`:
- Menu animations (`paper-menu-*`, `menu-*`)
- Transition overlay animations (`paper-transition-*`)
- Hero button effects (`hero-sketch-*`, `hero-highlight-*`)

## Notes

- The custom smooth cursor system has been fully removed; browser default cursor is active.
- Work page keeps wheel-based horizontal movement behavior in desktop mode.
- Mobile view is intentionally restructured (not just scaled down) for usability.

## Deployment

This app is Vite-based and can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages (with Vite base-path setup if needed)

Basic flow:
1. `npm run build`
2. Deploy `dist/` output

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
