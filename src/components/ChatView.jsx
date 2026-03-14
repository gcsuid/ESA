import { useState, useRef, useEffect, useCallback } from 'react';
import ChatBox from './ChatBox';
import ActivationSequence from './ActivationSequence';
import ResponseBlock from './ResponseBlock';
import { MOCK_CONVERSATIONS } from '../lib/constants';

export default function ChatView({ initialConversationId, initialQuery, onChatStarted }) {
  const [messages, setMessages] = useState([]);
  const [activating, setActivating] = useState(false);
  const [pendingConvo, setPendingConvo] = useState(null);
  const bottomRef = useRef(null);
  const handledInitialQueryRef = useRef(null);

  // Load a pre-existing conversation
  useEffect(() => {
    if (initialConversationId && MOCK_CONVERSATIONS[initialConversationId]) {
      const convo = MOCK_CONVERSATIONS[initialConversationId];
      setMessages([
        { type: 'query', text: convo.query },
        { type: 'response', data: convo },
      ]);
    }
  }, [initialConversationId]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activating]);

  const handleSubmit = useCallback((query) => {
    let convo;
    const lq = query.toLowerCase();
    if (lq.includes('revenue') || lq.includes('q3')) {
      convo = MOCK_CONVERSATIONS[1];
    } else if (lq.includes('procurement') || lq.includes('policy') || lq.includes('document') || lq.includes('find')) {
      convo = MOCK_CONVERSATIONS[2];
    } else if (lq.includes('apac') || lq.includes('gtm') || lq.includes('strategy') || lq.includes('expansion')) {
      convo = MOCK_CONVERSATIONS[3];
    } else {
      const keys = Object.keys(MOCK_CONVERSATIONS);
      convo = MOCK_CONVERSATIONS[keys[Math.floor(Math.random() * keys.length)]];
    }

    setMessages((prev) => [...prev, { type: 'query', text: query }]);
    setActivating(true);
    setPendingConvo(convo);
    if (onChatStarted) onChatStarted();
  }, [onChatStarted]);

  useEffect(() => {
    const trimmed = initialQuery?.trim();
    if (!trimmed) return;
    if (handledInitialQueryRef.current === trimmed) return;

    handledInitialQueryRef.current = trimmed;
    handleSubmit(trimmed);
  }, [initialQuery, handleSubmit]);

  useEffect(() => {
    if (!initialQuery) {
      handledInitialQueryRef.current = null;
    }
  }, [initialQuery]);

  const handleActivationDone = () => {
    setActivating(false);
    if (pendingConvo) {
      setMessages((prev) => [...prev, { type: 'response', data: pendingConvo }]);
      setPendingConvo(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat messages — takes all available space, scrollable */}
      <div className="flex-1 overflow-y-auto px-6 pt-6">
        <div className="max-w-[720px] mx-auto flex flex-col gap-6">
          {messages.map((msg, i) => (
            <div key={i}>
              {msg.type === 'query' && (
                <div className="flex justify-end">
                  <div className="max-w-[60%] bg-surface-elevated border border-border-dark rounded-xl px-4 py-3 text-text-primary text-[15px]">
                    {msg.text}
                  </div>
                </div>
              )}
              {msg.type === 'response' && (
                <div className="flex justify-start">
                  <ResponseBlock conversation={msg.data} />
                </div>
              )}
            </div>
          ))}

          {/* Activation sequence */}
          {activating && pendingConvo && (
            <ActivationSequence
              agentIds={pendingConvo.agents}
              onComplete={handleActivationDone}
            />
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Chatbox pinned at bottom — NOT fixed, sits in normal flow */}
      <div className="flex-shrink-0 px-6 py-4 bg-app border-t border-border-dark/30">
        <ChatBox onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
