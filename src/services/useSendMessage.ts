import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export interface AIResponse {
  text: string;
  type?: 'cost' | 'alert' | 'insight' | 'dashboard';
}

export function useSendMessage() {
  return useMutation<AIResponse, Error, { chatId: string, message: string }>({
    mutationFn: async ({ chatId, message }) => {
      console.log('chat id:', chatId);
      console.log('Sending message to AI:', message);
      // TODO: Replace this mock with real API call when backend is ready
      // const response = await api.post('/chat', { chatId, message });
      // return response.data;

      // Simulated mock
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes('custo') || lowerMessage.includes('gasto')) {
        return {
          text: 'Seu custo total em nuvem neste mês é R$ 12.500. Principais serviços: EC2 (40%), S3 (30%), Lambda (15%). Comparado ao mês anterior, houve um aumento de 8% principalmente devido ao maior uso de instâncias EC2.',
          type: 'cost'
        };
      }

      if (lowerMessage.includes('alerta') || lowerMessage.includes('alert')) {
        return {
          text: '⚠️ Alerta Ativo: Gasto do serviço S3 ultrapassou 15% da meta mensal! Atual: R$ 3.750 | Meta: R$ 3.200. Recomendo revisar políticas de lifecycle e storage classes.',
          type: 'alert'
        };
      }

      if (lowerMessage.includes('uso') || lowerMessage.includes('recurso')) {
        return {
          text: '📈 Uso de CPU médio está em 85% em 3 nós do cluster principal. Memória em 72%. Recomendo considerar auto-scaling ou otimização de workloads para melhor eficiência.',
          type: 'insight'
        };
      }

      if (lowerMessage.includes('dashboard') || lowerMessage.includes('kpi')) {
        return {
          text: '📊 Principais KPIs de FinOps: Cost per Transaction: R$ 0,23 | Cloud Efficiency: 78% | Budget Variance: +8% | Resource Utilization: 82%. Dashboards ativos: Cost Management, Performance Monitoring.',
          type: 'dashboard'
        };
      }

      return {
        text: 'Entendi sua solicitação! Posso ajudar com análise de custos, alertas de performance, otimização de recursos ou visualização de KPIs. O que gostaria de explorar primeiro?'
      };
    }
  });
}
