// src/components/SearchChannels.js
import React, { useState } from 'react';
import YouTubeStats from './YoutubeStats';

function SearchChannels() {
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchUsername(username);
      
      // Save to recent searches in localStorage
      const recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
      // Avoid duplicates
      if (!recentSearches.some(search => search.query === username)) {
        recentSearches.unshift({ 
          query: username, 
          timestamp: new Date().toISOString() 
        });
        // Keep only the 10 most recent searches
        if (recentSearches.length > 10) {
          recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 pt-6">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Search YouTube Channels</h2>
            <p className="text-gray-600 mb-4">
              Enter a YouTube channel name or ID to view their statistics.
            </p>
            
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="YouTube channel name or ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r bg-red-500 text-white hover:bg-red-600"
              >
                Get Stats
              </button>
            </form>
          </div>
          
          {searchUsername && <YouTubeStats username={searchUsername} />}
        </div>
      </main>
    </div>
  );
}

export default SearchChannels;