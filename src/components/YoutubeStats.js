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
   // Call fetch function when username changes
   useEffect(() => {
    if (username) {
      fetchYouTubeStats();
    }
  }, [username]);

  // Show placeholder text if no username is entered
  if (!username) {
    return <div className="text-gray-500">Enter a YouTube channel name to view stats</div>;
  }

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-2 text-gray-600">Loading YouTube stats...</p>
      </div>
    );
  }