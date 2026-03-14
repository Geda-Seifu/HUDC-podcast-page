// store/useAuthStore.js
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  setAuth: (session) => set({ 
    session: session, 
    user: session?.user ?? null 
  }),
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  }
}));