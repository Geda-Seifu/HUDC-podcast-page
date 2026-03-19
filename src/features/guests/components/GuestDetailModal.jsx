import React, { useState } from "react";
import { 
  X, Cpu, Send, Phone, Linkedin, Link as LinkIcon, 
  MessageSquare, Twitter, Disc, Calendar, Database, 
  ExternalLink, Trash2, User, Terminal 
} from "lucide-react";
import { useGuests } from "../hooks/useGuests";

export default function GuestDetailsModal({ guest, onClose }) {
  const [showFullLogs, setShowFullLogs] = useState(false);
  const { updateStatus, isUpdating, deleteGuest } = useGuests();

  if (!guest) return null;

  const handleToggleStatus = () => {
    const newStatus = guest.status === "scheduled" ? "pending" : "scheduled";
    updateStatus({ id: guest.id, status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm("Archive this entry permanently?")) {
      deleteGuest(guest.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md" onClick={onClose} />

      {/* Modal Content - Dynamic Width */}
      <div className={`relative w-full transition-all duration-300 ${showFullLogs ? 'max-w-5xl' : 'max-w-2xl'} bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200`}>
        
        {/* LEFT SIDE: CORE PROFILE */}
        <div className="flex-1 flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border-b border-hudc-light/10">
            <div className="flex items-center gap-2">
              <div className="bg-hudc-blue p-1 rounded-xs">
                <Cpu className="w-3 h-3 text-white" />
              </div>
              <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase tracking-widest">
                GUEST_OBJECT::{guest.id.split('-')[0]}
              </span>
            </div>
            <button onClick={onClose} className="md:hidden p-1 hover:bg-hudc-light/20 rounded">
              <X className="w-5 h-5 text-hudc-dark/40" />
            </button>
          </div>

          {/* Main Body */}
          <div className="p-8 overflow-y-auto space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Profile Avatar & Primary Contacts */}
              <div className="md:w-1/3 space-y-6">
                <div className="w-24 h-24 bg-hudc-blue/5 border-2 border-dashed border-hudc-blue/20 rounded-sm flex items-center justify-center text-hudc-blue font-bold text-3xl">
                  {guest.name?.[0]}
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-hudc-dark tracking-tighter uppercase leading-tight">{guest.name}</h3>
                  <p className="text-xs font-mono text-hudc-blue uppercase font-bold mt-1 tracking-widest">{guest.role}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t border-hudc-light/10">
                  <ContactItem icon={Send} value={guest.telegram} color="text-sky-500" />
                  <ContactItem icon={Phone} value={guest.phone} color="text-green-500" />
                </div>
              </div>

              {/* Rationale & Quick Links */}
              <div className="md:w-2/3 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <QuickLink icon={Linkedin} label="LINKEDIN" url={guest.linkedin} color="text-blue-600" />
                  <QuickLink icon={LinkIcon} label="PORTFOLIO" url={guest.portfolio} color="text-hudc-dark/40" />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="w-3 h-3" /> Rationale_Payload
                  </label>
                  <div className="p-5 bg-hudc-bg border border-hudc-blue/10 rounded-sm text-sm italic text-hudc-dark/80 leading-relaxed">
                    "{guest.rationale || "No rationale provided for this entry."}"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-3">
            <button
              onClick={() => setShowFullLogs(!showFullLogs)}
              className={`px-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase border transition-all
                ${showFullLogs ? 'bg-hudc-blue text-white border-hudc-blue' : 'text-hudc-dark/60 border-hudc-light hover:bg-white'}
              `}
            >
              <Database className="w-3.5 h-3.5" />
              {showFullLogs ? 'Hide_Logs' : 'Full_Manifest'}
            </button>

            <button
              disabled={isUpdating}
              onClick={handleToggleStatus}
              className={`flex-1 py-3 font-mono text-[11px] font-bold uppercase rounded-xs tracking-widest transition-all ${
                isUpdating ? "bg-hudc-blue/50 text-white/50" : "bg-hudc-dark text-white hover:bg-hudc-blue"
              }`}
            >
              {isUpdating ? "syncing..." : guest.status === "scheduled" ? "revoke_schedule" : "confirm_schedule"}
            </button>

            <button
              onClick={handleDelete}
              className="px-6 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-50 transition-all rounded-xs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: THE FULL MANIFEST (SLIDE-OUT) */}
        {showFullLogs && (
          <div className="w-full md:w-80 bg-hudc-bg border-l border-hudc-light/30 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 bg-white border-b border-hudc-light/10 flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase">System_Metadata</span>
              <button onClick={() => setShowFullLogs(false)} className="p-1 hover:bg-hudc-bg rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <ManifestRow label="Availability" value={guest.availability} icon={Calendar} />
              <ManifestRow label="Preferred_Topics" value={guest.preferred_topics} icon={MessageSquare} />
              <ManifestRow label="Twitter_X" value={guest.twitter} icon={Twitter} isLink />
              <ManifestRow label="Discord" value={guest.discord_handle} icon={Disc} />
              <ManifestRow label="Entry_Date" value={new Date(guest.created_at).toLocaleDateString()} icon={Calendar} />
              
              <div className="pt-6 mt-4 border-t border-hudc-light/20">
                <p className="text-[9px] font-mono text-hudc-dark/30 uppercase leading-relaxed tracking-tighter">
                  // audit_note: showing all captured fields from historical entry regardless of current UI config.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Sub-Components for Cleanliness ---

const ContactItem = ({ icon: Icon, value, color }) => (
  <div className="flex items-center gap-3 text-hudc-dark/60">
    <Icon className={`w-3.5 h-3.5 ${color}`} />
    <span className="text-[11px] font-mono font-bold truncate">{value || "N/A"}</span>
  </div>
);

const QuickLink = ({ icon: Icon, label, url, color }) => (
  <a 
    href={url} 
    target="_blank" 
    rel="noreferrer"
    className={`flex items-center justify-center gap-2 p-3 bg-white border border-hudc-light/20 rounded-sm text-[10px] font-mono font-bold hover:border-hudc-blue transition-all group ${!url && 'opacity-30 pointer-events-none'}`}
  >
    <Icon className={`w-3.5 h-3.5 ${color} group-hover:scale-110 transition-transform`} /> {label}
  </a>
);

const ManifestRow = ({ label, value, icon: Icon, isLink }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
        <Icon className="w-3 h-3 text-hudc-blue/50" />
        <p className="text-[9px] font-mono font-bold text-hudc-blue uppercase tracking-tighter">{label}</p>
    </div>
    {value ? (
      isLink ? (
        <a href={value} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-hudc-dark/80 hover:text-hudc-blue underline flex items-center gap-1 break-all">
          {value} <ExternalLink className="w-2.5 h-2.5 shrink-0" />
        </a>
      ) : (
        <p className="text-[11px] font-mono text-hudc-dark/80 leading-relaxed">{value}</p>
      )
    ) : (
      <p className="text-[10px] font-mono text-hudc-dark/20 uppercase italic font-bold tracking-widest">missing_data</p>
    )}
  </div>
);