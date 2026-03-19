import React, { use, useState } from "react";
import { 
  Code2, Trash2, X, Github, Globe, User, Loader2, 
  ExternalLink, Eye, Info, Database 
} from "lucide-react";
import { useAdminStore } from "../../../store/useAdminStore";
import { useProjects } from "../hooks/useProject";
import MetadataRow from "./MetaData";

const ProjectModal = ({ approveMutation }) => {
 
  
  const selectedProject = useAdminStore((state) => state.selectedProject);
  const setSelectedProject = useAdminStore((state) => state.setSelectedProject);
  const showMetadata = useAdminStore((state) => state.showMetadata);
  const setShowMetadata = useAdminStore((state) => state.setShowMetadata);  
  const onClose = useAdminStore((state) => state.closeModal);
  const { remove } = useProjects();

  if (!selectedProject) return null;

  const isSyncing =
    (approveMutation.isPending || approveMutation.isLoading) &&
    approveMutation.variables?.id === selectedProject.id;

  

  const onDelete = () => {
    if (window.confirm("Delete repository?")) {
      remove(selectedProject.id);
      setSelectedProject(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md" onClick={onClose} />

      <div className={`relative w-full transition-all duration-300 ${showMetadata ? 'max-w-5xl' : 'max-w-2xl'} bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden flex flex-col md:flex-row`}>
        
        {/* LEFT SIDE: MAIN OVERVIEW (Your Current Modal) */}
        <div className="flex-1 flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border-b border-hudc-light/10">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-hudc-blue" />
              <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase tracking-tighter">
                CORE_PAYLOAD_v{selectedProject.id.split("-")[0]}
              </span>
            </div>
            <button onClick={onClose} className="md:hidden p-1 hover:bg-hudc-bg rounded-full">
              <X className="w-5 h-5 text-hudc-dark/40" />
            </button>
          </div>

          <div className="p-8 space-y-8 overflow-y-auto">
            {/* 1. Intro Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hudc-light/10 pb-6">
              <div>
                <h3 className="font-bold text-2xl text-hudc-dark tracking-tighter uppercase leading-none">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <User className="w-3.5 h-3.5 text-hudc-blue" />
                  <span className="text-xs font-mono font-bold text-hudc-dark/60 uppercase">
                    author:: {selectedProject.student_name || "anonymous_dev"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {selectedProject.github_link && (
                  <a href={selectedProject.github_link} target="_blank" className="p-2.5 bg-hudc-dark text-white rounded-xs hover:bg-hudc-blue transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.demo_link && (
                  <a href={selectedProject.demo_link} target="_blank" className="p-2.5 border border-hudc-light/30 rounded-xs hover:bg-hudc-bg transition-all text-hudc-blue">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* 2. SCREENSHOTS SECTION (NEW) */}
            {selectedProject.screenshots?.length > 0 && (
              <div className="space-y-4">
                <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest flex items-center gap-2">
                  // visual_evidence_{selectedProject.screenshots.length}
                </label>
                <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                  {selectedProject.screenshots.map((url, i) => (
                    <div key={i} className="group relative shrink-0 w-48 h-28 bg-hudc-bg rounded-sm border border-hudc-light/20 overflow-hidden">
                      <img src={url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <a href={url} target="_blank" className="absolute inset-0 bg-hudc-blue/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                         <Eye className="text-white w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Grid Details */}
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                  Architecture_Overview
                </label>
                <div className="p-5 bg-hudc-bg border border-hudc-blue/10 rounded-sm text-sm text-hudc-dark/80 italic leading-relaxed">
                  "{selectedProject.description || "No documentation provided."}"
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                  Dependency_Tree
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech_stack?.length > 0 ? (
                    selectedProject.tech_stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-white border border-hudc-light/20 rounded-xs text-[10px] font-mono font-bold uppercase shadow-sm">
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] font-mono text-hudc-dark/30 italic font-bold">// NO_STACK_IDENTIFIED</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-2">
             <button
              onClick={() => setShowMetadata(!showMetadata)}
              className={`px-4 flex items-center gap-2 font-mono text-[10px] font-bold uppercase border transition-all
                ${showMetadata ? 'bg-hudc-blue text-white border-hudc-blue' : 'text-hudc-dark/60 border-hudc-light hover:bg-white'}
              `}
            >
              <Database className="w-3.5 h-3.5" />
              {showMetadata ? 'Close_Logs' : 'View_Full_Metadata'}
            </button>

            <button
              disabled={isSyncing}
              onClick={() => approveMutation.mutate({ id: selectedProject.id, status: !selectedProject.is_approved })}
              className={`flex-1 py-3 font-mono text-[11px] font-bold uppercase rounded-xs transition-all flex items-center justify-center gap-2
                ${isSyncing ? "bg-hudc-dark/70 text-white/50" : "bg-hudc-dark text-white hover:bg-hudc-blue"}
              `}
            >
              {isSyncing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
              {selectedProject.is_approved ? "revoke_approval" : "approve_showcase"}
            </button>

            <button onClick={onDelete} className="px-6 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: FULL METADATA LOGS (SLIDE-OUT) */}
        {showMetadata && (
          <div className="w-full md:w-80 bg-hudc-bg border-l border-hudc-light/30 flex flex-col animate-in slide-in-from-right duration-300">
             <div className="p-4 bg-white border-b border-hudc-light/10 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase">Extracted_Logs</span>
                <button onClick={() => setShowMetadata(false)}><X className="w-4 h-4" /></button>
             </div>
             <div className="p-6 overflow-y-auto space-y-6">
                <MetadataRow label="Project_Type" value={selectedProject.project_type} />
                <MetadataRow label="Video_Demo" value={selectedProject.video_demo_url} isLink />
                <MetadataRow label="X_Twitter" value={selectedProject.twitter_link} isLink />
                <MetadataRow label="Discord" value={selectedProject.discord_handle} />
                <MetadataRow label="Timestamp" value={new Date(selectedProject.created_at).toLocaleString()} />
                <div className="pt-4 mt-4 border-t border-hudc-light/20">
                    <p className="text-[9px] font-mono text-hudc-dark/30 uppercase leading-relaxed">
                        // All fields are displayed here regardless of current system config.
                    </p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default ProjectModal;