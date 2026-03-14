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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAllGuests, fetchAllProjects, fetchSystemConfig, updateConfig } from '../../api/admin';

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  // 1. SYSTEM HEARTBEAT & DATA FETCHING
  // We use refetchInterval to act as a heartbeat. 
  // If the fetch fails, TanStack Query sets 'isError' to true.
  const { 
    data: guests = [], 
    isError: isGuestError, 
    fetchStatus: guestFetchStatus 
  } = useQuery({ 
    queryKey: ['guests'], 
    queryFn: fetchAllGuests,
    refetchInterval: 50000 // 5-second heartbeat
  });

  const { data: projects = [] } = useQuery({ 
    queryKey: ['projects'], 
    queryFn: fetchAllProjects 
  });

  const { data: config = [], isError: isConfigError } = useQuery({ 
    queryKey: ['system_config'], 
    queryFn: fetchSystemConfig
  });

  // 2. MUTATION FOR TOGGLES
  const configMutation = useMutation({
    mutationFn: updateConfig,
    onSuccess: () => queryClient.invalidateQueries(['system_config']),
  });



  // 3. CONNECTION & AGGREGATION LOGIC (Derived State)
  const isOffline = isGuestError || isConfigError || !navigator.onLine;
  const isSyncing = guestFetchStatus === 'fetching';

  // Calculate real numbers for the "Folders"
  const totalSuggestions = guests.length;
  const pendingProjects = projects.filter(p => !p.is_approved).length;
  const activeMembers = guests.filter(g => g.status === 'scheduled').length;
  const systemUptime = isOffline ? "0.0%" : "99.9%";

  // Helper to find specific form status in the config array
  const getFormStatus = (id) => config.find(c => c.id === id)?.is_enabled;

  const stats = [
    { label: 'Total_Suggestions', value: totalSuggestions, icon: MessageSquare, color: 'text-blue-500' },
    { label: 'Pending_Projects', value: pendingProjects, icon: FolderCode, color: 'text-amber-500' },
    { label: 'Scheduled_Guests', value: activeMembers, icon: Users, color: 'text-purple-500' },
    { label: 'System_Uptime', value: systemUptime, icon: Zap, color: isOffline ? 'text-red-500' : 'text-green-500' },
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
            {isOffline ? 'timeout_failure' : 'ack_received'}
          </p>
        </div>
        <div className={`flex items-center gap-3 px-4 py-2 border rounded-sm transition-all duration-500 ${
          isOffline ? 'bg-red-50 border-red-200 shadow-inner' : 'bg-white border-hudc-light/30 shadow-sm'
        }`}>
          <Activity className={`w-4 h-4 ${
            isOffline ? 'text-red-500' : 
            isSyncing ? 'text-hudc-blue animate-spin' : 'text-green-500 animate-pulse'
          }`} />
          <div className="flex flex-col">
            <span className={`text-[10px] font-mono font-bold leading-none ${isOffline ? 'text-red-600' : 'text-hudc-dark/60'}`}>
              {isOffline ? 'CONNECTION_LOST' : isSyncing ? 'SYNCING_REMOTE...' : 'LIVE_DATA_STREAMING'}
            </span>
            <span className="text-[7px] font-mono opacity-40 uppercase mt-1">
               {isOffline ? 'reconnecting_to_supabase...' : 'uplink_active'}
            </span>
          </div>
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
              {[
                { id: 'guest_form', title: 'Guest_Suggestion_Form', desc: 'Control public guest entries.' },
                { id: 'project_form', title: 'Project_Showcase_Form', desc: 'Enable community project builds.' }
              ].map((form) => (
                <div key={form.id} className="flex items-center justify-between p-4 bg-hudc-bg/30 border border-hudc-light/20 rounded-sm">
                  <div>
                    <h4 className="text-sm font-bold text-hudc-dark font-sans uppercase">{form.title}</h4>
                    <p className="text-[11px] font-mono text-hudc-dark/50">{form.desc}</p>
                  </div>
                  <button 
                    disabled={configMutation.isPending || isOffline}
                    onClick={() => configMutation.mutate({ id: form.id, is_enabled: !getFormStatus(form.id) })}
                    className={`transition-opacity ${isOffline ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                  >
                    {getFormStatus(form.id) ? (
                      <ToggleRight className="w-10 h-10 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-10 h-10 text-hudc-dark/20" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY (1/3 Width) */}
        <div className="bg-white border border-hudc-light/30 rounded-sm flex flex-col p-6">
            <h3 className="text-xs font-mono font-bold text-hudc-dark uppercase tracking-widest mb-6 underline underline-offset-8">Recent_Logs</h3>
            <div className="space-y-6">
              {guests.slice(0, 3).map((guest, idx) => (
                <div key={guest.id} className={`border-l-2 pl-4 py-1 ${idx === 0 ? 'border-hudc-blue' : 'border-hudc-light/50'}`}>
                  <p className={`text-[10px] font-mono font-bold uppercase ${idx === 0 ? 'text-hudc-blue' : 'text-hudc-dark/40'}`}>
                    {idx === 0 ? 'New Entry' : 'Log_Entry'}
                  </p>
                  <p className="text-xs font-bold text-hudc-dark">{guest.name}</p>
                  <p className="text-[9px] text-hudc-dark/40 font-mono">
                    {new Date(guest.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
              {guests.length === 0 && (
                <p className="text-[10px] font-mono text-hudc-dark/30 italic uppercase">// no_incoming_logs</p>
              )}
            </div>
        </div>
      </div>
    </div>
  );
}