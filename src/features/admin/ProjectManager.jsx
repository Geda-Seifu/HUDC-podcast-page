import { useState } from "react";
import {
  Search,
  Filter,
  ExternalLink,
  Github,
  Code2,
  Layers,
  User,
  X,
  Cpu,
  CheckCircle2,
  Trash2,
  Globe,
  Terminal,
  Box,
} from "lucide-react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllProjects,
  updateProjectApproval,
  deleteEntry,
} from "../../api/admin";

const MOCK_PROJECTS = [
  {
    id: "P-401",
    title: "ThemeWave",
    author: "Harry",
    tech_stacktack: ["React", "Tailwind", "Node.js"],
    status: "reviewed",
    date: "2026-03-01",
    description:
      "A platform for creating and sharing Telegram themes based on color extraction from images.",
    links: {
      github: "github.com/harry/themewave",
      live: "themewave.vercel.app",
    },
  },
  {
    id: "P-402",
    title: "Ethio-Market API",
    author: "Dawit Isaac",
    tech_stacktack: ["Express", "MongoDB", "MERN"],
    status: "pending",
    date: "2026-03-05",
    description:
      "A robust REST API for local e-commerce transactions using Telebirr integration.",
    links: { github: "github.com/dawit/ethio-api", live: "" },
  },
];
export default function ProjectManager() {
  const [selectedProject, setSelectedProject] = useState(null);

  // --- 1. ADDED SEARCH STATE ---
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  // 1. Fetching real data
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin_projects"],
    queryFn: fetchAllProjects,
  });

  // 2. Mutation for Approval
  const approveMutation = useMutation({
    mutationFn: ({ id, status }) => updateProjectApproval(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["admin_projects"]);
      setSelectedProject(null); // Close modal on success
    },
  });

  // --- 2. ADDED FILTER LOGIC ---
  // This calculates the list to show based on the title or the tech stack tags
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();

    const matchesTitle = project.title?.toLowerCase().includes(searchLower);

    const matchesStack = project.tech_stack?.some((tech) =>
      tech.toLowerCase().includes(searchLower),
    );

    return matchesTitle || matchesStack;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 space-y-4">
        <div className="w-12 h-12 border-2 border-hudc-blue/20 border-t-hudc-blue rounded-full animate-spin" />
        <p className="font-mono text-[10px] text-hudc-blue uppercase tracking-widest animate-pulse">
          Fetching_Project_Data_From_Archive...
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-hudc-dark tracking-tighter uppercase font-sans">
            Build_Showcase
          </h1>
          <p className="text-[11px] font-mono text-hudc-dark/40 uppercase tracking-widest mt-1">
            // active_submissions: {projects.length}
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

      {/* PROJECT TABLE */}
      <div className="bg-white border border-hudc-light/30 rounded-sm overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F8FAFC] border-b border-hudc-light/30">
            <tr>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase">
                Project_Header
              </th>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase">
                Tech_Stack
              </th>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-mono font-bold text-hudc-dark/40 uppercase text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-hudc-light/10">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="hover:bg-hudc-bg/30 cursor-pointer transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-hudc-bg border border-hudc-light/20 rounded-sm">
                        <Box className="w-4 h-4 text-hudc-blue" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-hudc-dark uppercase tracking-tight">
                          {project.title}
                        </p>
                        <p className="text-[10px] font-mono text-hudc-dark/40">
                          Dev: {project.student_name || "Anonymous"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {/* Added Optional Chaining ?. to prevent crashes if stack is null */}
                      {project.tech_stack?.slice(0, 2).map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-mono bg-hudc-blue/5 text-hudc-blue px-1.5 py-0.5 rounded-xs border border-hudc-blue/10"
                        >
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

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-xs border text-[9px] font-mono font-bold uppercase ${
                        project.is_approved
                          ? "text-green-500 bg-green-500/10 border-green-500/20"
                          : "text-amber-500 bg-amber-500/10 border-amber-500/20"
                      }`}
                    >
                      {project.is_approved ? "reviewed" : "pending"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        approveMutation.mutate({
                          id: project.id,
                          status: !project.is_approved,
                        });
                      }}
                      className="text-hudc-dark/20 group-hover:text-hudc-blue transition-colors font-mono text-[10px] font-bold uppercase border border-transparent hover:border-hudc-blue/20 px-2 py-1 rounded"
                    >
                      {project.is_approved ? "revoke" : "approve"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-12 text-center">
                  <p className="text-[10px] font-mono text-hudc-dark/30 uppercase tracking-widest">
                    // no_matching_entries_found_in_pipeline
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📟 PROJECT POPUP CARD */}
      {selectedProject && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-hudc-dark/40 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl border border-hudc-light/30 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] border-b border-hudc-light/10">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-hudc-blue" />
                <span className="text-[10px] font-mono font-bold text-hudc-dark uppercase tracking-widest">
                  repository_v{selectedProject.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1 hover:bg-hudc-light/20 rounded transition-colors"
              >
                <X className="w-5 h-5 text-hudc-dark/40" />
              </button>
            </div>

            <div className="p-8 space-y-8 max-h-[80vh] overflow-y-auto">
              {/* Project Intro */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-hudc-light/10 pb-6">
                <div>
                  <h3 className="font-bold text-2xl text-hudc-dark tracking-tighter uppercase">
                    {selectedProject.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-3.5 h-3.5 text-hudc-blue" />
                    <span className="text-xs font-bold text-hudc-dark/60">
                      dev:: {selectedProject.author}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedProject.github_link && (
                    <a
                      href={`${selectedProject.github_link}`}
                      className="p-2 bg-hudc-dark text-white rounded hover:bg-hudc-blue transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {selectedProject.demo_link && (
                    <a
                      href={`${selectedProject?.demo_link}`}
                      className="p-2 border border-hudc-light/30 rounded hover:bg-hudc-bg transition-all"
                    >
                      <Globe className="w-4 h-4 text-hudc-blue" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                    Architecture_Overview
                  </label>
                  <div className="p-4 bg-hudc-bg border border-hudc-blue/10 rounded-sm text-sm text-hudc-dark/80 italic leading-relaxed">
                    "{selectedProject.description}"
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-mono font-bold text-hudc-dark/40 uppercase tracking-widest">
                    Dependency_Tree
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech_stack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-hudc-light/20 rounded-xs shadow-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-hudc-blue"></div>
                        <span className="text-xs font-mono font-bold">
                          {tech}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Meta Data */}
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#F8FAFC] border-t border-hudc-light/10 flex gap-2">
              <button
                onClick={() => {
                  // Toggles the approval status using the selected project's ID
                  approveMutation.mutate({
                    id: selectedProject.id,
                    status: !selectedProject.is_approved,
                  });
                }}
                className="flex-1 bg-hudc-dark text-white py-3 font-mono text-[11px] font-bold uppercase rounded-xs tracking-widest hover:bg-hudc-blue transition-all shadow-lg shadow-hudc-blue/5"
              >
                {selectedProject.is_approved
                  ? "revoke_approval"
                  : "approve_showcase"}
              </button>
              <button
                onClick={async () => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this repository?",
                    )
                  ) {
                    // Calls your delete API function
                    await deleteEntry("projects", selectedProject.id);
                    // Refresh the list and close the modal
                    queryClient.invalidateQueries(["admin_projects"]);
                    setSelectedProject(null);
                  }
                }}
                className="px-6 border border-red-500/20 text-red-500/60 hover:text-red-500 hover:bg-red-50 transition-all rounded-xs"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
