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
      localStorage.removeItem('recentSearches'); // Clear recent searches on logout
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still remove from local storage even if server logout fails
      localStorage.removeItem('user');
      localStorage.removeItem('recentSearches');
      setCurrentUser(null);
    }
  };

  // Save a recent search
  const saveRecentSearch = (query, channelInfo = null) => {
    if (!query.trim()) return;
    
    const userId = currentUser?.id || 'anonymous';
    const storageKey = `recentSearches_${userId}`;
    
    const recentSearches = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Check if this search already exists
    const existingIndex = recentSearches.findIndex(s => s.query === query);
    
    if (existingIndex !== -1) {
      // Remove the existing entry to move it to the top
      recentSearches.splice(existingIndex, 1);
    }
    
    // Add the search to the beginning of the array
    recentSearches.unshift({
      query,
      timestamp: new Date().toISOString(),
      channelInfo: channelInfo // Store channel info if provided
    });
    
    // Keep only the 20 most recent searches
    if (recentSearches.length > 20) {
      recentSearches.pop();
    }
    
    localStorage.setItem(storageKey, JSON.stringify(recentSearches));
    
    return recentSearches;
  };

  // Get recent searches
  const getRecentSearches = () => {
    const userId = currentUser?.id || 'anonymous';
    const storageKey = `recentSearches_${userId}`;
    return JSON.parse(localStorage.getItem(storageKey) || '[]');
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    const userId = currentUser?.id || 'anonymous';
    const storageKey = `recentSearches_${userId}`;
    localStorage.removeItem(storageKey);
  };

  // Update channel info for a recent search
  const updateRecentSearchInfo = (query, channelInfo) => {
    if (!query || !channelInfo) return;
    
    const userId = currentUser?.id || 'anonymous';
    const storageKey = `recentSearches_${userId}`;
    
    const recentSearches = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const updatedSearches = recentSearches.map(search => {
      if (search.query === query) {
        return { ...search, channelInfo };
      }
      return search;
    });
    
    localStorage.setItem(storageKey, JSON.stringify(updatedSearches));
    
    return updatedSearches;
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    saveRecentSearch,
    getRecentSearches,
    clearRecentSearches,
    updateRecentSearchInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}