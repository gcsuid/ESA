import { useState, useRef, useEffect } from 'react';
import { Paperclip, ArrowUp, Upload, Search as SearchIcon, FileText, MoreHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AGENT_THEMES } from '../lib/constants';
import { cn } from '../lib/utils';
import { Textarea } from './ui/Textarea';
import { useAutoResizeTextarea } from './hooks/useAutoResizeTextarea';

const agentList = Object.values(AGENT_THEMES);

const PLACEHOLDERS = [
  "Ask anything, or type @ to call an agent",
  "Search across your enterprise knowledge base...",
  "Analyze revenue trends and data insights...",
  "Research competitors and market intelligence...",
  "Build GTM strategies and recommendations...",
];

const ATTACH_OPTIONS = [
  { icon: Upload, label: 'Upload files or images', desc: 'PDF, DOCX, PNG, CSV' },
  { icon: SearchIcon, label: 'Deep research', desc: 'In-depth multi-source analysis' },
  { icon: FileText, label: 'Paste from clipboard', desc: 'Paste text or data directly' },
  { icon: MoreHorizontal, label: 'More', desc: 'Additional options' },
];

export default function ChatBox({ onSubmit, prefillAgentName, onPrefillApplied, isProcessing = false }) {
  const [value, setValue] = useState('');
  const [showMention, setShowMention] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [mentionIdx, setMentionIdx] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const attachRef = useRef(null);
  const placeholderInterval = useRef(null);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 52,
    maxHeight: 160,
  });

  const hasText = value.trim().length > 0;

  // Placeholder cycling
  useEffect(() => {
    const start = () => {
      placeholderInterval.current = setInterval(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 3000);
    };
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible' && placeholderInterval.current) {
        clearInterval(placeholderInterval.current);
        placeholderInterval.current = null;
      } else if (document.visibilityState === 'visible') {
        start();
      }
    };
    start();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      if (placeholderInterval.current) clearInterval(placeholderInterval.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Close attach dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (attachRef.current && !attachRef.current.contains(e.target)) {
        setShowAttach(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!prefillAgentName || isProcessing) return;

    const mentionText = `@${prefillAgentName} `;
    setValue((prev) => {
      let next = prev;
      for (const agent of agentList) {
        const agentMention = `@${agent.name} `;
        if (next.startsWith(agentMention)) {
          next = next.slice(agentMention.length);
          break;
        }
      }
      return `${mentionText}${next}`;
    });
    setShowMention(false);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      adjustHeight();
    });
    if (onPrefillApplied) onPrefillApplied();
  }, [prefillAgentName, onPrefillApplied, isProcessing, textareaRef, adjustHeight]);

  const handleSubmitAction = () => {
    if (!hasText || isProcessing) return;
    const queryText = value.trim();
    setValue('');
    adjustHeight(true);
    onSubmit(queryText);
  };

  const handleChange = (e) => {
    if (isProcessing) return;
    const v = e.target.value;
    setValue(v);
    adjustHeight();
    const atIdx = v.lastIndexOf('@');
    if (atIdx !== -1 && (atIdx === v.length - 1 || v.slice(atIdx + 1).match(/^[a-zA-Z]*$/))) {
      setShowMention(true);
      setMentionIdx(0);
    } else {
      setShowMention(false);
    }
  };

  const handleSelectAgent = (agent) => {
    const atIdx = value.lastIndexOf('@');
    const newValue = value.slice(0, atIdx) + '@' + agent.name + ' ';
    setValue(newValue);
    setShowMention(false);
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (showMention) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setMentionIdx((i) => (i + 1) % agentList.length); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setMentionIdx((i) => (i - 1 + agentList.length) % agentList.length); }
      else if (e.key === 'Enter') { e.preventDefault(); handleSelectAgent(agentList[mentionIdx]); }
      else if (e.key === 'Escape') { setShowMention(false); }
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAction();
    }
  };

  return (
    <div className="relative w-full max-w-[680px] mx-auto">
      {/* @ Mention dropdown */}
      {showMention && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-surface-elevated border border-border-dark rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-50">
          {agentList.map((agent, idx) => (
            <div
              key={agent.id}
              onClick={() => handleSelectAgent(agent)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-200
                ${idx === mentionIdx ? 'bg-border-dark' : 'hover:bg-border-dark'}`}
            >
              <span className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ backgroundColor: agent.color }} />
              <span className="text-sm text-text-primary font-medium">{agent.name}</span>
              <span className="text-xs text-text-secondary">{agent.description}</span>
            </div>
          ))}
        </div>
      )}

      {/* Attach dropdown */}
      <AnimatePresence>
        {showAttach && (
          <motion.div
            ref={attachRef}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute bottom-full mb-2 left-0 w-72 bg-surface-elevated border border-border-dark rounded-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50"
          >
            {ATTACH_OPTIONS.map((option, idx) => {
              const Icon = option.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-border-dark transition-colors duration-200"
                  onClick={() => setShowAttach(false)}
                >
                  <Icon size={16} className="text-text-secondary flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[13px] text-text-primary">{option.label}</span>
                    <span className="text-[11px] text-text-secondary">{option.desc}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input container */}
      <div className="relative flex items-start bg-surface border border-border-dark rounded-[14px] overflow-hidden">
        {/* Paperclip / Attach button */}
        <button
          onClick={() => setShowAttach((s) => !s)}
          className="absolute left-3.5 top-4 z-50 text-text-placeholder hover:text-text-secondary transition-colors duration-200 flex-shrink-0"
          title="Attach document"
          type="button"
        >
          <Paperclip size={18} />
        </button>

        {/* Auto-resize Textarea */}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          className={cn(
            "w-full bg-transparent border-none rounded-[14px] pl-12 pr-12 py-3.5 text-[15px] text-text-primary resize-none leading-[1.5]",
            "placeholder:text-transparent focus-visible:ring-0 focus-visible:ring-offset-0",
            "min-h-[52px]",
            isProcessing && "opacity-60 cursor-not-allowed"
          )}
        />

        {/* Send / Loading button */}
        <button
          onClick={handleSubmitAction}
          className={cn(
            "absolute right-3 top-3 z-50 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200",
            isProcessing
              ? "bg-transparent"
              : hasText
                ? "bg-text-primary text-app"
                : "bg-border-dark text-text-placeholder"
          )}
          type="button"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div
              className="w-4 h-4 bg-text-primary rounded-sm animate-spin"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <ArrowUp size={16} />
          )}
        </button>

        {/* Animated placeholder */}
        <div className="absolute inset-0 flex items-center pointer-events-none">
          <AnimatePresence mode="wait">
            {!value && !isProcessing && (
              <motion.p
                initial={{ y: 5, opacity: 0 }}
                key={`placeholder-${currentPlaceholder}`}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'linear' }}
                className="text-text-placeholder text-[15px] font-normal pl-12 text-left w-[calc(100%-4rem)] truncate"
              >
                {PLACEHOLDERS[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status text below input */}
      <div className="h-5 mt-1.5 text-center">
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.p
              key="thinking"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs text-accent-strategy font-medium"
            >
              Agents have taken over...
            </motion.p>
          ) : (
            <motion.p
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-text-placeholder"
            >
              Ready to submit
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
