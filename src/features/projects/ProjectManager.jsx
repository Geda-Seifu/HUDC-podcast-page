import { useState } from "react";
import { useProjects } from "./hooks/useProject";
import Loading from "../../components/animation/Loading";
import ProjectManagerHead from "./components/ProjectManagerHead";
import Table from "./components/ProjectTable";
import ProjectModal from "./components/ProjectModal";
import { useAdminStore } from "../../store/useAdminStore";
import ProjectTableBody from "./components/ProjectTableBody";

export default function ProjectManager() {
  const { projects, totalCount, isLoading, approve } = useProjects();
  const selectedProject = useAdminStore((state) => state.selectedProject);

  if (isLoading) return <Loading text="Fetching_Archive..." />;

  return (
    <div className="relative">
      <ProjectManagerHead length={totalCount} />

      <Table>
        <ProjectTableBody
          filteredProjects={projects}
          approveMutation={approve}
        />
      </Table>

      {selectedProject && <ProjectModal approveMutation={approve} />}
    </div>
  );
}
