import React from 'react';

export default function GuestTable({ guests, onSelectGuest }) {
  const getStatusStyle = (s) =>
    s === "scheduled" ? "text-green-500 bg-green-500/10 border-green-500/20" : 
    s === "contacted" ? "text-blue-500 bg-blue-500/10 border-blue-500/20" : 
    "text-amber-500 bg-amber-500/10 border-amber-500/20";

  return (
    <div className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#F8FAFC] border-b border-hudc-light/30">
          <tr>
            <th className="px-4 md:px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider">
              Guest_Identity
            </th>
            {/* Hidden on mobile, shown on desktop */}
            <th className="hidden md:table-cell px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-wider text-right">
              Status_Label
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-hudc-light/10">
          {guests.map((guest) => (
            <tr 
              key={guest.id} 
              onClick={() => onSelectGuest(guest)} 
              className="hover:bg-hudc-bg/40 cursor-pointer transition-all group active:bg-hudc-bg/60"
            >
              <td className="px-4 md:px-6 py-4">
                <div className="flex items-center gap-4">
                  {/* Identity Avatar */}
                  <div className="w-9 h-9 shrink-0 rounded-sm bg-hudc-bg border border-hudc-light/20 flex items-center justify-center text-[11px] font-bold text-hudc-blue group-hover:border-hudc-blue/30 transition-colors">
                    {guest.name ? guest.name[0] : '?'}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-hudc-dark truncate">
                      {guest.name}
                    </p>
                    <p className="text-[10px] font-mono text-hudc-blue uppercase tracking-tight opacity-70">
                      {guest.role}
                    </p>
                    
                    {/* Mobile-only status indicator */}
                    <div className="md:hidden mt-1.5">
                      <span className={`px-2 py-0.5 rounded-xs border text-[8px] font-mono font-bold uppercase ${getStatusStyle(guest.status)}`}>
                        {guest.status || "pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              
              {/* Desktop-only status cell */}
              <td className="hidden md:table-cell px-6 py-4 text-right">
                <span className={`px-2.5 py-1 rounded-xs border text-[9px] font-mono font-bold uppercase inline-block ${getStatusStyle(guest.status)}`}>
                  {guest.status || "pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Empty State fallback */}
      {guests.length === 0 && (
        <div className="p-20 text-center border-t border-hudc-light/10">
          <p className="text-xs font-mono text-hudc-dark/30 uppercase tracking-widest">// No_Guest_Data_Found</p>
        </div>
      )}
    </div>
  );
}