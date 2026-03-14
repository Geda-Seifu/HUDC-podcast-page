import { useState } from "react";
import {
  Search,
  Filter,
  Mail,
  CheckCircle2,
  Trash2,
  X,
  ExternalLink,
  User,
  Send,
  Phone,
  Linkedin,
  Calendar,
  Globe,
  Cpu,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteEntry,
  fetchAllGuests,
  updateGuestStatus,
} from "../../api/admin";

export default function GuestManager() {
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const {
    data: guests = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: fetchAllGuests,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateGuestStatus(id, status),
    onSuccess: (updatedData, variables) => {
      // 1. Force a background refresh of the table
      queryClient.invalidateQueries({ queryKey: ["guests"] });

      // 2. Update the modal view with the real data returned from Supabase
      // This ensures that if the DB update failed, the UI won't change
      setSelectedGuest((prev) => ({
        ...prev,
        status: variables.status,
      }));
    },
    onError: (err) => {
      console.error("Mutation failed:", err);
      alert("Database update failed. Check console for details.");
    },
  });

  // 3. SEARCH FILTER LOGIC
  const filteredGuests = guests.filter((guest) => {
    const term = searchTerm.toLowerCase();
    return (
      guest.name?.toLowerCase().includes(term) ||
      guest.role?.toLowerCase().includes(term) ||
      guest.topic?.toLowerCase().includes(term)
    );
  });

  const getStatusStyle = (s) =>
    s === "scheduled"
      ? "text-green-500 bg-green-500/10 border-green-500/20"
      : s === "contacted"
        ? "text-blue-500 bg-blue-500/10 border-blue-500/20"
        : "text-amber-500 bg-amber-500/10 border-amber-500/20";

  // Place this right after your useQuery hook
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="w-12 h-12 border-2 border-hudc-blue/20 border-t-hudc-blue rounded-full animate-spin" />
        <p className="font-mono text-[10px] text-hudc-blue uppercase tracking-widest animate-pulse">
          Fetching_Guest_Data_From_Archive...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-hudc-dark tracking-tighter uppercase font-sans">
            Guest_Pipeline
          </h1>
          <p className="text-[11px] font-mono text-hudc-dark/40 uppercase tracking-widest mt-1">
            // total_entries: {filteredGuests.length}
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-hudc-dark/30" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search_logs..."
              className="w-full md:w-64 pl-9 pr-4 py-2 bg-white border border-hudc-light/30 rounded-sm text-xs font-mono outline-none focus:border-hudc-blue transition-all"
            />
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F8FAFC] border-b border-hudc-light/30">
            <tr>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider">
                Guest_Identity
              </th>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hudc-light/10">
            {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => (
              <tr
                key={guest.id}
                onClick={() => setSelectedGuest(guest)}
                className="hover:bg-hudc-bg/30 cursor-pointer transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-hudc-bg border border-hudc-light/20 flex items-center justify-center text-[10px] font-bold text-hudc-blue">
                      {guest.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-hudc-dark">
                        {guest.name}
                      </p>
                      <p className="text-[10px] font-mono text-hudc-blue uppercase">
                        {guest.role}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-xs border text-[9px] font-mono font-bold uppercase ${getStatusStyle(guest.status)}`}
                  >
                    {guest.status || "pending"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-hudc-dark/20 group-hover:text-hudc-blue transition-colors p-1">
                    <Cpu className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
            ):(<tr>
      <td colSpan="3" className="px-6 py-12 text-center">
        <p className="text-[10px] font-mono text-hudc-dark/30 uppercase tracking-widest">
          // no_matching_entries_found_in_pipeline
        </p>
      </td>
    </tr>)}
          </tbody>
        </table>
      </div>

      {/* 📟 POPUP MODAL */}
      {selectedGuest && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedGuest(null)}
          />

          {/* Card */}
          <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border-b border-hudc-light/10">
              <div className="flex items-center gap-2">
                <div className="bg-hudc-blue p-1 rounded-xs">
                  <Cpu className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase tracking-widest">
                  entry_details::{selectedGuest.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedGuest(null)}
                className="p-1 hover:bg-hudc-light/20 rounded transition-colors"
              >
                <X className="w-5 h-5 text-hudc-dark/40" />
              </button>
            </div>

            <div className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side: Avatar & Basic Info */}
                <div className="md:col-span-1 space-y-6">
                  <div className="flex flex-col items-center md:items-start space-y-4">
                    <div className="w-24 h-24 bg-hudc-blue/5 border-2 border-dashed border-hudc-blue/20 rounded-sm flex items-center justify-center text-hudc-blue font-bold text-3xl">
                      {selectedGuest.name?.[0]}
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="font-bold text-xl text-hudc-dark tracking-tight">
                        {selectedGuest.name}
                      </h3>
                      <p className="text-xs font-mono text-hudc-blue uppercase font-bold mt-1">
                        {selectedGuest.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-hudc-light/10">
                    <div className="flex items-center gap-3 text-hudc-dark/60">
                      <Send className="w-4 h-4 text-sky-500" />
                      <span className="text-xs font-mono font-bold">
                        {selectedGuest.telegram}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-hudc-dark/60">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span className="text-xs font-mono font-bold">
                        {selectedGuest.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Payload */}
                <div className="md:col-span-2 space-y-6">
                  {/* Links Section */}
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={selectedGuest.linkedin}
                      className="flex items-center justify-center gap-2 p-3 bg-hudc-bg/50 border border-hudc-light/20 rounded-sm text-[10px] font-mono font-bold hover:border-hudc-blue transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />{" "}
                      LINKEDIN
                    </a>
                    <a
                      href={selectedGuest.portfolio}
                      className="flex items-center justify-center gap-2 p-3 bg-hudc-bg/50 border border-hudc-light/20 rounded-sm text-[10px] font-mono font-bold hover:border-hudc-blue transition-all"
                    >
                      <LinkIcon className="w-3.5 h-3.5 text-hudc-dark/40" />{" "}
                      PORTFOLIO
                    </a>
                  </div>

                  {/* Rationale Section - Improved Visibility */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                      Rationale_Payload
                    </label>
                    <div className="p-5 bg-hudc-bg border border-hudc-blue/20 rounded-sm text-sm text-hudc-dark leading-relaxed font-sans relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-1 opacity-5">
                        <MessageSquare className="w-12 h-12" />
                      </div>
                      <p className="relative z-10 italic">
                        "{selectedGuest.rationale}"
                      </p>
                    </div>
                  </div>

                  {/* Status & Date */}
                  <div className="flex items-center justify-between p-4 border border-hudc-light/10 rounded-sm">
                    <div className="space-y-1">
                      <p className="text-[9px] font-mono text-hudc-dark/40 uppercase font-bold">
                        Submission_Date
                      </p>
                      <p className="text-xs font-bold text-hudc-dark">
                        {new Date(
                          selectedGuest.created_at,
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-3">
              <button
                disabled={statusMutation.isPending}
                onClick={() =>
                  statusMutation.mutate({
                    id: selectedGuest.id,
                    status:
                      selectedGuest.status === "scheduled"
                        ? "pending"
                        : "scheduled",
                  })
                }
                className={`flex-1 py-3 font-mono text-[11px] font-bold uppercase rounded-xs tracking-widest transition-all ${
                  statusMutation.isPending
                    ? "bg-hudc-blue/50 cursor-not-allowed"
                    : "bg-hudc-blue text-white hover:brightness-110 active:translate-y-px"
                }`}
              >
                {statusMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Cpu className="w-3 h-3 animate-spin" /> syncing_payload...
                  </span>
                ) : selectedGuest.status === "scheduled" ? (
                  "mark_as_pending"
                ) : (
                  "schedule_guest"
                )}
              </button>
              <button
                onClick={async () => {
                  if (window.confirm("Archive this entry?")) {
                    await deleteEntry("guests", selectedGuest.id);
                    queryClient.invalidateQueries(["guests"]);
                    setSelectedGuest(null);
                  }
                }}
                className="flex-1 border border-red-500/30 text-red-500 py-3 font-mono text-[11px] font-bold uppercase rounded-xs tracking-widest hover:bg-red-50 transition-all"
              >
                delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
