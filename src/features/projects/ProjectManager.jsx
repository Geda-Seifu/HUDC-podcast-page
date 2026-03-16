import { useState } from "react";
import { useProjects } from "./hooks/useProject";
import Loading from "../../components/animation/Loading";
import ProjectManagerHead from "./components/ProjectManagerHead";
import Table from "./components/ProjectTable";
import ProjectModal from "./components/ProjectModal";

export default function ProjectManager() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { projects, totalCount, isLoading, approve, remove } = useProjects(searchTerm);

  if (isLoading) return <Loading text="Fetching_Archive..." />;

  return (
    <div className="relative">
      <ProjectManagerHead 
        length={totalCount} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <Table 
        filteredProjects={projects} 
        approveMutation={approve} 
        setSelectedProject={setSelectedProject} 
      />

      {selectedProject && (
        <ProjectModal 
          selectedProject={selectedProject}
          onClose={() => setSelectedProject(null)}
          approveMutation={approve}
          onDelete={() => {
            if (window.confirm("Delete repository?")) {
              remove(selectedProject.id);
              setSelectedProject(null);
            }
          }}
        />
      )}
    </div>
  );
}