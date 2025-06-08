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

const getOrCreateChatId = () => {
  let chatId = localStorage.getItem('chatId');
  if (!chatId) {
    chatId = Date.now().toString() + Math.floor(Math.random() * 10000).toString();
    localStorage.setItem('chatId', chatId);
  }
  return chatId;
};

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
  const [chatId, setChatId] = useState(() => getOrCreateChatId());
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
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
    setIsLoading(true);

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
    setLastUserMessage(message);
    setErrorMessage(null);

    sendMessage(
      { chatId, message },
      {
        onSuccess: (data) => {
          const aiMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: data.content,
            isAI: true,
            timestamp: new Date(),
            type: data.type,
          };
          setMessages((prev) => [...prev, aiMessage]);
        },
        onError: () => {
          setErrorMessage('Ocorreu um erro ao enviar a mensagem.');
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

  const handleNewChat = () => {
    localStorage.removeItem('chatMessages');
    const newChatId = Date.now().toString() + Math.floor(Math.random() * 10000).toString();
    localStorage.setItem('chatId', newChatId);
    setChatId(newChatId);
    setMessages([]);
    setInputValue('');
    setHasStartedChat(false);
  };

  const handleTryAgain = () => {
    if (lastUserMessage) {
      handleSubmit(lastUserMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col relative pt-12">
      {/* New Chat Button */}
      <button
        style={{ position: 'fixed', top: 70, left: 270, zIndex: 40, width: 40, height: 40, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={handleNewChat}
        className="bg-itau-orange text-white rounded-full shadow hover:bg-itau-orange-hover transition-all"
        title="Novo Chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m7-7H5"/></svg>
      </button>
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
            {errorMessage && (
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center border border-red-400/30">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div className="flex-1">
                  <div className="bg-red-100 border border-red-300 text-red-700 rounded-2xl px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{errorMessage}</span>
                      <button onClick={handleTryAgain} className="ml-2 px-2 py-1 bg-red-200 hover:bg-red-300 text-red-800 rounded transition-all text-xs font-medium">Tentar novamente</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
