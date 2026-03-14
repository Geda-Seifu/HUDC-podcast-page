import React, { useEffect } from "react";
import Navbar from "./components/layout/NavBar";
import Hero from "./features/public/Hero";
import GuestForm from "./features/public/GuestForm";
import ProjectForm from "./features/public/ProjectForm";
import ProjectGallery from "./features/public/ProjectGallerg";
import Footer from "./features/public/Footer";
import PublicLandingPage from "./features/public/PublicLandingPage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminLayout from "./components/layout/AdminLayou";
import AdminDashboard from "./features/admin/AdminDashBoard";
import GuestManager from "./features/admin/GuestManager";
import ProjectManager from "./features/admin/ProjectManager";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./features/public/LoginPage";
import { useAuthStore } from "./hooks/useAuthStore";
import { supabase } from "./lib/supabaseClient";
import ProtectedRoute from "./components/auth/ProtectedRoutes";
// import { Reveal } from './components/animation/Reveal.jsx'

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

          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="guests"
              element={
                <ProtectedRoute>
                  <GuestManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects"
              element={
                <ProtectedRoute>
                  <ProjectManager />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
