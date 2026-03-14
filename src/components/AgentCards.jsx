import { Search, BarChart2, Globe, Lightbulb } from 'lucide-react';
import { AGENT_THEMES } from '../lib/constants';

const iconMap = {
  search: Search,
  'bar-chart-2': BarChart2,
  globe: Globe,
  lightbulb: Lightbulb,
};

export default function AgentCards() {
  const agents = Object.values(AGENT_THEMES);

  return (
    <div className="flex gap-3 w-full max-w-[680px] mx-auto mt-8">
      {agents.map((agent) => {
        const Icon = iconMap[agent.icon];
        return (
          <div
            key={agent.id}
            className="flex-1 rounded-xl p-5 border cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
            style={{
              backgroundColor: agent.bg,
              borderColor: agent.border,
            }}
          >
            <div className="flex flex-col items-center text-center gap-3">
              {Icon && <Icon size={28} style={{ color: agent.color }} />}
              <span className="text-sm font-semibold" style={{ color: agent.color }}>
                {agent.name}
              </span>
              <span className="text-xs text-text-secondary leading-relaxed">
                {agent.description}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
