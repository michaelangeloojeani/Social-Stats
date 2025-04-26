// src/components/Auth/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import YouTubeIcon from '../../assets/youtube-icon.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check if we were redirected with an error message
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorMsg = urlParams.get('error');
    if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
      // Clean URL
      window.history.replaceState({}, document.title, '/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w3-display-container" style={{minHeight: '100vh', backgroundColor: '#f9f9f9'}}>
      <div className="w3-display-middle w3-card-4 w3-round-large w3-white" style={{width: '400px', maxWidth: '95%'}}>
        <div className="w3-container w3-center w3-padding-32">
          <img src={YouTubeIcon} alt="YouTube Stats" style={{width:'80px'}} />
          <h2 className="w3-xxlarge">Social Stats</h2>
          <p className="w3-text-grey">Sign in to continue</p>
        </div>
        
        {error && (
          <div className="w3-panel w3-pale-red w3-leftbar w3-border-red w3-container">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="w3-container w3-padding-16">
          <div className="w3-margin-bottom">
            <label className="w3-text-grey">Email</label>
            <input
              type="email"
              className="w3-input w3-border w3-round"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <div className="w3-margin-bottom">
            <label className="w3-text-grey">Password</label>
            <input
              type="password"
              className="w3-input w3-border w3-round"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="w3-button w3-block w3-red w3-round w3-margin-top w3-margin-bottom"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="w3-container w3-border-top w3-padding-16 w3-light-grey w3-round-large">
          <span className="w3-left">Don't have an account?</span>
          <Link to="/register" className="w3-right w3-button w3-round">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;