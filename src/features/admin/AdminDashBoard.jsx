import React from 'react';
import StatsOverview from './components/StatsOverview';
import { Terminal } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-hudc-dark tracking-tighter uppercase font-sans">
            Core_Metrics
          </h1>
          <p className="text-[10px] font-mono text-hudc-blue font-bold tracking-widest mt-1">
            // ACCESS_LEVEL: SUDO_ROOT
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-hudc-dark/30 uppercase">
          <Terminal className="w-3 h-3" />
          Last_Login: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* The Stats Component we built earlier */}
      <StatsOverview />



    </div>
  );
}