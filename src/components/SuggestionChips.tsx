
import React from 'react';
import { BarChart3, AlertTriangle, TrendingUp, Monitor, DollarSign } from 'lucide-react';

interface SuggestionChipsProps {
  onChipClick: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ onChipClick }) => {
  const suggestions = [
    { 
      icon: DollarSign, 
      text: 'Custo por Serviço',
      query: 'Mostre o custo detalhado por serviço neste mês'
    },
    { 
      icon: BarChart3, 
      text: 'Uso de Recursos',
      query: 'Analise o uso atual de recursos de infraestrutura'
    },
    { 
      icon: AlertTriangle, 
      text: 'Alertas Recentes',
      query: 'Exiba os alertas de custo e performance dos últimos 7 dias'
    },
    { 
      icon: Monitor, 
      text: 'Dashboards',
      query: 'Mostre os principais dashboards de observabilidade'
    },
    { 
      icon: TrendingUp, 
      text: 'KPIs de FinOps',
      query: 'Apresente os KPIs de FinOps mais importantes'
    },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <button
            key={index}
            onClick={() => onChipClick(suggestion.query)}
            className="chip flex-shrink-0 hover-glow"
          >
            <Icon size={14} className="mr-1.5" />
            {suggestion.text}
          </button>
        );
      })}
    </div>
  );
};

export default SuggestionChips;
