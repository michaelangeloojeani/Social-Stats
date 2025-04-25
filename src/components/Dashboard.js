import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import InstagramStats from './InstagramStats';
import YouTubeStats from './YouTubeStats';

function Dashboard() {
  const { currentUser, logout } = useAuth(); // Get current user and logout method from auth context

  // States for platform selection and username input
  const [platform, setPlatform] = useState('instagram');
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');

  // Instagram connection status
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [instagramUsername, setInstagramUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

    // Fetch Instagram connection status on component mount
    useEffect(() => {
        const checkInstagramStatus = async () => {
          try {
            const response = await axios.get('/api/instagram/status');
            setInstagramConnected(response.data.connected);
            setInstagramUsername(response.data.username);
          } catch (error) {
            console.error('Error checking Instagram status:', error);
          } finally {
            setIsLoading(false);
          }
        };
    
        checkInstagramStatus();
      }, []);
    
       // Handle redirect after Instagram OAuth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // If Instagram connection was successful
    if (urlParams.get('instagram_connected') === 'true') {
      setInstagramConnected(true);
      window.history.replaceState({}, document.title, '/dashboard'); // Clean up URL

       // Refresh username info
       axios.get('/api/instagram/status')
       .then(response => {
         setInstagramUsername(response.data.username);
       })
       .catch(error => console.error('Error refreshing Instagram status:', error));
   }

   // If Instagram auth failed
   if (urlParams.get('error') === 'instagram_auth_failed') {
     alert('Failed to connect Instagram account. Please try again.');
     window.history.replaceState({}, document.title, '/dashboard');
   }
 }, []);
