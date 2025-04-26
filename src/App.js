import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home';
import SearchChannels from './components/SearchChannels';
import RecentSearches from './components/RecentSearches';
import Layout from './components/Layout';

// Protected route component that redirects to login if not authenticated
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="w3-display-middle">
        <div className="w3-center">
          <div className="w3-xlarge w3-margin-bottom">Loading...</div>
          <div className="w3-border w3-round-xlarge" style={{width: '200px', height: '6px'}}>
            <div className="w3-red" style={{width: '100%', height: '100%', animation: 'w3-spin 2s linear infinite'}}></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      {children}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/search" 
            element={
              <ProtectedRoute>
                <SearchChannels />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recent" 
            element={
              <ProtectedRoute>
                <RecentSearches />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirect any other route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;