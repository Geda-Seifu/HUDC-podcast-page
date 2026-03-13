import { useState } from 'react';
import { 
  Users, 
  FolderCode, 
  MessageSquare, 
  Zap, 
  ToggleRight, 
  ToggleLeft,
  Activity,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  // Logic for toggling forms (Will eventually connect to Supabase/Backend)
  const [formStatus, setFormStatus] = useState({
    guests: true,
    projects: false
  });

  const stats = [
    { label: 'Total_Suggestions', value: '124', icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Pending_Projects', value: '12', icon: FolderCode, color: 'text-amber-500' },
    { label: 'Active_Members', value: '45', icon: Users, color: 'text-purple-500' },
    { label: 'System_Uptime', value: '99.9%', icon: Zap, color: 'text-green-500' },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-hudc-dark tracking-tighter uppercase font-sans">
            Console_<span className="text-hudc-blue">Overview</span>
          </h1>
          <p className="text-xs font-mono text-hudc-dark/40 mt-1">
            // root@hudc:~$ run system_diagnostics.sh
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-hudc-light/30 rounded-sm shadow-sm">
          <Activity className="w-4 h-4 text-hudc-blue animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-hudc-dark/60">LIVE_DATA_STREAMING</span>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5 border border-hudc-light/30 rounded-sm shadow-sm hover:border-hudc-blue/40 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-hudc-bg rounded-sm ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-3 h-3 text-hudc-dark/20" />
            </div>
            <p className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-hudc-dark mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM CONTROL PANEL (2/3 Width) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden">
            <div className="bg-[#F8FAFC] border-b border-hudc-light/30 px-6 py-4">
              <h3 className="text-xs font-mono font-bold text-hudc-dark uppercase">Interface_Controller</h3>
            </div>
            <div className="p-6 space-y-4">
              {/* Guest Form Toggle */}
              <div className="flex items-center justify-between p-4 bg-hudc-bg/30 border border-hudc-light/20 rounded-sm">
                <div>
                  <h4 className="text-sm font-bold text-hudc-dark font-sans">Guest_Suggestion_Form</h4>
                  <p className="text-[11px] font-mono text-hudc-dark/50">Enable or disable the public guest submission link.</p>
                </div>
                <button 
                  onClick={() => setSettings(prev => ({...prev, guests: !prev.guests}))}
                  className="transition-colors"
                >
                  {formStatus.guests ? (
                    <ToggleRight className="w-10 h-10 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-hudc-dark/20" />
                  )}
                </button>
              </div>

              {/* Project Form Toggle */}
              <div className="flex items-center justify-between p-4 bg-hudc-bg/30 border border-hudc-light/20 rounded-sm">
                <div>
                  <h4 className="text-sm font-bold text-hudc-dark font-sans">Project_Showcase_Form</h4>
                  <p className="text-[11px] font-mono text-hudc-dark/50">Allow community members to submit their builds.</p>
                </div>
                <button 
                   onClick={() => setFormStatus(prev => ({...prev, projects: !prev.projects}))}
                >
                  {formStatus.projects ? (
                    <ToggleRight className="w-10 h-10 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-10 h-10 text-hudc-dark/20" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY (1/3 Width) */}
        <div className="bg-white border border-hudc-light/30 rounded-sm flex flex-col">
          <div className="bg-[#F8FAFC] border-b border-hudc-light/30 px-6 py-4">
            <h3 className="text-xs font-mono font-bold text-hudc-dark uppercase">Recent_Logs</h3>
          </div>
          <div className="p-6 flex-1 space-y-6">
            <div className="border-l-2 border-hudc-blue pl-4 py-1">
              <p className="text-[10px] font-mono text-hudc-blue font-bold uppercase">New Suggestion</p>
              <p className="text-xs font-bold text-hudc-dark">Guest: Dr. Elias</p>
              <p className="text-[9px] text-hudc-dark/40 font-mono">2 mins ago</p>
            </div>
            <div className="border-l-2 border-hudc-light/50 pl-4 py-1">
              <p className="text-[10px] font-mono text-hudc-dark/40 font-bold uppercase">Form Updated</p>
              <p className="text-xs font-bold text-hudc-dark">Project Form: OFFLINE</p>
              <p className="text-[9px] text-hudc-dark/40 font-mono">45 mins ago</p>
            </div>
            <div className="border-l-2 border-green-500 pl-4 py-1">
              <p className="text-[10px] font-mono text-green-500 font-bold uppercase">Project Approved</p>
              <p className="text-xs font-bold text-hudc-dark">ThemeWave by Harry</p>
              <p className="text-[9px] text-hudc-dark/40 font-mono">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}