import { useInfiniteQuery } from "@tanstack/react-query";
import {
  Github,
  ExternalLink,
  Code2,
  User2,
  Terminal,
  ChevronDown,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import { useState } from "react";
import ProjectModal from "./components/ProjectModal";

const PROJECTS_PER_PAGE = 6;

export default function ProjectGallery() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["projects-showcase"],
    queryFn: async ({ pageParam = 0 }) => {
      // Calculate the range for Supabase
      const from = pageParam * PROJECTS_PER_PAGE;
      const to = from + PROJECTS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from("projects")
        .select("*", { count: "exact" }) // Get total count for the label
        .eq("is_approved", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;
      return {
        data,
        nextCursor:
          data.length === PROJECTS_PER_PAGE ? pageParam + 1 : undefined,
        total: count,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  const [selectedProject, setSelectedProject] = useState(null);

  if (isLoading)
    return (
      <div className="text-center py-20 font-mono text-hudc-blue animate-pulse uppercase tracking-widest">
        {">"} booting_gallery...
      </div>
    );
  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-mono italic">
        Error: sync_failed. Check console.
      </div>
    );

  // Flatten the pages into one array for mapping
  const allProjects = data?.pages.flatMap((page) => page.data) || [];
  const totalCount = data?.pages[0]?.total || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Tech-Focused Header */}
      <div className="mb-12 border-l-4 border-hudc-blue pl-6">
        <h2 className="text-3xl md:text-4xl font-bold text-hudc-dark font-sans uppercase tracking-tighter">
          Community_<span className="text-hudc-blue">Showcase</span>
        </h2>
        <p className="text-sm font-mono text-hudc-dark/60 mt-2 max-w-xl">
          // index_community_builds: exploring innovative solutions from HUDC
          members.
        </p>
      </div>

      {/* Structured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.length > 0 ? (
          allProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-hudc-light/30 rounded-sm hover:border-hudc-blue/50 transition-all flex flex-col shadow-sm hover:shadow-md"
              git
            >
            <div className="p-6 flex flex-col grow">
              {/* Header: Project Name & Repo Links */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-hudc-bg p-1.5 rounded-sm border border-hudc-light/20">
                    <Code2 className="w-4 h-4 text-hudc-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-hudc-dark group-hover:text-hudc-blue transition-colors font-sans">
                    {project.title}
                  </h3>
                </div>
                <div className="flex gap-1">
                  <a
                    href={project.github_link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 text-hudc-dark/40 hover:text-hudc-blue transition-colors border border-transparent hover:border-hudc-light/30 rounded-sm"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  {project.demo_link && (
                    <a
                      href={project.demo_link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 text-hudc-dark/40 hover:text-hudc-blue transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs font-mono text-hudc-dark/70 line-clamp-2 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack: Clean Labels */}
              <div className="flex flex-wrap gap-2 mt-auto mb-6">
                {project.tech_stack?.map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] font-mono font-bold uppercase tracking-tight px-2 py-0.5 bg-hudc-bg/50 text-hudc-blue border border-hudc-light/20 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Creator Metadata */}
              <div className="pt-4 border-t border-hudc-light/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User2 className="w-3 h-3 text-hudc-dark/40" />
                  <span className="text-[10px] font-mono font-bold text-hudc-dark/50 uppercase">
                    dev: {project.author || "Anonymous"}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(project)} // Open modal with this project's data
                  className="text-[10px] font-mono font-bold text-hudc-blue uppercase hover:underline flex items-center gap-1"
                >
                  view_docs <ChevronDown className="w-3 h-3" />
                </button>

              </div>
            </div>
          </div>
        ))):(
          <div className="text-center col-span-full py-20 text-hudc-dark/50 font-mono italic">
            No projects found. Be the first to submit your work!
          </div>
        )}
      </div>
                {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

      {/* LOAD MORE / NAVIGATION */}
      {hasNextPage && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-3 px-8 py-3 bg-white border border-hudc-light\/30 text-hudc-dark font-mono text-xs font-bold rounded-sm hover:bg-hudc-bg transition-all border-b-4 border-black/10 active:border-b-0 active:translate-y-0.5 disabled:opacity-50"
          >
            <Terminal className="w-4 h-4 text-hudc-blue" />
            {isFetchingNextPage ? "FETCHING_SEGMENT..." : "> fetch_more_builds"}
          </button>

          <p className="text-[10px] font-mono text-hudc-dark/40 uppercase tracking-widest">
            Showing {allProjects.length} of {totalCount} verified_entries
          </p>
        </div>
      )}
    </div>
  );
}
