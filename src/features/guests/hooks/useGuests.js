import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllGuests, updateGuestStatus, deleteEntry } from "../../../api/admin";

export function useGuests() {
  const queryClient = useQueryClient();

  const guestsQuery = useQuery({
    queryKey: ["guests"],
    queryFn: fetchAllGuests,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => updateGuestStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries(["guests"]),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteEntry("guests", id),
    onSuccess: () => queryClient.invalidateQueries(["guests"]),
  });

  return { 
    guests: guestsQuery.data || [], 
    isLoading: guestsQuery.isLoading,
    updateStatus: statusMutation.mutate,
    isUpdating: statusMutation.isPending,
    deleteGuest: deleteMutation.mutate
  };
}