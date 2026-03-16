import { useState } from "react";
import { Search } from "lucide-react";
import { useGuests } from "./hooks/useGuests";
import GuestTable from "./components/GuestTable";
import GuestDetailsModal from "./components/GuestDetailModal";
import Loading from "../../components/animation/Loading";

export default function GuestManager() {
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { guests, isLoading } = useGuests();

  const filteredGuests = guests.filter((g) => 
    g.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loading text="Loading_guest_..." />;

  return (
    <div className="relative min-h-screen">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold uppercase">Guest_Pipeline</h1>
        <input 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search_logs..." 
          className="pl-9 pr-4 py-2 border rounded-sm font-mono text-xs" 
        />
      </div>

      <GuestTable guests={filteredGuests} onSelectGuest={setSelectedGuest} />

      {selectedGuest && (
        <GuestDetailsModal 
          guest={selectedGuest} 
          onClose={() => setSelectedGuest(null)} 
        />
      )}
    </div>
  );
}