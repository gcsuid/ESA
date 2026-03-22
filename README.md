# ESA - Enterprise Strategy Agent

A React single-page app for an enterprise AI assistant that coordinates multiple specialized agents (Search, Data Analyst, Research, Strategy) to answer business-style queries with contextual responses.




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

## Motive

This app was the second take home assignment after the first one for Adya.ai. Was given the PRD, and was asked to build a prototype frontend for the same in 5 hours. Approached the same as a mixture of Notion and perplexity aesthetics. I am attaching the LOOM VIDEO of the same for your reference.

## LOOM VIDEO

[https://www.loom.com/share/81f64d6aef9d48e08935a1dc73deced4]
