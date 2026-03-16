import React, { useEffect } from "react";
import PublicLandingPage from "./pages/PublicLandingPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLayout from "./features/admin/components/AdminLayout";
import AdminDashboard from "./features/admin/AdminDashBoard";
import GuestManager from "./features/guests/GuestManager";
import ProjectManager from "./features/projects/ProjectManager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./hooks/useAuthStore";
import { supabase } from "./lib/supabaseClient";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
import NotFound from "./pages/NotFoundPage";
import ConfigPanel from "./features/admin/components/ConfigPanel";

const queryClient = new QueryClient();

export const App = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    // 1. Check for an existing session (JWT in LocalStorage)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session);
    });

    // 2. Listen for changes (Login, Logout, Token Refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session);
    });

    return () => subscription.unsubscribe();
  }, [setAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLandingPage />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="guests" element={<GuestManager />} />
            <Route path="projects" element={<ProjectManager />} />
            <Route path="config" element={<ConfigPanel/>} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
