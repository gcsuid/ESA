import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AgentCards from './components/AgentCards';
import ChatBox from './components/ChatBox';
import ChatView from './components/ChatView';
import LibraryPanel from './components/LibraryPanel';
import AgentLibraryPanel from './components/AgentLibraryPanel';
import { TextShimmer } from './components/ui/TextShimmer';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function App() {
  const [view, setView] = useState('home'); // home | library | chat
  const [activeConvoId, setActiveConvoId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pendingHomeQuery, setPendingHomeQuery] = useState(null);
  const [activeAgentId, setActiveAgentId] = useState(null);

  const handleNavigate = (target) => {
    setView(target);
    setActiveConvoId(null);
    setPendingHomeQuery(null);
    if (target !== 'agent-library') setActiveAgentId(null);
  };

  const handleSelectRecent = (id) => {
    setActiveConvoId(id);
    setView('chat');
  };

  const handleSubmitFromHome = (query) => {
    setPendingHomeQuery(query);
    setView('chat');
    setActiveConvoId(null);
  };

  const handleLibrarySelect = (id) => {
    setActiveConvoId(id);
    setView('chat');
  };

  const handleOpenAgentLibrary = (agentId) => {
    setActiveAgentId(agentId);
    setView('agent-library');
  };

  return (
    <div className="flex h-screen w-full bg-app overflow-hidden">
      <Sidebar
        currentView={view}
        onNavigate={handleNavigate}
        onSelectRecent={handleSelectRecent}
        onOpenAgentLibrary={handleOpenAgentLibrary}
        activeAgentId={activeAgentId}
        activeRecentId={activeConvoId}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* HOME — Empty State */}
        {view === 'home' && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 transition-opacity duration-300">
            <TextShimmer as="h1" className="text-[28px] font-light mb-2">
              {getGreeting()},{' '}
              <span className="font-semibold">Ayush</span>
            </TextShimmer>
            <TextShimmer as="p" className="text-sm mb-8">
              Put agents to work!
            </TextShimmer>
            <ChatBox onSubmit={handleSubmitFromHome} />
            <AgentCards />
          </div>
        )}

        {/* LIBRARY */}
        {view === 'library' && (
          <LibraryPanel onSelectConversation={handleLibrarySelect} />
        )}

        {/* AGENT LIBRARY */}
        {view === 'agent-library' && activeAgentId && (
          <AgentLibraryPanel
            agentId={activeAgentId}
            onSelectConversation={handleLibrarySelect}
          />
        )}

        {/* CHAT */}
        {view === 'chat' && (
          <ChatView
            key={activeConvoId || 'new'}
            initialConversationId={activeConvoId}
            initialQuery={pendingHomeQuery}
            onInitialQueryHandled={() => setPendingHomeQuery(null)}
            onChatStarted={() => {}}
            sidebarCollapsed={sidebarCollapsed}
          />
        )}
      </main>
    </div>
  );
}
