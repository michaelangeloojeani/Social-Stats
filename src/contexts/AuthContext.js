import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios
axios.defaults.baseURL = 'http://localhost:5000'; // Your backend URL
axios.defaults.withCredentials = true; // Important for cookies/sessions

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Register function
  const register = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { email, password });
      const { user } = response.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  
// Login function
const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { user } = response.data;
      
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

    // Logout function
    const logout = async () => {
        try {
          await axios.post('/api/auth/logout');
          localStorage.removeItem('user');
          setCurrentUser(null);
        } catch (error) {
          console.error('Logout error:', error);
          // Still remove from local storage even if server logout fails
          localStorage.removeItem('user');
          setCurrentUser(null);
        }
      };

       // Connect Instagram (start OAuth flow)
  const connectInstagram = async () => {
    try {
      const response = await axios.get('/api/instagram/auth');
      window.location.href = response.data.authUrl;
    } catch (error) {
      throw new Error('Failed to start Instagram authentication');
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    connectInstagram
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
