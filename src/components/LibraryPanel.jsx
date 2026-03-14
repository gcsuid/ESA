import { useMemo, useState } from 'react';
import { AGENT_THEMES, MOCK_LIBRARY } from '../lib/constants';

function AgentDot({ agentId }) {
  const theme = AGENT_THEMES[agentId];
  if (!theme) return null;
  return (
    <span
      className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
      style={{ backgroundColor: theme.color }}
    />
  );
}

export default function LibraryPanel({ onSelectConversation }) {
  const [query, setQuery] = useState('');

  const filteredLibrary = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return MOCK_LIBRARY;
    return MOCK_LIBRARY.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(term);
      const agentMatch = item.agents.some((agentId) =>
        AGENT_THEMES[agentId]?.name.toLowerCase().includes(term)
      );
      return titleMatch || agentMatch;
    });
  }, [query]);

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-8 pb-12">
      <div className="max-w-[720px] mx-auto">
        <h1 className="text-xl font-semibold text-text-primary mb-1">Library</h1>
        <p className="text-text-secondary text-sm mb-4">All conversations, newest first</p>

        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or agent..."
            className="w-full h-10 px-3 bg-surface-elevated border border-border-dark rounded-lg text-[13px] text-text-primary placeholder:text-text-placeholder outline-none focus:border-text-secondary transition-colors duration-200"
          />
        </div>

        <div className="flex flex-col">
          {filteredLibrary.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectConversation(item.id)}
              className="flex items-center justify-between gap-4 px-4 py-3.5 border-b border-border-dark cursor-pointer hover:bg-surface transition-colors duration-200"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[14px] text-text-primary truncate">{item.title}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="flex items-center gap-1">
                  {item.agents.map((a) => <AgentDot key={a} agentId={a} />)}
                </span>
                <span className="text-xs text-text-placeholder whitespace-nowrap">{item.date}</span>
              </div>
            </div>
          ))}
          {filteredLibrary.length === 0 && (
            <div className="px-4 py-6 text-sm text-text-placeholder">
              No results found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
