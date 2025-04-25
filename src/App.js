import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard';

// Protected route component that redirects to login if not authenticated
// Define as a separate component to use hooks
const ProtectedRouteContent = ({ children }) => {
  // Use the hook here inside the component
  const { currentUser, loading } = useAuth();
  
  // Show loading indicator while checking authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRouteContent>
                  <Dashboard />
                </ProtectedRouteContent>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRouteContent>
                  <Dashboard />
                </ProtectedRouteContent>
              }
            />
            
            {/* Redirect any other route to dashboard */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;