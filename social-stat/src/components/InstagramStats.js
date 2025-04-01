// src/components/InstagramStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstagramStats({ username }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchInstagramStats = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your backend API that interfaces with Instagram API
      // For demo purposes, we'll simulate an API call with mock data
      
      // This is where you would make an actual API call:
      // const response = await axios.get(`/api/instagram/${username}`);
      // setStats(response.data);
      
      // Mock API response for demonstration
      setTimeout(() => {
        const mockData = {
          username: username.replace('@', ''),
          followers: Math.floor(Math.random() * 100000),
          following: Math.floor(Math.random() * 5000),
          posts: Math.floor(Math.random() * 1000)
        };
        
        setStats(mockData);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      setError('Failed to fetch Instagram stats');
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (username) {
      fetchInstagramStats();
    }
  }, [username]);
  
  if (!username) {
    return <div className="text-gray-500">Enter an Instagram username to view stats</div>;
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
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">@{stats.username}</h3>
        <p className="text-sm">Instagram Stats</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.followers.toLocaleString()}</p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.following.toLocaleString()}</p>
          <p className="text-sm">Following</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">{stats.posts.toLocaleString()}</p>
          <p className="text-sm">Posts</p>
        </div>
      </div>
    </div>
  );
}

export default InstagramStats;