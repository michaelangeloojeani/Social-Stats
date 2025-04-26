// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="w3-container w3-padding-32">
      <h1 className="w3-jumbo"><b>YouTube Stats</b></h1>
      <h1 className="w3-xxxlarge youtube-text-red"><b>Welcome.</b></h1>
      <hr style={{width:'50px', border:'5px solid #FF0000'}} className="w3-round" />
      
      <p className="w3-xlarge">Track statistics for any YouTube channel instantly.</p>
      
      <div className="w3-row-padding w3-margin-top">
        <div className="w3-half w3-margin-bottom">
          <div className="w3-card w3-white w3-round-large w3-hover-shadow">
            <div className="w3-container w3-center w3-red w3-padding-32 w3-round-large w3-round-bottom">
              <i className="w3-jumbo">🔍</i>
              <h3>Search Channels</h3>
            </div>
            <div className="w3-container w3-padding-16">
              <p>Search for any YouTube channel by name or ID to get detailed statistics.</p>
              <p>View subscriber counts, video metrics, and more.</p>
              <div className="w3-center w3-padding-16">
                <Link to="/search" className="w3-button w3-red w3-round w3-padding-large">
                  Search Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="w3-half w3-margin-bottom">
          <div className="w3-card w3-white w3-round-large w3-hover-shadow">
            <div className="w3-container w3-center w3-dark-grey w3-padding-32 w3-round-large w3-round-bottom">
              <i className="w3-jumbo">⏱️</i>
              <h3>Recent Searches</h3>
            </div>
            <div className="w3-container w3-padding-16">
              <p>View your recent search history and quickly access channel statistics.</p>
              <p>Keep track of channels you've analyzed without having to search again.</p>
              <div className="w3-center w3-padding-16">
                <Link to="/recent" className="w3-button w3-dark-grey w3-round w3-padding-large">
                  View History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Feature Highlights */}
      <div className="w3-container" style={{marginTop:'80px'}}>
        <h1 className="w3-xxxlarge youtube-text-red"><b>Features.</b></h1>
        <hr style={{width:'50px', border:'5px solid #FF0000'}} className="w3-round" />
        
        <div className="w3-row-padding w3-margin-top">
          <div className="w3-third w3-margin-bottom">
            <div className="w3-card w3-center w3-padding w3-white w3-round-large">
              <i className="w3-xxlarge w3-margin-top">📊</i>
              <div className="w3-container w3-padding">
                <h3>Detailed Analytics</h3>
                <p>View comprehensive statistics for any YouTube channel including subscribers, video counts, and total views.</p>
              </div>
            </div>
          </div>
          
          <div className="w3-third w3-margin-bottom">
            <div className="w3-card w3-center w3-padding w3-white w3-round-large">
              <i className="w3-xxlarge w3-margin-top">🔄</i>
              <div className="w3-container w3-padding">
                <h3>Search History</h3>
                <p>Keep track of channels you've searched for and easily access them again.</p>
              </div>
            </div>
          </div>
          
          <div className="w3-third w3-margin-bottom">
            <div className="w3-card w3-center w3-padding w3-white w3-round-large">
              <i className="w3-xxlarge w3-margin-top">📱</i>
              <div className="w3-container w3-padding">
                <h3>Responsive Design</h3>
                <p>Enjoy a seamless experience on desktop, tablet, or mobile devices.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;