
import React from 'react';
import { MessageCircle, BarChart3, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const History = () => {
  const conversations = [
    {
      id: '1',
      title: 'Análise de Custos EC2',
      summary: 'Revisão dos gastos com instâncias EC2 do mês atual',
      timestamp: new Date('2024-01-15T10:30:00'),
      type: 'cost',
      messages: 8,
    },
    {
      id: '2',
      title: 'Alertas de Performance',
      summary: 'Investigação de alertas de CPU alta nos servidores',
      timestamp: new Date('2024-01-14T16:45:00'),
      type: 'alert',
      messages: 12,
    },
    {
      id: '3',
      title: 'KPIs de FinOps',
      summary: 'Visualização dos indicadores principais do trimestre',
      timestamp: new Date('2024-01-13T09:15:00'),
      type: 'insight',
      messages: 6,
    },
    {
      id: '4',
      title: 'Otimização S3',
      summary: 'Sugestões para reduzir custos de armazenamento',
      timestamp: new Date('2024-01-12T14:20:00'),
      type: 'cost',
      messages: 15,
    },
  ];

  const insights = [
    {
      title: 'Economia Mensal',
      value: 'R$ 2.340',
      description: 'Economia identificada através de otimizações sugeridas',
      trend: '+15%',
      color: 'text-green-400',
    },
    {
      title: 'Alertas Resolvidos',
      value: '23',
      description: 'Alertas de performance resolvidos esta semana',
      trend: '-8%',
      color: 'text-blue-400',
    },
    {
      title: 'Eficiência Cloud',
      value: '82%',
      description: 'Índice de eficiência dos recursos cloud',
      trend: '+3%',
      color: 'text-itau-orange',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'cost':
        return <BarChart3 size={16} className="text-itau-orange" />;
      case 'alert':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'insight':
        return <TrendingUp size={16} className="text-green-400" />;
      default:
        return <MessageCircle size={16} className="text-blue-400" />;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pt-20">
      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <Card key={index} className="bg-surface-primary border-border">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className={`text-2xl font-bold ${insight.color}`}>
                    {insight.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">
                    {insight.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {insight.description}
                  </div>
                </div>
                <div className="text-xs text-green-400 font-medium">
                  {insight.trend}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conversation History */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <MessageCircle className="text-itau-orange" size={20} />
            <span>Histórico de Conversas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="p-4 bg-surface-secondary rounded-lg hover:bg-surface-secondary/80 transition-colors cursor-pointer border border-transparent hover:border-itau-orange/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="mt-1">
                    {getIcon(conversation.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground">
                      {conversation.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {conversation.summary}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{formatDate(conversation.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle size={12} />
                        <span>{conversation.messages} mensagens</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
