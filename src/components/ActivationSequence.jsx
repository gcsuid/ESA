import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { AGENT_THEMES } from '../lib/constants';

export default function ActivationSequence({ agentIds, onComplete }) {
  const [statuses, setStatuses] = useState(() =>
    agentIds.reduce((acc, id) => ({ ...acc, [id]: 'waiting' }), {})
  );

  useEffect(() => {
    let cancelled = false;
    const steps = ['scanning', 'processing', 'done'];

    const run = async () => {
      for (let i = 0; i < agentIds.length; i++) {
        if (cancelled) return;
        const id = agentIds[i];
        for (const step of steps) {
          if (cancelled) return;
          await new Promise((r) => setTimeout(r, step === 'done' ? 600 : 800));
          if (cancelled) return;
          setStatuses((prev) => ({ ...prev, [id]: step }));
        }
      }
      await new Promise((r) => setTimeout(r, 400));
      if (!cancelled) onComplete();
    };
    run();
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="max-w-[680px] bg-surface border border-border-dark rounded-[10px] p-4 transition-opacity duration-300">
      <p className="text-xs text-text-placeholder mb-3">Activating agents...</p>
      <div className="flex flex-col gap-3">
        {agentIds.map((id) => {
          const agent = AGENT_THEMES[id];
          const status = statuses[id];
          const isDone = status === 'done';
          return (
            <div key={id} className="flex items-center gap-3">
              {isDone ? (
                <Check size={12} style={{ color: agent.color }} className="flex-shrink-0" />
              ) : (
                <span
                  className={`inline-block w-[8px] h-[8px] rounded-full flex-shrink-0 ${status !== 'waiting' ? 'animate-pulse-dot' : ''}`}
                  style={{ backgroundColor: agent.color, opacity: status === 'waiting' ? 0.3 : 1 }}
                />
              )}
              <span className="text-sm text-text-primary">{agent.name}</span>
              <span className="text-xs text-text-secondary">
                {status === 'waiting' && ''}
                {status === 'scanning' && 'scanning...'}
                {status === 'processing' && 'processing...'}
                {status === 'done' && '✓ done'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
