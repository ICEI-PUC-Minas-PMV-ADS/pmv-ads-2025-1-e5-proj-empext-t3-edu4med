import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Editais from '../pages/Editais';
import EditalDetails from '../pages/EditalDetails';
import Profile from '../pages/Profile';
import MeusEditais from '../pages/MeusEditais';
import AdminDashboard from '../pages/AdminDashboard';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiresAdmin?: boolean;
}

function PrivateRoute({ children, requiresAdmin = false }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresAdmin && user.role !== 'Admin') {
    return <Navigate to="/editais" replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/editais"
        element={
          <PrivateRoute>
            <Editais />
          </PrivateRoute>
        }
      />
      <Route
        path="/editais/:id"
        element={
          <PrivateRoute>
            <EditalDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/meus-editais"
        element={
          <PrivateRoute>
            <MeusEditais />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute requiresAdmin>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}