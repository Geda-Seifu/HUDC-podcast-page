import React from "react";
import { Box, CheckCircle, XCircle } from "lucide-react";

const ProjectTableBody = ({
  filteredProjects,
  setSelectedProject,
  approveMutation,
}) => {
  return (
    <tbody className="divide-y divide-hudc-light/10">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <tr
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="hover:bg-hudc-bg/30 cursor-pointer transition-colors group active:bg-hudc-bg/50"
          >
            {/* Main Project Identity */}
            <td className="px-4 md:px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-hudc-bg border border-hudc-light/20 rounded-sm shrink-0">
                  <Box className="w-4 h-4 text-hudc-blue" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-hudc-dark uppercase tracking-tight truncate">
                    {project.title}
                  </p>
                  <p className="text-[10px] font-mono text-hudc-dark/40 truncate">
                    Dev: {project.student_name || "Anonymous"}
                  </p>
                  
                  {/* MOBILE-ONLY: Inline Status Badge */}
                  <div className="md:hidden mt-1">
                    <span className={`text-[8px] font-mono font-bold uppercase ${
                      project.is_approved ? "text-green-500" : "text-amber-500"
                    }`}>
                      ● {project.is_approved ? "reviewed" : "pending"}
                    </span>
                  </div>
                </div>
              </div>
            </td>

            {/* Tech Stack - Hidden on Mobile */}
            <td className="hidden md:table-cell px-6 py-4">
              <div className="flex gap-1 flex-wrap">
                {project.tech_stack?.slice(0, 2).map((s) => (
                  <span key={s} className="text-[9px] font-mono bg-hudc-blue/5 text-hudc-blue px-1.5 py-0.5 rounded-xs border border-hudc-blue/10">
                    {s}
                  </span>
                ))}
                {project.tech_stack?.length > 2 && (
                  <span className="text-[9px] font-mono text-hudc-dark/40">
                    +{project.tech_stack.length - 2}
                  </span>
                )}
              </div>
            </td>

            {/* Status - Hidden on Mobile */}
            <td className="hidden md:table-cell px-6 py-4">
              <span className={`px-2 py-0.5 rounded-xs border text-[9px] font-mono font-bold uppercase ${
                project.is_approved
                  ? "text-green-500 bg-green-500/10 border-green-500/20"
                  : "text-amber-500 bg-amber-500/10 border-amber-500/20"
              }`}>
                {project.is_approved ? "reviewed" : "pending"}
              </span>
            </td>

            {/* Action - Always Visible */}
            <td className="px-4 md:px-6 py-4 text-right">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  approveMutation.mutate({
                    id: project.id,
                    status: !project.is_approved,
                  });
                }}
                className={`transition-all font-mono text-[10px] font-bold uppercase border px-3 py-1.5 rounded-sm active:scale-90 ${
                  project.is_approved 
                    ? "text-red-500 border-red-100 hover:bg-red-50" 
                    : "text-hudc-blue border-hudc-blue/20 hover:bg-hudc-blue/5"
                }`}
              >
                {/* On mobile we can use icons to save space, but keeping text for your "Admin" feel */}
                {project.is_approved ? "revoke" : "approve"}
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" className="px-6 py-12 text-center">
            <p className="text-[10px] font-mono text-hudc-dark/30 uppercase tracking-widest">
              // no_matching_entries_found_in_pipeline
            </p>
          </td>
        </tr>
      )}
    </tbody>
  );
};


export default ProjectTableBody;