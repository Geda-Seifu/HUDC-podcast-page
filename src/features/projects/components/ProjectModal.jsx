// import { Code2,Trash2,X ,Github, Globe, User, } from "lucide-react";


// const ProjectModal = ({
//     selectedProject, 
//     onClose,         
//     approveMutation, 
//     onDelete,        
// }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
//       {console.log(selectedProject)}
//       {/* Backdrop */}
//       <div
//         className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md"
//         onClick={onClose} 
//       />

//       <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 bg-[#F8FAFC]">
//           <div className="flex items-center gap-2">
//             <Code2 className="w-4 h-4 text-hudc-blue" />
//             <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase">
//               repository_v{selectedProject.id}
//             </span>
//           </div>
//           <button onClick={onClose} className="p-1"> {/* USE THE PROP */}
//             <X className="w-5 h-5 text-hudc-dark/40" />
//           </button>
//         </div>

//         {/* ... Body content is fine ... */}
//         {/* --- START BODY CONTENT --- */}
//         <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
//           {/* 1. Intro Section */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hudc-light/10 pb-6">
//             <div>
//               <h3 className="font-bold text-2xl text-hudc-dark tracking-tighter uppercase leading-none">
//                 {selectedProject.title}
//               </h3>
//               <div className="flex items-center gap-2 mt-2">
//                 <User className="w-3.5 h-3.5 text-hudc-blue" />
//                 <span className="text-xs font-mono font-bold text-hudc-dark/60 uppercase">
//                   author:: {selectedProject.student_name || "anonymous_dev"}
//                 </span>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               {selectedProject.github_link && (
//                 <a
//                   href={selectedProject.github_link}
//                   target="_blank"
//                   className="p-2.5 bg-hudc-dark text-white rounded-xs hover:bg-hudc-blue transition-all"
//                 >
//                   <Github className="w-4 h-4" />
//                 </a>
//               )}
//               {selectedProject.demo_link && (
//                 <a
//                   href={selectedProject.demo_link}
//                   target="_blank"
//                   className="p-2.5 border border-hudc-light/30 rounded-xs hover:bg-hudc-bg transition-all"
//                 >
//                   <Globe className="w-4 h-4 text-hudc-blue" />
//                 </a>
//               )}
//             </div>
//           </div>

//           {/* 2. Grid Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
//             {/* Left: Architecture/Description */}
//             <div className="space-y-4">
//               <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
//                 Architecture_Overview
//               </label>
//               <div className="p-5 bg-hudc-bg border border-hudc-blue/10 rounded-sm text-sm text-hudc-dark/80 italic leading-relaxed">
//                 "{selectedProject.description || "No documentation provided for this repository."}"
//               </div>
//             </div>

//             {/* Right: Dependency Tree / Tech Stack */}
//             <div className="space-y-4">
//               <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
//                 Dependency_Tree
//               </label>
//               <div className="flex flex-wrap gap-2">
//                 {selectedProject.tech_stack?.length > 0 ? (
//                   selectedProject.tech_stack.map((tech) => (
//                     <div
//                       key={tech}
//                       className="flex items-center gap-2 px-3 py-1.5 bg-white border border-hudc-light/20 rounded-xs shadow-sm"
//                     >
//                       <div className="w-1.5 h-1.5 rounded-full bg-hudc-blue"></div>
//                       <span className="text-[10px] font-mono font-bold uppercase">{tech}</span>
//                     </div>
//                   ))
//                 ) : (
//                   <span className="text-[10px] font-mono text-hudc-dark/30 italic">No tags identified.</span>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Actions */}
//         <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-2">
//           <button
//             onClick={() => {
//               // Since 'approveMutation' is the function itself now:
//               approveMutation({
//                 id: selectedProject.id,
//                 status: !selectedProject.is_approved,
//               });
//             }}
//             className="flex-1 bg-hudc-dark text-white py-3 font-mono text-[11px] font-bold uppercase rounded-xs"
//           >
//             {selectedProject.is_approved ? "revoke_approval" : "approve_showcase"}
//           </button>
          
//           <button
//             onClick={onDelete} // USE THE PROP (The parent handles the confirm and logic)
//             className="px-6 border border-red-500/20 text-red-500/60 hover:text-red-500 rounded-xs"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectModal;


import { Code2, Trash2, X, Github, Globe, User, Loader2 } from "lucide-react";

const ProjectModal = ({
    selectedProject, 
    onClose,         
    approveMutation, 
    onDelete,        
}) => {
  // Check if this specific project is currently being processed
  const isSyncing = 
    (approveMutation.isPending || approveMutation.isLoading) && 
    approveMutation.variables?.id === selectedProject.id;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md"
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#F8FAFC]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-hudc-blue" />
            <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase">
              repository_v{selectedProject.id.split('-')[0]}
            </span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-hudc-bg rounded-full transition-colors">
            <X className="w-5 h-5 text-hudc-dark/40" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          
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
                <a
                  href={selectedProject.github_link}
                  target="_blank"
                  className="p-2.5 bg-hudc-dark text-white rounded-xs hover:bg-hudc-blue transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {selectedProject.demo_link && (
                <a
                  href={selectedProject.demo_link}
                  target="_blank"
                  className="p-2.5 border border-hudc-light/30 rounded-xs hover:bg-hudc-bg transition-all"
                >
                  <Globe className="w-4 h-4 text-hudc-blue" />
                </a>
              )}
            </div>
          </div>

          {/* 2. Grid Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                Architecture_Overview
              </label>
              <div className="p-5 bg-hudc-bg border border-hudc-blue/10 rounded-sm text-sm text-hudc-dark/80 italic leading-relaxed">
                "{selectedProject.description || "No documentation provided for this repository."}"
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                Dependency_Tree
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech_stack?.length > 0 ? (
                  selectedProject.tech_stack.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white border border-hudc-light/20 rounded-xs shadow-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-hudc-blue"></div>
                      <span className="text-[10px] font-mono font-bold uppercase">{tech}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-[10px] font-mono text-hudc-dark/30 italic">No tags identified.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-2">
          <button
            disabled={isSyncing}
            onClick={() => {
              // CHANGED: Use .mutate because approveMutation is an object now
              approveMutation.mutate({
                id: selectedProject.id,
                status: !selectedProject.is_approved,
              });
            }}
            className={`flex-1 py-3 font-mono text-[11px] font-bold uppercase rounded-xs transition-all flex items-center justify-center gap-2 active:scale-[0.98]
              ${isSyncing ? "bg-hudc-dark/70 cursor-wait text-white/50" : "bg-hudc-dark text-white hover:bg-hudc-blue cursor-pointer"}
            `}
          >
            {isSyncing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Syncing_Changes...
              </>
            ) : (
              selectedProject.is_approved ? "revoke_approval" : "approve_showcase"
            )}
          </button>
          
          <button
            onClick={onDelete} 
            className="px-6 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-50 transition-colors rounded-xs cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;