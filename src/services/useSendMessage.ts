import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export interface AIResponse {
  text: string;
  type?: 'cost' | 'alert' | 'insight' | 'dashboard';
}

export function useSendMessage() {
  return useMutation<AIResponse, Error, { chatId: string, message: string }>({
    mutationFn: async ({ chatId, message }) => {
      // TODO: Replace this mock with real API call when backend is ready
      // const response = await api.post('/chat', { chatId, message });
      // return response.data;

      // Simulated mock
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('custo') || lowerMessage.includes('gasto')) {
        return {
          text: '**Seu custo total em nuvem neste mês é _R$ 12.500_**\n\n' +
            '| Serviço | Valor   | Percentual |\n|---------|---------|------------|\n| EC2     | R$5000  | 40%        |\n| S3      | R$3750  | 30%        |\n| Lambda  | R$1875  | 15%        |',
          type: 'cost'
        };
      }

      if (lowerMessage.includes('alerta') || lowerMessage.includes('alert')) {
        return {
          text: '⚠️ **Alerta Ativo:**\n\nGasto do serviço S3 ultrapassou 15% da meta mensal!\n\n- **Atual:** R$ 3.750\n- **Meta:** R$ 3.200\n\n_Recomendo revisar políticas de lifecycle e storage classes._',
          type: 'alert'
        };
      }

      if (lowerMessage.includes('uso') || lowerMessage.includes('recurso')) {
        return {
          text: '📈 **Uso de CPU médio:** 85% em 3 nós do cluster principal.\n\n**Memória:** 72%\n\n_Recomendo considerar auto-scaling ou otimização de workloads para melhor eficiência._',
          type: 'insight'
        };
      }

      if (lowerMessage.includes('dashboard') || lowerMessage.includes('kpi')) {
        return {
          text: '### Principais KPIs de FinOps\n\n- **Cost per Transaction:** `R$ 0,23`\n- **Cloud Efficiency:** 78%\n- **Budget Variance:** +8%\n- **Resource Utilization:** 82%\n\nDashboards ativos: _Cost Management_, _Performance Monitoring_.',
          type: 'dashboard'
        };
      }

      return {
        text: 'Entendi sua solicitação!\n\nPosso ajudar com **análise de custos**, _alertas de performance_, otimização de recursos ou visualização de KPIs.\n\nO que gostaria de explorar primeiro?',
      };
    }
  });
}
