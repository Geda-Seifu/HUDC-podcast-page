import React from 'react';
import { Rocket, Users, CheckCircle2, AlertCircle, BarChart3 } from 'lucide-react';
import { useProjects } from '../../projects/hooks/useProject';
// import { useGuests } from '../../guests/hooks/useGuests'; // Assume you have this

export default function StatsOverview() {
  const { projects, totalCount: projectCount, isLoading: loadingProjects } = useProjects();
  
  // Calculate specific metrics
  const pendingProjects = projects.filter(p => !p.is_approved).length;
  const approvedProjects = projects.filter(p => p.is_approved).length;

  const stats = [
    {
      label: "Total_Submissions",
      value: projectCount,
      icon: Rocket,
      color: "text-hudc-blue",
      bg: "bg-hudc-blue/10",
      desc: "// repository_entries"
    },
    {
      label: "Pending_Review",
      value: pendingProjects,
      icon: AlertCircle,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      desc: "// needs_approval"
    },
    {
      label: "Live_Showcase",
      value: approvedProjects,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      desc: "// public_viewing"
    },
    {
      label: "System_Traffic",
      value: "1.2k",
      icon: BarChart3,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      desc: "// monthly_visits"
    }
  ];

  if (loadingProjects) return <div className="animate-pulse text-xs font-mono">CALCULATING_METRICS...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-hudc-dark tracking-tighter uppercase">Operations_Overview</h2>
        <p className="text-[11px] font-mono text-hudc-dark/40 uppercase tracking-widest mt-1">
          // welcome_back_sudo_user: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-hudc-light/30 p-5 rounded-sm shadow-sm hover:border-hudc-blue/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-xs group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-hudc-dark/20 uppercase font-bold tracking-tighter">Live_Sync</span>
            </div>
            <div>
              <p className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-hudc-dark mt-1">{stat.value}</h3>
              <p className="text-[9px] font-mono text-hudc-dark/30 mt-2">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY LOG (Placeholder) */}
      <div className="bg-white border border-hudc-light/30 rounded-sm">
        <div className="p-4 border-b border-hudc-light/10 bg-hudc-bg/30">
          <p className="text-[10px] font-mono font-bold text-hudc-dark uppercase tracking-widest">Recent_Activity_Stream</p>
        </div>
        <div className="p-8 text-center">
            <p className="text-xs font-mono text-hudc-dark/30 uppercase tracking-[0.2em]">
                // End_of_Stream // All_Systems_Operational
            </p>
        </div>
      </div>
    </div>
  );
}