
import React from 'react';
import { BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';

interface WelcomeBlocksProps {
  onBlockClick: (suggestion: string) => void;
}

const WelcomeBlocks: React.FC<WelcomeBlocksProps> = ({ onBlockClick }) => {
  const blocks = [
    {
      icon: BarChart3,
      title: 'Análise de Custos',
      description: 'Monitore gastos por serviço e projetos',
      query: 'Mostre o custo detalhado por serviço neste mês',
      color: 'border-blue-500/20 hover:border-blue-500',
    },
    {
      icon: AlertTriangle,
      title: 'Alertas e Anomalias',
      description: 'Identifique picos e irregularidades',
      query: 'Exiba os alertas de custo e performance dos últimos 7 dias',
      color: 'border-red-500/20 hover:border-red-500',
    },
    {
      icon: TrendingUp,
      title: 'KPIs e Otimização',
      description: 'Visualize métricas e oportunidades',
      query: 'Apresente os KPIs de FinOps mais importantes',
      color: 'border-green-500/20 hover:border-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {blocks.map((block, index) => {
        const Icon = block.icon;
        return (
          <div
            key={index}
            onClick={() => onBlockClick(block.query)}
            className={`
              bg-surface-primary border-2 ${block.color} rounded-xl p-6 cursor-pointer
              transition-all duration-300 hover:bg-surface-secondary hover:scale-105
              hover-glow
            `}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-surface-secondary rounded-lg flex items-center justify-center">
                <Icon size={24} className="text-itau-orange" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
              <p className="text-sm text-muted-foreground">{block.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WelcomeBlocks;
