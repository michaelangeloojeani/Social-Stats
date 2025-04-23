import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display YouTube channel statistics
function YouTubeStats({ username }) {
  const [stats, setStats] = useState(null); // Holds the fetched stats
  const [loading, setLoading] = useState(false); // Indicates if data is loading
  const [error, setError] = useState(null); // Stores any error message

  // Function to fetch YouTube stats from backend
  const fetchYouTubeStats = async () => {
    if (!username) return; // Do nothing if username is not provided

    setLoading(true); // Show loading indicator
    setError(null); // Reset any previous error

    try {
      // Send GET request to fetch stats
      const response = await axios.get(`/api/youtube/stats/${username}`);
      setStats(response.data); // Save the response data to state
    } catch (error) {
      // Handle error if fetch fails
      setError('Failed to fetch YouTube stats: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };