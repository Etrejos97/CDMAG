import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';  // ✅ CORRECTO
;

export const ProtectedRoute = ({ children, requiredRoles }) => {
  const { isAuthenticated, hasAccess, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#667eea',
      }}>
        ⏳ Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasAccess(requiredRoles)) {
    return <Navigate to="/productos" replace />;
  }

  return children;
};
