import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

export interface AIResponse {
  content: string;
  type?: 'cost' | 'alert' | 'insight' | 'dashboard';
}

export function useSendMessage() {
  return useMutation<AIResponse, Error, { chatId: string, message: string }>({
    mutationFn: async ({ chatId, message }) => {
      const response = await api.post('/api/message', { chat_id: chatId, content: message });
      return response.data;
    }
  });
}
