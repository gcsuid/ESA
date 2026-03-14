# ESA - Enterprise Strategy Agent

A React single-page app for an enterprise AI assistant that coordinates multiple specialized agents (Search, Data Analyst, Research, Strategy) to answer business-style queries with contextual responses.

## Current Status

This README reflects the implementation currently in this repo.

### Recently Implemented

1. Home-screen animated radial gradient background tuned to agent accent colors.
2. Chatbox halo/glow effect while keeping the chatbox in the same layout position.
3. Greeting name styling update (`Ayush` is bold).
4. Home-to-chat submit flow fix so first `Enter` triggers agent activation immediately.
5. CSS import ordering fix (`@import` now placed at the top to satisfy PostCSS/Vite).
6. Vite dependency alignment to avoid optional native-binding install conflicts.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Framer Motion
- Lucide React
- JavaScript (ESM, not TypeScript)

## Implemented Product Features

- Dark-themed app shell with collapsible sidebar.
- Home view with:
  - Time-based greeting (`Good morning/afternoon/evening`)
  - Animated gradient background
  - Chat input with halo effect
  - Agent cards for Search, Data Analyst, Research, Strategy
- Chat input features:
  - `@` mention dropdown for agent hints
  - Attach menu UI
  - Animated placeholder cycling
  - Enter-to-submit behavior
- Chat flow:
  - Query bubble + activation sequence (`scanning`, `processing`, `done`)
  - Mock response blocks with text/chart/document styles
- Library and agent-library navigation views backed by mock data.

## Project Structure

```text
src/
  App.jsx
  index.css
  main.jsx
  assets/
  lib/
    constants.js
    utils.js
  components/
    ActivationSequence.jsx
    AgentCards.jsx
    AgentLibraryPanel.jsx
    ChatBox.jsx
    ChatView.jsx
    LibraryPanel.jsx
    ResponseBlock.jsx
    Sidebar.jsx
    hooks/
      useAutoResizeTextarea.js
    ui/
      animated-gradient-background.jsx
      PlaceholdersAndVanishInput.jsx
      Textarea.jsx
      TextShimmer.jsx
```

## Styling Notes

- Design tokens are defined in `src/index.css` via Tailwind `@theme`.
- Google Fonts import is intentionally at the top of `src/index.css` (required by PostCSS).
- Agent accent colors:
  - Search: `#4AABEC`
  - Data: `#3ECF72`
  - Research: `#E8C547`
  - Strategy: `#A855F7`

## Run Locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Data Source

No backend is connected right now. Conversation data, recents, and library content are mock values from `src/lib/constants.js`.

## Notes

- The project already uses a reusable UI folder at `src/components/ui`.
- Tailwind is configured and active.
- TypeScript and shadcn CLI are not initialized in this codebase yet.
