
import React from 'react';
import { Bot, User, BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';

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
      minute: '2-digit' 
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
            <p className="text-sm leading-relaxed">{message.text}</p>
            {message.type === 'cost' && (
              <div className="mt-3 p-3 bg-background/30 rounded-lg">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Total do mês:</span>
                  <span className="text-itau-orange font-bold">R$ 12.500</span>
                </div>
                <div className="mt-1 flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">EC2 (40%):</span>
                  <span>R$ 5.000</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">S3 (30%):</span>
                  <span>R$ 3.750</span>
                </div>
              </div>
            )}
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
