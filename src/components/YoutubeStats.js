// src/components/YoutubeStats.js
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
  
  if (loading) {
    return (
      <div className="w3-panel w3-white w3-card w3-round-large">
        <div className="w3-center w3-padding-64">
          <div className="w3-padding-32">
            <div className="w3-border w3-round w3-red" style={{width: '5px', height: '50px', margin: 'auto', animation: 'w3-spin 1s linear infinite'}}></div>
          </div>
          <p className="w3-text-grey">Loading YouTube stats...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="w3-panel w3-pale-red w3-card w3-round-large">
        <div className="w3-padding-24">
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!stats) {
    return null;
  }
  
  return (
    <div className="w3-panel w3-white w3-card w3-round-large">
      <div className="w3-container w3-padding-32">
        <div className="w3-row">
          <div className="w3-col m3 l2 w3-center">
            {stats.thumbnailUrl && (
              <img 
                src={stats.thumbnailUrl} 
                alt={`${stats.channelName} thumbnail`} 
                className="w3-circle w3-image"
                style={{width: '100%', maxWidth: '150px'}}
              />
            )}
          </div>
          <div className="w3-col m9 l10 w3-container">
            <h2 className="w3-xlarge">{stats.channelName}</h2>
            <p className="w3-text-grey">YouTube Channel</p>
          </div>
        </div>
        
        <div className="w3-row-padding w3-center w3-margin-top">
          <div className="w3-quarter w3-margin-bottom">
            <div className="w3-container w3-red w3-padding-16 w3-round">
              <div className="w3-xxlarge">{stats.subscribers.toLocaleString()}</div>
              <div className="w3-small">Subscribers</div>
            </div>
          </div>
          
          <div className="w3-quarter w3-margin-bottom">
            <div className="w3-container w3-dark-grey w3-padding-16 w3-round">
              <div className="w3-xxlarge">{stats.videos.toLocaleString()}</div>
              <div className="w3-small">Videos</div>
            </div>
          </div>
          
          <div className="w3-quarter w3-margin-bottom">
            <div className="w3-container w3-red w3-padding-16 w3-round">
              <div className="w3-xxlarge">{stats.views.toLocaleString()}</div>
              <div className="w3-small">Total Views</div>
            </div>
          </div>
          
          <div className="w3-quarter w3-margin-bottom">
            <div className="w3-container w3-dark-grey w3-padding-16 w3-round">
              <div className="w3-xxlarge">{stats.videoCount.toLocaleString()}</div>
              <div className="w3-small">Public Videos</div>
            </div>
          </div>
        </div>
        
        {stats.description && (
          <div className="w3-panel w3-light-grey w3-round w3-padding">
            <h3 className="w3-medium">Channel Description:</h3>
            <p className="w3-small" style={{whiteSpace: 'pre-line'}}>{stats.description}</p>
          </div>
        )}
        
        <div className="w3-center w3-padding-16">
  <a 
    href={stats.channelId 
      ? `https://www.youtube.com/channel/${stats.channelId}` 
      : `https://www.youtube.com/results?search_query=${encodeURIComponent(stats.channelName || username)}`} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w3-button w3-red w3-round"
  >
    {stats.channelId ? 'Visit Channel' : 'Search on YouTube'}
  </a>
</div>
      </div>
    </div>
  );
}

export default YouTubeStats;