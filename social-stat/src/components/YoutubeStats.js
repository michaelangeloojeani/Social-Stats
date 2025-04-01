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
      const response = await axios.get(`/api/youtube/stats/${username}`);
      setStats(response.data);
    } catch (error) {
      setError('Failed to fetch YouTube stats: ' + (error.response?.data?.error || error.message));
    } finally {
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
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-2 text-gray-600">Loading YouTube stats...</p>
      </div>
    );
  }
  
  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }
  
  if (!stats) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-6 text-white">
      <div className="flex items-center justify-center mb-4">
        {stats.thumbnailUrl && (
          <img 
            src={stats.thumbnailUrl} 
            alt={`${stats.channelName} thumbnail`} 
            className="w-16 h-16 rounded-full mr-4 border-2 border-white"
          />
        )}
        <div className="text-center">
          <h3 className="text-2xl font-bold">{stats.channelName}</h3>
          <p className="text-sm">YouTube Channel</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center mb-4">
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.subscribers.toLocaleString()}</p>
          <p className="text-sm">Subscribers</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.videos.toLocaleString()}</p>
          <p className="text-sm">Videos</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.views.toLocaleString()}</p>
          <p className="text-sm">Total Views</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.videoCount.toLocaleString()}</p>
          <p className="text-sm">Public Videos</p>
        </div>
      </div>
      
      {stats.description && (
        <div className="mt-4 p-3 bg-white bg-opacity-10 rounded text-sm">
          <h4 className="font-medium mb-1">Channel Description:</h4>
          <p className="line-clamp-3">{stats.description}</p>
        </div>
      )}
      
      <div className="mt-4 text-center text-xs text-white text-opacity-80">
        <p>Stats retrieved via YouTube Data API</p>
      </div>
    </div>
  );
}

export default YouTubeStats;