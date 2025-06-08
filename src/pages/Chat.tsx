import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import MessageBubble from '../components/MessageBubble';
import WelcomeBlocks from '../components/WelcomeBlocks';
import CollapsibleChips from '../components/CollapsibleChips';
import { useSendMessage } from '@/services/useSendMessage';

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
  type?: 'cost' | 'alert' | 'insight' | 'dashboard';
}

const Chat = () => {
  const saved = localStorage.getItem('chatMessages');
  let initialMessages: Message[] = [];
  if (saved) {
    try {
      const parsed: Message[] = JSON.parse(saved);
      initialMessages = parsed.map((msg) => ({ ...msg, timestamp: new Date(msg.timestamp) }));
    } catch {
      initialMessages = [];
    }
  }
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(initialMessages.length > 0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: sendMessage, isPending } = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (message: string) => {
    if (!message.trim() || isPending) return;

    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    sendMessage(
      { message },
      {
        onSuccess: (data) => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.text,
            isAI: true,
            timestamp: new Date(),
            type: data.type,
          };
          setMessages((prev) => [...prev, aiMessage]);
        },
        onSettled: () => {
          setIsLoading(false);
        }
      }
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue);
  };

  const handleBlockClick = (suggestion: string) => {
    handleSubmit(suggestion);
  };

  const handleChipClick = (suggestion: string) => {
    setInputValue(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col relative pt-12">
      {/* New Chat Button */}
      <div style={{ position: 'fixed', top: 70, left: 270, zIndex: 40 }}>
        <button
          onClick={() => {
            localStorage.removeItem('chatMessages');
            setMessages([]);
            setInputValue('');
            setHasStartedChat(false);
          }}
          className="bg-itau-orange text-white rounded-full shadow hover:bg-itau-orange-hover transition-all w-10 h-10 flex items-center justify-center"
          onMouseEnter={e => {
            const tooltip = document.createElement('div');
            tooltip.innerText = 'Novo Chat';
            tooltip.id = 'custom-tooltip';
            tooltip.style.position = 'fixed';
            tooltip.style.top = `${e.clientY + 8}px`;
            tooltip.style.left = `${e.clientX + 8}px`;
            tooltip.style.background = 'rgba(0,0,0,0.8)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '4px 10px';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '13px';
            tooltip.style.pointerEvents = 'none';
            tooltip.style.zIndex = '9999';
            document.body.appendChild(tooltip);
          }}
          onMouseMove={e => {
            const tooltip = document.getElementById('custom-tooltip');
            if (tooltip) {
              tooltip.style.top = `${e.clientY + 8}px`;
              tooltip.style.left = `${e.clientX + 8}px`;
            }
          }}
          onMouseLeave={() => {
            const tooltip = document.getElementById('custom-tooltip');
            if (tooltip) tooltip.remove();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"/></svg>
        </button>
      </div>
      {/* Welcome State */}
      {!hasStartedChat && (
        <div className="flex-1 flex flex-col justify-center px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Bem-vindo ao Assistente FinOps
            </h1>
            <p className="text-muted-foreground text-lg">
              Monitore custos, analise performance e otimize recursos em tempo real
            </p>
          </div>
          
          <WelcomeBlocks onBlockClick={handleBlockClick} />
        </div>
      )}

      {/* Chat State */}
      {hasStartedChat && (
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center border border-itau-orange/30">
                  <Loader2 size={16} className="text-itau-orange animate-spin" />
                </div>
                <div className="bg-surface-secondary rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-itau-orange rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-itau-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-itau-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground">Analisando dados...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}

      {/* Chips (can be outside of scroll area) */}
      {hasStartedChat && <CollapsibleChips onChipClick={handleChipClick} />}

      {/* Input area */}
      <form onSubmit={handleFormSubmit} className="p-4 border-t border-border bg-background sticky bottom-0">
        <div className="flex space-x-3 items-end w-full">
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Digite sua mensagem…"
              className="w-full px-4 py-3 bg-surface-primary border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-itau-orange focus:border-transparent resize-none"
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-itau-orange hover:bg-itau-orange-hover disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 hover-glow"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
