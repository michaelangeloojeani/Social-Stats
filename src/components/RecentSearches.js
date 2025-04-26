// src/components/RecentSearches.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RecentSearches() {
  const [recentSearches, setRecentSearches] = useState([]);
  const [channelInfo, setChannelInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSearchAgain = (query) => {
    navigate(`/search`, { state: { initialSearch: query } });
  };

  return (
    <div className="w3-container w3-padding-32">
      <div className="w3-display-container">
        <h1 className="w3-xxxlarge youtube-text-red"><b>Recent Searches.</b></h1>
        {recentSearches.length > 0 && (
          <button 
            onClick={clearHistory}
            className="w3-button w3-red w3-round w3-right"
            style={{marginTop: '10px'}}
          >
            Clear History
          </button>
        )}
      </div>
      <hr style={{width:'50px', border:'5px solid #FF0000'}} className="w3-round" />
      
      {loading ? (
        <div className="w3-center w3-padding-64">
          <div className="w3-padding-32">
            <div className="w3-border w3-round w3-red" style={{width: '5px', height: '50px', margin: 'auto', animation: 'w3-spin 1s linear infinite'}}></div>
          </div>
          <p className="w3-text-grey">Loading recent searches...</p>
        </div>
      ) : recentSearches.length === 0 ? (
        <div className="w3-panel w3-white w3-center w3-card w3-round-large w3-padding-64">
          <div className="w3-padding-32">
            <div className="w3-opacity" style={{fontSize: '100px'}}>⏱️</div>
            <h3 className="w3-text-grey">No recent searches</h3>
            <p className="w3-text-grey">Your search history will appear here</p>
            <p>
              <Link to="/search" className="w3-button w3-red w3-round w3-margin-top">
                Search Channels
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="w3-row-padding">
          {recentSearches.map((search, index) => (
            <div className="w3-col m6 l4" key={index}>
              <div className="w3-card w3-white w3-round-large w3-margin-bottom w3-hover-shadow">
                <div className="w3-container w3-padding-16">
                  <div className="w3-row">
                    <div className="w3-col s3">
                      {channelInfo[search.query] ? (
                        <img 
                          src={channelInfo[search.query].thumbnailUrl} 
                          alt={`${search.query} thumbnail`}
                          className="w3-circle w3-image"
                          style={{width: '100%'}}
                        />
                      ) : (
                        <div className="w3-circle w3-grey w3-center" style={{width: '100%', paddingTop: '100%', position: 'relative'}}>
                          <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                            <i className="w3-xlarge">?</i>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w3-col s9 w3-padding-left">
                      <h3 className="w3-margin-top-0">{channelInfo[search.query]?.title || search.query}</h3>
                      <p className="w3-text-grey w3-small">
                        Searched on {new Date(search.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="w3-center w3-padding-top">
                    <button
                      onClick={() => handleSearchAgain(search.query)}
                      className="w3-button w3-round w3-red"
                    >
                      View Stats
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentSearches;