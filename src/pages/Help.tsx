
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronRight, MessageCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Help = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: 'finops',
      question: 'O que é FinOps?',
      answer: 'FinOps (Financial Operations) é uma disciplina que combina finanças, operações e engenharia para trazer responsabilidade financeira à nuvem. Ajuda organizações a otimizar custos enquanto mantém a performance e qualidade dos serviços.',
    },
    {
      id: 'cost-optimization',
      question: 'Como otimizar meus custos de nuvem?',
      answer: 'Principais estratégias incluem: right-sizing de recursos, uso de instâncias reservadas/spot, implementação de políticas de auto-scaling, otimização de storage classes no S3, e monitoramento contínuo com alertas de budget.',
    },
    {
      id: 'alerts',
      question: 'Como personalizar alertas de observabilidade?',
      answer: 'No perfil do usuário, você pode configurar notificações para alertas de custo, insights automáticos e relatórios semanais. Os alertas são baseados em thresholds de custo e performance que você pode definir.',
    },
    {
      id: 'dashboards',
      question: 'Quais dashboards estão disponíveis?',
      answer: 'Temos dashboards para Cost Management (análise de gastos), Performance Monitoring (métricas de infraestrutura), Resource Utilization (uso de recursos) e KPIs de FinOps (indicadores financeiros).',
    },
    {
      id: 'data-sources',
      question: 'De onde vêm os dados apresentados?',
      answer: 'Os dados são coletados diretamente dos provedores de nuvem (AWS, Azure, GCP), ferramentas de monitoramento interno e sistemas de billing do Itaú, garantindo informações atualizadas e precisas.',
    },
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pt-20">
      {/* Quick Help */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-surface-primary border-border">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <MessageCircle className="text-itau-orange mt-1" size={20} />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Suporte Técnico
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Precisa de ajuda imediata? Entre em contato com nossa equipe de TI.
                </p>
                <button className="bg-itau-orange hover:bg-itau-orange-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Abrir Chat de Suporte
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-surface-primary border-border">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <ExternalLink className="text-itau-orange mt-1" size={20} />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Documentação
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Acesse guias detalhados sobre FinOps e melhores práticas.
                </p>
                <button className="border border-itau-orange text-itau-orange hover:bg-itau-orange hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ver Documentação
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Section */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <HelpCircle className="text-itau-orange" size={20} />
            <span>Perguntas Frequentes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqs.map((faq) => (
            <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-4 text-left bg-surface-secondary hover:bg-surface-secondary/80 transition-colors flex items-center justify-between"
              >
                <span className="text-sm font-medium text-foreground">
                  {faq.question}
                </span>
                {expandedFAQ === faq.id ? (
                  <ChevronDown size={16} className="text-itau-orange" />
                ) : (
                  <ChevronRight size={16} className="text-muted-foreground" />
                )}
              </button>
              
              {expandedFAQ === faq.id && (
                <div className="p-4 bg-background/30 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground">
            Ainda precisa de ajuda?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Email:</strong> finops-suporte@itau.com.br
            </p>
            <p>
              <strong className="text-foreground">Telefone:</strong> (11) 3003-9999 (Ramal 1234)
            </p>
            <p>
              <strong className="text-foreground">Horário:</strong> Segunda a Sexta, 8h às 18h
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
