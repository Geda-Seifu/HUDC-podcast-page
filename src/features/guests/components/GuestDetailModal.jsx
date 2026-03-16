import { X, Cpu, Send, Phone, Linkedin, Link as LinkIcon, MessageSquare } from "lucide-react";
import { useGuests } from "../hooks/useGuests";

export default function GuestDetailsModal({ guest, onClose }) {
  const { updateStatus, isUpdating, deleteGuest } = useGuests();

  // Helper to handle status toggle
  const handleToggleStatus = () => {
    const newStatus = guest.status === "scheduled" ? "pending" : "scheduled";
    updateStatus({ id: guest.id, status: newStatus });
  };

  const handleDelete = () => {
    if (window.confirm("Archive this entry?")) {
      deleteGuest(guest.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border-b border-hudc-light/10">
          <div className="flex items-center gap-2">
            <div className="bg-hudc-blue p-1 rounded-xs">
              <Cpu className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase tracking-widest">
              entry_details::{guest.id}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-hudc-light/20 rounded transition-colors">
            <X className="w-5 h-5 text-hudc-dark/40" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="md:col-span-1 space-y-6">
              <div className="w-24 h-24 bg-hudc-blue/5 border-2 border-dashed border-hudc-blue/20 rounded-sm flex items-center justify-center text-hudc-blue font-bold text-3xl">
                {guest.name?.[0]}
              </div>
              <div>
                <h3 className="font-bold text-xl text-hudc-dark tracking-tight">{guest.name}</h3>
                <p className="text-xs font-mono text-hudc-blue uppercase font-bold mt-1">{guest.role}</p>
              </div>
              <div className="space-y-4 pt-4 border-t border-hudc-light/10">
                <div className="flex items-center gap-3 text-hudc-dark/60">
                  <Send className="w-4 h-4 text-sky-500" />
                  <span className="text-xs font-mono font-bold">{guest.telegram}</span>
                </div>
                <div className="flex items-center gap-3 text-hudc-dark/60">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-mono font-bold">{guest.phone}</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <a href={guest.linkedin} className="flex items-center justify-center gap-2 p-3 bg-hudc-bg/50 border border-hudc-light/20 rounded-sm text-[10px] font-mono font-bold hover:border-hudc-blue transition-all">
                  <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LINKEDIN
                </a>
                <a href={guest.portfolio} className="flex items-center justify-center gap-2 p-3 bg-hudc-bg/50 border border-hudc-light/20 rounded-sm text-[10px] font-mono font-bold hover:border-hudc-blue transition-all">
                  <LinkIcon className="w-3.5 h-3.5 text-hudc-dark/40" /> PORTFOLIO
                </a>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">Rationale_Payload</label>
                <div className="p-5 bg-hudc-bg border border-hudc-blue/20 rounded-sm text-sm italic">
                  "{guest.rationale}"
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-3">
          <button
            disabled={isUpdating}
            onClick={handleToggleStatus}
            className={`flex-1 py-3 font-mono text-[11px] font-bold uppercase rounded-xs tracking-widest transition-all ${
              isUpdating ? "bg-hudc-blue/50" : "bg-hudc-blue text-white hover:brightness-110"
            }`}
          >
            {isUpdating ? "syncing..." : guest.status === "scheduled" ? "mark_as_pending" : "schedule_guest"}
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 border border-red-500/30 text-red-500 py-3 font-mono text-[11px] font-bold uppercase rounded-xs hover:bg-red-50 transition-all"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
}