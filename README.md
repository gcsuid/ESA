# ESA â€” Enterprise Strategy Agent

A React single-page application for an enterprise AI assistant that orchestrates multiple specialized agents (Search, Data Analyst, Research, Strategy) to answer business queries with rich, contextual responses.

## Tech Stack

- **React 19** â€” UI framework
- **Vite 7** â€” Build tool & dev server
- **Tailwind CSS 4** â€” Utility-first styling (via `@tailwindcss/vite`)
- **Lucide React** â€” Icon library
- **Inter** â€” Google Font

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Features

| Feature | Description |
|---|---|
| **Dark Theme** | Full dark palette â€” no light mode, no toggle |
| **Notion-style Sidebar** | Navigation, inline search over recents, color-coded agent dots |
| **Agent Cards** | Four themed cards (Search, Data Analyst, Research, Strategy) on the home view |
| **ChatBox** | Input with `@` mention dropdown to call agents, keyboard navigable |
| **Activation Sequence** | Animated agent status (scanning â†’ processing â†’ âœ“ done) with pulsing dots |
| **Response Blocks** | Agent chips, formatted text, chart placeholders, document source cards |
| **Library Panel** | Scrollable history of all past conversations |
| **Mock Data** | Three pre-built conversations and 12 library entries â€” no backend needed |

## Project Structure

```
src/
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ ActivationSequence.jsx   # Pulsing agent status animation
â”‚   â”œâ”€â”€ AgentCards.jsx           # Four agent cards grid
â”‚   â”œâ”€â”€ ChatBox.jsx              # Input with @ mention dropdown
â”‚   â”œâ”€â”€ ChatView.jsx             # Full chat conversation view
â”‚   â”œâ”€â”€ LibraryPanel.jsx         # All conversations listing
â”‚   â”œâ”€â”€ ResponseBlock.jsx        # Agent chips, text, chart, document card
â”‚   â””â”€â”€ Sidebar.jsx              # Notion-style sidebar
â”œâ”€â”€ lib/
â”‚   â””â”€â”€ constants.js             # Mock data, agent themes, color palette
â”œâ”€â”€ App.jsx                      # Main layout & view routing
â”œâ”€â”€ index.css                    # Tailwind config & global styles
â””â”€â”€ main.jsx                     # Entry point
```

## Color Palette

| Token | Hex |
|---|---|
| App background | `#0F0F0E` |
| Sidebar | `#161614` |
| Card / surface | `#1C1C1A` |
| Elevated surface | `#242422` |
| Border / divider | `#2A2A27` |
| Primary text | `#F0EFE9` |
| Secondary text | `#8A8A82` |
| Placeholder text | `#4A4A45` |

## Agent Accents

| Agent | Color |
|---|---|
| Search Agent | `#4AABEC` |
| Data Analyst | `#3ECF72` |
| Research Agent | `#E8C547` |
| Strategy Agent | `#A855F7` |

## License

Private project.

