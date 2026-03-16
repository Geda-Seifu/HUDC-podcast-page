import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllProjects, updateProjectApproval, deleteEntry } from "../../../api/admin";

export function useProjects(searchTerm = "") {
  const queryClient = useQueryClient();

  // 1. Fetch
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin_projects"],
    queryFn: fetchAllProjects,
  });

  // 2. Approve/Revoke Mutation
  const approveMutation = useMutation({
    mutationFn: ({ id, status }) => updateProjectApproval(id, status),
    onSuccess: () => queryClient.invalidateQueries(["admin_projects"]),
  });

  // 3. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEntry("projects", id),
    onSuccess: () => queryClient.invalidateQueries(["admin_projects"]),
  });

  // 4. Client-side Filter
  const filteredProjects = projects.filter((project) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesTitle = project.title?.toLowerCase().includes(searchLower);
    const matchesStack = project.tech_stack?.some((tech) =>
      tech.toLowerCase().includes(searchLower)
    );
    return matchesTitle || matchesStack;
  });

  return {
    projects: filteredProjects,
    totalCount: projects.length,
    isLoading,
    approve: approveMutation.mutate,
    remove: deleteMutation.mutate,
    isProcessing: approveMutation.isPending || deleteMutation.isPending
  };
}