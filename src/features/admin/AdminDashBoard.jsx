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

      {/* Grid for extra info (Activity logs or Server status) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white border border-hudc-light/30 rounded-sm">
           <p className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-[0.2em] mb-4">Recent_Event_Log</p>
           <div className="space-y-3">
             <div className="flex items-center justify-between py-2 border-b border-hudc-bg">
               <span className="text-[10px] font-mono text-green-600 font-bold">[SUCCESS]</span>
               <span className="text-[11px] font-mono text-hudc-dark/60 flex-1 ml-4 italic">Database connection verified...</span>
               <span className="text-[9px] font-mono text-hudc-dark/20">JUST NOW</span>
             </div>
             <div className="flex items-center justify-between py-2 border-b border-hudc-bg">
               <span className="text-[10px] font-mono text-hudc-blue font-bold">[AUTH]</span>
               <span className="text-[11px] font-mono text-hudc-dark/60 flex-1 ml-4 italic">Sudo session initiated by admin_root</span>
               <span className="text-[9px] font-mono text-hudc-dark/20">2 MIN AGO</span>
             </div>
           </div>
        </div>

        <div className="p-6 bg-hudc-dark rounded-sm flex flex-col justify-center items-center text-center">
             <div className="w-12 h-12 rounded-full border-2 border-dashed border-hudc-blue flex items-center justify-center mb-4">
               <div className="w-2 h-2 bg-hudc-blue rounded-full animate-ping" />
             </div>
             <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Live_Service_Monitor</p>
             <p className="text-xs text-white/60 mt-2 font-mono italic">"All systems are green."</p>
        </div>
      </div>
    </div>
  );
}