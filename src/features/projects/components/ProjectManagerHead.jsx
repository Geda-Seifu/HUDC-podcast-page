import React from 'react'
import { Search, X } from "lucide-react";
import { useAdminStore } from '../../../store/useAdminStore';
const ProjectManagerHead = ({length}) => {
  const {setSearchTerm,searchTerm} = useAdminStore((state)=>(state.setSearchTerm, state.searchTerm));
  return (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-hudc-dark tracking-tighter uppercase font-sans">
            Build_Showcase
          </h1>
          <p className="text-[11px] font-mono text-hudc-dark/40 uppercase tracking-widest mt-1">
            // active_submissions: {length}
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-hudc-dark/30" />
          <input
            type="text"
            placeholder="Search by title or stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 pl-9 pr-4 py-2 bg-white border border-hudc-light/30 rounded-sm text-xs font-mono outline-none focus:border-hudc-blue transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-hudc-dark/20 hover:text-hudc-dark"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
  )
}

export default ProjectManagerHead

