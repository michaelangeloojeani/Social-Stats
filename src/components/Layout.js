// src/components/Layout.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import YouTubeIcon from '../assets/youtube-icon.png'; // Add a YouTube icon to your assets folder

function Layout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? "w3-red" : "";
  };

  return (
    <>
      {/* Sidebar/menu */}
      <nav className="w3-sidebar youtube-dark w3-collapse w3-top w3-large w3-padding sidebar-width" style={{zIndex:3, fontWeight:'bold'}} id="mySidebar">
        <a href="javascript:void(0)" onClick={() => window.w3_close()} className="w3-button w3-hide-large w3-display-topleft" style={{width:'100%',fontSize:'22px'}}>Close Menu</a>
        <div className="w3-container w3-center">
          <img src={YouTubeIcon} alt="YouTube Stats" style={{width:'100px', marginTop:'25px', marginBottom:'10px'}} />
          <h3 className="w3-padding-32 w3-text-white"><b>Social Stats</b></h3>
        </div>
        <div className="w3-bar-block">
          <Link to="/" onClick={() => window.innerWidth < 993 && window.w3_close()} className={`w3-bar-item w3-button w3-hover-red ${isActive("/")}`}>Home</Link> 
          <Link to="/search" onClick={() => window.innerWidth < 993 && window.w3_close()} className={`w3-bar-item w3-button w3-hover-red ${isActive("/search")}`}>Search Channels</Link> 
          <Link to="/recent" onClick={() => window.innerWidth < 993 && window.w3_close()} className={`w3-bar-item w3-button w3-hover-red ${isActive("/recent")}`}>Recent Searches</Link> 
          <button onClick={handleLogout} className="w3-bar-item w3-button w3-hover-red">Logout</button>
        </div>
        {currentUser && (
          <div className="w3-container w3-padding-32 w3-bottom">
            <p className="w3-text-white">Logged in as:<br/><small>{currentUser.email}</small></p>
          </div>
        )}
      </nav>

      {/* Top menu on small screens */}
      <header className="w3-container w3-top w3-hide-large youtube-red w3-xlarge w3-padding">
        <a href="javascript:void(0)" className="w3-button youtube-red w3-margin-right" onClick={() => window.w3_open()}>☰</a>
        <span>Social Stats</span>
      </header>

      {/* Overlay effect when opening sidebar on small screens */}
      <div className="w3-overlay w3-hide-large" onClick={() => window.w3_close()} style={{cursor:'pointer'}} title="close side menu" id="myOverlay"></div>

      {/* !PAGE CONTENT! */}
      <div className="w3-main youtube-light" style={{marginLeft:'280px', minHeight:'100vh'}}>
        <div style={{marginTop:'83px'}}></div>
        {children}
        
        {/* W3.CSS Footer */}
        <div className="w3-container w3-padding-32" style={{marginTop:'75px'}}>
          <p className="w3-right">YouTube Stats Tracker ©2025</p>
        </div>
      </div>
    </>
  );
}

export default Layout;