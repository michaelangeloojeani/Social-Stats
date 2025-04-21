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
