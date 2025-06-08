import React from 'react';
import { SidebarTrigger } from './ui/sidebar';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-surface-primary border-b border-border px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SidebarTrigger />
          <h1 className="text-lg font-bold text-foreground">
            Monitoramento de Custos e KPIs
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
