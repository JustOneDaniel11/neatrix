import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSupabaseData } from '@/contexts/SupabaseDataContext';
import { FullScreenCleaningLoader } from '@/components/ui/CleaningLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useSupabaseData();
  const location = useLocation();

  // Show loading while initializing authentication
  if (state.isInitializing) {
    return <FullScreenCleaningLoader text="Initializing your account..." />;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!state.isEmailVerified) {
    return <Navigate to="/email-verification" state={{ email: state.authUser?.email }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;