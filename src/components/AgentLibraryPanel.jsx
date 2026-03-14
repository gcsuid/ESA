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

export default function AgentLibraryPanel({ agentId, onSelectConversation }) {
  const agent = AGENT_THEMES[agentId];
  const items = MOCK_LIBRARY.filter((item) => item.agents.includes(agentId));

  if (!agent) {
    return (
      <div className="flex-1 overflow-y-auto px-6 pt-8 pb-12">
        <div className="max-w-[720px] mx-auto">
          <h1 className="text-xl font-semibold text-text-primary mb-1">Workspace</h1>
          <p className="text-text-secondary text-sm">Agent not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-8 pb-12">
      <div className="max-w-[720px] mx-auto">
        <h1 className="text-xl font-semibold text-text-primary mb-1">{agent.name} Library</h1>
        <p className="text-text-secondary text-sm mb-6">Complete history where this agent was used</p>

        <div className="flex flex-col">
          {items.map((item) => (
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
        </div>
      </div>
    </div>
  );
}
