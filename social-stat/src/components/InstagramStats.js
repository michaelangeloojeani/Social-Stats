// src/components/InstagramStats.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InstagramStats({ username, isConnected, onConnect }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchInstagramStats = async () => {
    if (!username) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const formattedUsername = username.replace('@', '');
      const response = await axios.get(`/api/instagram/stats/${formattedUsername}`);
      setStats(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        // Not authenticated with Instagram
        setError('Please connect your Instagram account first');
      } else {
        setError('Failed to fetch Instagram stats: ' + (error.response?.data?.error || error.message));
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (username && isConnected) {
      fetchInstagramStats();
    }
  }, [username, isConnected]);
  
  if (!username) {
    return <div className="text-gray-500">Enter an Instagram username to view stats</div>;
  }
  
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
  
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        <p className="mt-2 text-gray-600">Loading Instagram stats...</p>
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
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">@{stats.username}</h3>
        <p className="text-sm">Instagram Stats</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">
            {typeof stats.followers === 'number' 
              ? stats.followers.toLocaleString() 
              : stats.followers}
          </p>
          <p className="text-sm">Followers</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">
            {typeof stats.following === 'number' 
              ? stats.following.toLocaleString() 
              : stats.following}
          </p>
          <p className="text-sm">Following</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded">
          <p className="text-3xl font-bold">
            {typeof stats.posts === 'number' 
              ? stats.posts.toLocaleString() 
              : stats.posts}
          </p>
          <p className="text-sm">Posts</p>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-white text-opacity-80">
        <p>Stats retrieved via Instagram Graph API</p>
        <p>Some data may be limited based on API access level</p>
      </div>
    </div>
  );
}

export default InstagramStats;