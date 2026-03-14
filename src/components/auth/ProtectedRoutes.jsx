// src/components/auth/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';


export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();

  // Wait for Supabase to check the local session on refresh
  if (loading) return <div className="p-20 font-mono text-xs">// initializing_security_handshake...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}