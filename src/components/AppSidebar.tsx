
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from './ui/sidebar';
import { MessageCircle, History, User, Settings, HelpCircle } from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Chat",
      url: "/",
      icon: MessageCircle,
    },
    {
      title: "Histórico",
      url: "/history",
      icon: History,
    },
  ];

  const profileItems = [
    {
      title: "Perfil",
      url: "/profile",
      icon: User,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Ajuda",
      url: "/help",
      icon: HelpCircle,
    },
  ];

  return (
    <Sidebar className="border-r border-border pt-12">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-itau-orange rounded-lg flex items-center justify-center text-white font-bold text-sm">
            I
          </div>
          <h1 className="text-sm font-bold text-foreground">
            FinOps Assistant
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      isActive={isActive}
                      className="w-full"
                    >
                      <Icon size={16} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.url;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      isActive={isActive}
                      className="w-full"
                    >
                      <Icon size={16} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground">
          <div className="font-medium">Maria Rodrigues</div>
          <div>Equipe FinOps</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
