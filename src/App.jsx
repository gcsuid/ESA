import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AgentCards from './components/AgentCards';
import ChatBox from './components/ChatBox';
import ChatView from './components/ChatView';
import LibraryPanel from './components/LibraryPanel';
import AgentLibraryPanel from './components/AgentLibraryPanel';
import { TextShimmer } from './components/ui/TextShimmer';
import AnimatedGradientBackground from './components/ui/animated-gradient-background';

const HOME_GRADIENT_COLORS = [
  '#090B10',
  '#0F1824',
  '#2B3D56',
  '#4AABEC',
  '#3ECF72',
  '#E8C547',
  '#A855F7',
];

const HOME_GRADIENT_STOPS = [24, 42, 56, 68, 78, 88, 100];

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
          <div className="relative flex-1 flex flex-col items-center justify-center px-6 transition-opacity duration-300 overflow-hidden">
            <AnimatedGradientBackground
              Breathing
              startingGap={124}
              animationSpeed={0.025}
              breathingRange={6}
              gradientColors={HOME_GRADIENT_COLORS}
              gradientStops={HOME_GRADIENT_STOPS}
              topOffset={-10}
              containerClassName="pointer-events-none opacity-55"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.06),rgba(15,15,14,0)_52%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
            <TextShimmer as="h1" className="text-[28px] font-light mb-2">
              {getGreeting()},{' '}
              <span className="font-semibold">Ayush</span>
            </TextShimmer>
            <TextShimmer as="p" className="text-sm mb-8">
              Put agents to work!
            </TextShimmer>
            <div className="relative w-full max-w-[680px] mx-auto">
              <div className="pointer-events-none absolute -inset-4 rounded-[20px] bg-[radial-gradient(circle_at_center,rgba(74,171,236,0.20),rgba(168,85,247,0.16),rgba(15,15,14,0)_72%)] blur-2xl" />
              <div className="relative">
                <ChatBox onSubmit={handleSubmitFromHome} />
              </div>
            </div>
            <AgentCards />
            </div>
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
            onChatStarted={() => setPendingHomeQuery(null)}
          />
        )}
      </main>
    </div>
  );
}
