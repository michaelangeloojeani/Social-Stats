// src/components/RecentSearches.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [channelInfo, setChannelInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get recent searches from localStorage
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(searches);
    
    // Fetch channel info for each search
    const fetchChannelInfo = async () => {
      setLoading(true);
      const info = {};
      
      for (const search of searches) {
        try {
          const response = await axios.get(`/api/youtube/info/${search.query}`);
          info[search.query] = response.data;
        } catch (error) {
          console.error(`Failed to fetch info for ${search.query}:`, error);
        }
      }
      
      setChannelInfo(info);
      setLoading(false);
    };
    
    if (searches.length > 0) {
      fetchChannelInfo();
    } else {
      setLoading(false);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
    setChannelInfo({});
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-6">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Searches</h2>
            {recentSearches.length > 0 && (
              <button 
                onClick={clearHistory}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Clear History
              </button>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-500"></div>
              <p className="mt-2 text-gray-600">Loading recent searches...</p>
            </div>
          ) : recentSearches.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No recent searches found.</p>
              <Link to="/search" className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Search Channels
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {recentSearches.map((search, index) => (
                <Link 
                  key={index} 
                  to={`/search?q=${encodeURIComponent(search.query)}`}
                  className="block p-4 border rounded hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    {channelInfo[search.query] && (
                      <img 
                        src={channelInfo[search.query].thumbnailUrl} 
                        alt={`${search.query} thumbnail`}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                    )}
                    <div>
                      <p className="font-medium">{search.query}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(search.timestamp).toLocaleDateString()} at {new Date(search.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default RecentSearches;