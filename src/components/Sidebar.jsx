import { useState } from 'react';
import {
  Home, BookOpen, Settings, LogOut,
  LayoutGrid, ChevronsLeft, ChevronsRight,
} from 'lucide-react';
import { AGENT_THEMES, MOCK_LIBRARY, MOCK_RECENTS } from '../lib/constants';

function AgentDot({ agentId }) {
  const theme = AGENT_THEMES[agentId];
  if (!theme) return null;
  return (
    <span
      className="inline-block w-[6px] h-[6px] rounded-full flex-shrink-0"
      style={{ backgroundColor: theme.color }}
      title={theme.name}
    />
  );
}

export default function Sidebar({
  currentView,
  onNavigate,
  onSelectRecent,
  onOpenAgentLibrary,
  activeAgentId,
  activeRecentId,
  collapsed,
  onToggleCollapse
}) {
  const [activeWorkspaceAgent, setActiveWorkspaceAgent] = useState(null);
  const workspaceAgents = Object.values(AGENT_THEMES);
  const expandedAgentId =
    currentView === 'agent-library' && activeAgentId
      ? activeAgentId
      : activeWorkspaceAgent;

  const getLatestTwoForAgent = (agentId) =>
    MOCK_LIBRARY.filter((item) => item.agents.includes(agentId)).slice(0, 2);

  const handleWorkspaceAgentClick = (agentId) => {
    if (expandedAgentId === agentId) {
      if (onOpenAgentLibrary) onOpenAgentLibrary(agentId);
      return;
    }
    setActiveWorkspaceAgent(agentId);
  };

  const navItemClass = (active) =>
    `flex items-center gap-3 px-2 h-9 rounded-lg text-[13px] cursor-pointer transition-all duration-200
     ${active ? 'bg-surface-elevated text-text-primary border-l-2 border-text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`;

  // Collapsed state — slim icon bar
  if (collapsed) {
    return (
      <aside className="w-14 flex-shrink-0 h-full bg-sidebar border-r border-border-dark flex flex-col items-center py-4 transition-all duration-200">
        <button
          onClick={onToggleCollapse}
          className="mb-4 text-text-secondary hover:text-text-primary transition-colors duration-200"
          title="Expand sidebar"
        >
          <ChevronsRight size={16} />
        </button>
        <div className="flex flex-col gap-2 items-center">
          <button onClick={() => onNavigate('home')} className={`p-2 rounded-lg transition-colors duration-200 ${currentView === 'home' ? 'bg-surface-elevated text-text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`} title="Home">
            <Home size={18} />
          </button>
          <button onClick={() => onNavigate('library')} className={`p-2 rounded-lg transition-colors duration-200 ${currentView === 'library' ? 'bg-surface-elevated text-text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`} title="Library">
            <BookOpen size={18} />
          </button>
        </div>
        <div className="mt-auto flex flex-col gap-2 items-center">
          <button className="p-2 rounded-lg text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition-colors duration-200" title="Settings">
            <Settings size={18} />
          </button>
          <button className="p-2 rounded-lg text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition-colors duration-200" title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-60 flex-shrink-0 h-full bg-sidebar border-r border-border-dark flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid size={16} className="text-text-secondary" />
          <span className="text-sm font-semibold text-text-primary">Ayush's Space</span>
        </div>
        <button
          onClick={onToggleCollapse}
          className="text-text-secondary hover:text-text-primary transition-colors duration-200"
          title="Collapse sidebar"
        >
          <ChevronsLeft size={16} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 px-2">
        <div className={navItemClass(currentView === 'home')} onClick={() => onNavigate('home')}>
          <Home size={16} /> Home
        </div>
        <div className={navItemClass(currentView === 'library')} onClick={() => onNavigate('library')}>
          <BookOpen size={16} /> Library
        </div>
      </nav>

      {/* Divider */}
      <div className="mx-3 my-3 border-t border-border-dark" />

      {/* Workspace */}
      <div className="px-2 mb-2">
        <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-text-placeholder">Workspace</p>
        <div className="flex flex-col gap-0.5">
          {workspaceAgents.map((agent) => {
            const latestTwo = getLatestTwoForAgent(agent.id);
            const isSelected = expandedAgentId === agent.id;
            return (
              <div key={agent.id}>
                <div
                  onClick={() => handleWorkspaceAgentClick(agent.id)}
                  className={`flex items-center justify-between gap-2 px-2 h-9 rounded-lg cursor-pointer transition-all duration-200
                    ${isSelected ? 'bg-surface-elevated text-text-primary' : 'text-text-secondary hover:bg-surface-elevated hover:text-text-primary'}`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <AgentDot agentId={agent.id} />
                    <span className="text-[13px] truncate">{agent.name}</span>
                  </span>
                  <span className="text-[11px] text-text-placeholder flex-shrink-0">{latestTwo.length}</span>
                </div>

                {expandedAgentId === agent.id && (
                  <div className="ml-5 mt-1 mb-2 flex flex-col gap-1">
                    {latestTwo.map((item) => (
                      <div
                        key={`${agent.id}-${item.id}`}
                        onClick={() => onSelectRecent(item.id)}
                        className="px-2 py-1.5 rounded-md text-[12px] text-text-secondary hover:text-text-primary hover:bg-surface-elevated cursor-pointer truncate transition-all duration-200"
                        title={item.title}
                      >
                        {item.title}
                      </div>
                    ))}
                    <div
                      onClick={() => onOpenAgentLibrary && onOpenAgentLibrary(agent.id)}
                      className="px-2 py-1 text-[11px] text-text-placeholder hover:text-text-primary cursor-pointer transition-colors duration-200"
                    >
                      View full history
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-3 my-3 border-t border-border-dark" />

      {/* Recents */}
      <div className="flex-1 overflow-y-auto px-2">
        <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-wider text-text-placeholder">Recents</p>
        <div className="flex flex-col gap-0.5">
          {MOCK_RECENTS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectRecent(item.id)}
              className={`flex items-center justify-between gap-2 px-2 h-9 rounded-lg cursor-pointer transition-all duration-200 group
                ${activeRecentId === item.id ? 'bg-surface-elevated' : 'hover:bg-surface-elevated'}`}
            >
              <span className="text-[13px] text-text-secondary truncate group-hover:text-text-primary transition-colors duration-200">
                {item.title}
              </span>
              <span className="flex items-center gap-1 flex-shrink-0">
                {item.agents.map((a) => <AgentDot key={a} agentId={a} />)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="mx-3 border-t border-border-dark" />
        <div className="flex flex-col gap-0.5 p-2">
          <div className="flex items-center gap-3 px-2 h-9 rounded-lg text-[13px] cursor-pointer text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all duration-200">
            <Settings size={16} /> Settings
          </div>
          <div className="flex items-center gap-3 px-2 h-9 rounded-lg text-[13px] cursor-pointer text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-all duration-200">
            <LogOut size={16} /> Logout
          </div>
        </div>
      </div>
    </aside>
  );
}
