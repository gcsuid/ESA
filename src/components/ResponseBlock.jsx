import { BarChart2, FileText, ExternalLink } from 'lucide-react';
import { AGENT_THEMES } from '../lib/constants';

function AgentChip({ agentId }) {
  const agent = AGENT_THEMES[agentId];
  if (!agent) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
      style={{
        backgroundColor: `${agent.color}1F`,
        color: agent.color,
      }}
    >
      {agent.name}
    </span>
  );
}

function ChartPlaceholder({ label }) {
  return (
    <div className="mt-4 rounded-[10px] bg-sidebar border border-dashed border-border-dark h-[180px] flex flex-col items-center justify-center gap-2">
      <BarChart2 size={24} className="text-border-dark" />
      <span className="text-[13px] text-text-placeholder">{label}</span>
    </div>
  );
}

function DocumentCard({ filename }) {
  return (
    <div className="mt-4 flex items-center gap-4 bg-surface border border-border-dark rounded-[10px] px-4 py-3">
      <FileText size={20} className="text-accent-search flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-text-primary truncate">{filename}</p>
        <p className="text-xs text-text-secondary">PDF • Last updated Mar 2024</p>
      </div>
      <button className="flex-shrink-0 px-3 py-1.5 rounded-lg border border-border-dark bg-transparent text-text-secondary text-xs hover:bg-surface-elevated transition-colors duration-200">
        View
      </button>
    </div>
  );
}

export default function ResponseBlock({ conversation }) {
  return (
    <div className="max-w-[680px] transition-opacity duration-300">
      {/* Agent chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        {conversation.agents.map((a) => (
          <AgentChip key={a} agentId={a} />
        ))}
      </div>

      {/* Response text */}
      <div className="text-[15px] text-text-primary leading-[1.7] whitespace-pre-line">
        {conversation.response.split('\n\n').map((para, i) => (
          <p key={i} className="mb-3">{para}</p>
        ))}
      </div>

      {/* Optional chart */}
      {conversation.chart && <ChartPlaceholder label={conversation.chart} />}

      {/* Optional document */}
      {conversation.document && <DocumentCard filename={conversation.document} />}
    </div>
  );
}
