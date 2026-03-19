import { create } from 'zustand';

export const useAdminStore = create((set) => ({
  // 1. State Variables
  searchTerm: "",
  selectedProject: null,
  showMetadata: false,


  // 2. Action Functions (The "Setters")
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setShowMetadata: (show) => set({ showMetadata: show }),
  closeModal: () => set({ selectedProject: null }),
}));