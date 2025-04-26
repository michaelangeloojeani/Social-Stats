// src/components/SearchChannels.js
import React, { useState, useEffect } from 'react'; // Add useEffect
import { useLocation } from 'react-router-dom'; // Add this import
import YouTubeStats from './YoutubeStats';

function SearchChannels() {
  const location = useLocation(); // Add this hook
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  
  // Add this useEffect to handle navigation state
  useEffect(() => {
    if (location.state && location.state.initialSearch) {
      const query = location.state.initialSearch;
      setUsername(query);
      setSearchUsername(query); // This will trigger the search
    }
  }, [location]);
  
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
    <div className="w3-container w3-padding-32">
      <h1 className="w3-xxxlarge youtube-text-red"><b>Search Channels.</b></h1>
      <hr style={{width:'50px', border:'5px solid #FF0000'}} className="w3-round" />
      
      <div className="w3-panel w3-card w3-white w3-padding-16 w3-round-large">
        <h3>Find any YouTube channel</h3>
        <p>Enter a channel name or ID to view detailed statistics</p>
        
        <form onSubmit={handleSearch}>
          <div className="w3-row-padding w3-stretch">
            <div className="w3-col m9 l10">
              <input
                type="text"
                className="w3-input w3-border w3-round"
                placeholder="e.g. MrBeast, PewDiePie, or YouTube channel ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{height: '50px'}}
              />
            </div>
            <div className="w3-col m3 l2">
              <button
                type="submit"
                className="w3-button w3-red w3-block w3-round"
                style={{height: '50px'}}
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {searchUsername && (
        <div className="w3-margin-top">
          <YouTubeStats username={searchUsername} />
        </div>
      )}
      
      {!searchUsername && (
        <div className="w3-container w3-center w3-padding-64">
          <div className="w3-opacity" style={{fontSize: '100px'}}>🔍</div>
          <p className="w3-xlarge w3-text-grey">Search for a YouTube channel to see statistics</p>
        </div>
      )}
    </div>
  );
}

export default SearchChannels;