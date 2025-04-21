import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display Instagram statistics for a given username
function InstagramStats({ username, isConnected, onConnect }) {
  const [stats, setStats] = useState(null); // Holds the fetched stats
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message if any

  const fetchInstagramStats = async () => {
    if (!username) return; // Don't fetch if username is empty

    setLoading(true); // Show loading spinner
    setError(null); // Reset previous error

    try {
      // Remove @ from username if present
      const formattedUsername = username.replace('@', '');

      // Send GET request to backend API
      const response = await axios.get(`/api/instagram/stats/${formattedUsername}`);

        // Store the response in state
        setStats(response.data);
    } catch (error) {
      // Handle not connected/authentication error
      if (error.response?.status === 401) {
        setError('Please connect your Instagram account first');
      } else {
        // Handle general errors
        setError('Failed to fetch Instagram stats: ' + (error.response?.data?.error || error.message));
      }
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

 // Fetch stats when username or connection status changes
 useEffect(() => {
    if (username && isConnected) {
      fetchInstagramStats();
    }
  }, [username, isConnected]);

  // If username is not entered
  if (!username) {
    return <div className="text-gray-500">Enter an Instagram username to view stats</div>;
  }

   // If user is not connected to Instagram
   if (!isConnected) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
        <p className="text-gray-700 mb-4">Connect your Instagram account to view stats</p>
        <button 
          onClick={onConnect}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:from-purple-600 hover:to-pink-600"
        >
          Connect Instagram
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    );
  }

  // While data is loading
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-2 text-gray-600">Loading Instagram stats...</p>
      </div>
    );
  }

  // If an error occurred
  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  // No stats to show
  if (!stats) {
    return null;
  }