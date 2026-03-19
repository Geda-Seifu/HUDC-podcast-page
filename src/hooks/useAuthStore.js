// store/useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  setAuth: (session) =>
    set({
      session: session,
      user: session?.user ?? null,
      loading: false,
    }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
