import React from 'react';
import { Bot, User, BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    isAI: boolean;
    timestamp: Date;
    type?: 'cost' | 'alert' | 'insight' | 'dashboard';
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const getAIIcon = () => {
    switch (message.type) {
      case 'cost':
        return <BarChart3 size={16} className="text-itau-orange" />;
      case 'alert':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'insight':
        return <TrendingUp size={16} className="text-green-400" />;
      default:
        return <Bot size={16} className="text-itau-orange" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (message.isAI) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center border border-itau-orange/30">
          {getAIIcon()}
        </div>
        <div className="flex-1">
          <div className="message-bubble-ai">
            <div className="text-sm leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
                {message.text}
              </ReactMarkdown>
            </div>
          </div>
          <span className="text-xs text-muted-foreground ml-1 mt-1 block">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 mb-4 justify-end">
      <div className="flex-1">
        <div className="message-bubble-user">
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
        <span className="text-xs text-muted-foreground mr-1 mt-1 block text-right">
          {formatTime(message.timestamp)}
        </span>
      </div>
      <div className="w-8 h-8 bg-itau-orange rounded-full flex items-center justify-center">
        <User size={16} className="text-white" />
      </div>
    </div>
  );
};

export default MessageBubble;
