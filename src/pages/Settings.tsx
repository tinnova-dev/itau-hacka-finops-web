
import React, { useState } from 'react';
import { Settings as SettingsIcon, Palette, Globe, MessageSquare, Monitor } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark-clean',
    language: 'pt-BR',
    showGraphs: true,
    compactMode: false,
    autoRefresh: true,
  });

  const updateSetting = (key: string, value: unknown) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 pt-20">
      {/* Theme Settings */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Palette className="text-itau-orange" size={20} />
            <span>Aparência</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tema</label>
            <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
              <SelectTrigger className="bg-surface-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-surface-secondary border-border">
                <SelectItem value="dark-clean">Dark Clean (Padrão)</SelectItem>
                <SelectItem value="high-contrast">Alto Contraste (Acessível)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Dark Clean é otimizado para uso prolongado e foco em dados
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Globe className="text-itau-orange" size={20} />
            <span>Idioma e Regional</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Idioma da Interface</label>
            <Select value={settings.language} onValueChange={(value) => updateSetting('language', value)}>
              <SelectTrigger className="bg-surface-secondary border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-surface-secondary border-border">
                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Observability Settings */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <Monitor className="text-itau-orange" size={20} />
            <span>Observabilidade</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Exibir Gráficos Simplificados</div>
              <div className="text-xs text-muted-foreground">Mostra mini-gráficos e KPIs visuais nas respostas da IA</div>
            </div>
            <Switch
              checked={settings.showGraphs}
              onCheckedChange={(checked) => updateSetting('showGraphs', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Modo Compacto</div>
              <div className="text-xs text-muted-foreground">Reduz espaçamentos para mostrar mais informações</div>
            </div>
            <Switch
              checked={settings.compactMode}
              onCheckedChange={(checked) => updateSetting('compactMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Atualização Automática</div>
              <div className="text-xs text-muted-foreground">Atualiza dados de custos e métricas automaticamente</div>
            </div>
            <Switch
              checked={settings.autoRefresh}
              onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      <Card className="bg-surface-primary border-border">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center space-x-2">
            <MessageSquare className="text-itau-orange" size={20} />
            <span>Feedback</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Envie suas sugestões</label>
            <textarea
              className="w-full px-3 py-2 bg-surface-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-itau-orange focus:border-transparent resize-none"
              rows={3}
              placeholder="Como podemos melhorar sua experiência com o assistente de FinOps?"
            />
            <button className="bg-itau-orange hover:bg-itau-orange-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Enviar Feedback
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
