
import React, { useState } from 'react';
import { User, Mail, Building, Bell, DollarSign, BarChart3 } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const Profile = () => {
  const [notifications, setNotifications] = useState({
    costAlerts: true,
    insights: true,
    weeklyReports: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pt-20">
      {/* User Info Card */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <User className="text-itau-orange" size={20} />
            <span>Informações do Usuário</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-itau-orange rounded-full flex items-center justify-center text-white text-xl font-bold">
              MR
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Maria Rodrigues</h3>
              <p className="text-muted-foreground flex items-center space-x-1">
                <Mail size={14} />
                <span>maria.rodrigues@itau.com.br</span>
              </p>
              <p className="text-muted-foreground flex items-center space-x-1">
                <Building size={14} />
                <span>Equipe de FinOps - TI Corporativo</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Summary Card */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <DollarSign className="text-itau-orange" size={20} />
            <span>Resumo de Gastos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-secondary p-4 rounded-lg">
              <div className="text-2xl font-bold text-itau-orange">R$ 12.500</div>
              <div className="text-sm text-muted-foreground">Total do mês</div>
            </div>
            <div className="bg-surface-secondary p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-400">+8%</div>
              <div className="text-sm text-muted-foreground">vs mês anterior</div>
            </div>
            <div className="bg-surface-secondary p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">5</div>
              <div className="text-sm text-muted-foreground">Serviços ativos</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">EC2 (40%)</span>
              <span className="text-sm font-medium text-foreground">R$ 5.000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">S3 (30%)</span>
              <span className="text-sm font-medium text-foreground">R$ 3.750</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Lambda (15%)</span>
              <span className="text-sm font-medium text-foreground">R$ 1.875</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Bell className="text-itau-orange" size={20} />
            <span>Preferências de Notificação</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Alertas de Custo</div>
              <div className="text-xs text-muted-foreground">Receber notificações quando gastos ultrapassarem limites</div>
            </div>
            <Switch
              checked={notifications.costAlerts}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, costAlerts: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Insights Automáticos</div>
              <div className="text-xs text-muted-foreground">Receber sugestões de otimização e insights</div>
            </div>
            <Switch
              checked={notifications.insights}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, insights: checked }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Relatórios Semanais</div>
              <div className="text-xs text-muted-foreground">Receber resumo semanal por email</div>
            </div>
            <Switch
              checked={notifications.weeklyReports}
              onCheckedChange={(checked) => 
                setNotifications(prev => ({ ...prev, weeklyReports: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
