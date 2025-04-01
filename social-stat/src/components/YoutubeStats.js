// src/components/YouTubeStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function YouTubeStats({ username }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchYouTubeStats = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your backend API that interfaces with YouTube API
      // For demo purposes, we'll simulate an API call with mock data
      
      // This is where you would make an actual API call:
      // const response = await axios.get(`/api/youtube/${username}`);
      // setStats(response.data);
      
      // Mock API response for demonstration
      setTimeout(() => {
        const mockData = {
          channelName: username,
          subscribers: Math.floor(Math.random() * 1000000),
          videos: Math.floor(Math.random() * 500),
          views: Math.floor(Math.random() * 10000000)
        };
        
        setStats(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setError('Failed to fetch YouTube stats');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (username) {
      fetchYouTubeStats();
    }
  }, [username]);
  
  if (!username) {
    return <div className="text-gray-500">Enter a YouTube channel name to view stats</div>;
  }
  
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }
  
  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }
  
  if (!stats) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">{stats.channelName}</h3>
        <p className="text-sm">YouTube Stats</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.subscribers.toLocaleString()}</p>
          <p className="text-sm">Subscribers</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.videos.toLocaleString()}</p>
          <p className="text-sm">Videos</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.views.toLocaleString()}</p>
          <p className="text-sm">Total Views</p>
        </div>
      </div>
    </div>
  );
}

export default YouTubeStats;