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

 Logout
 </button>
</div>
</div>
</div>
</nav>

{/* Main Content */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

{/* Connected Accounts Section */}
<div className="bg-white shadow-md rounded-lg p-6 mb-6">
<h2 className="text-xl font-semibold mb-4">Connected Accounts</h2>
{isLoading ? (
<div className="text-center py-4">Loading accounts...</div>
) : (
<div className="flex flex-wrap gap-4">
 {/* Instagram Account Box */}
 <div className="border rounded-lg p-4 flex items-center w-64">
   <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4">
     {/* Instagram Icon */}
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
       <circle cx="12" cy="12" r="3"></circle>
       <circle cx="17.5" cy="6.5" r="1.5"></circle>
     </svg>
   </div>
   <div className="flex-grow">
     <h3 className="font-medium">Instagram</h3>
     {instagramConnected ? (
       <div>
         <p className="text-sm text-green-600">Connected</p>
         {instagramUsername && <p className="text-xs text-gray-500">@{instagramUsername}</p>}
       </div>
     ) : (
       <button 
         onClick={handleConnectInstagram}
         className="text-sm text-blue-500 hover:text-blue-700"
       >
         Connect Account
       </button>
     )}
   </div>
 </div>

   {/* YouTube Account Box */}
   <div className="border rounded-lg p-4 flex items-center w-64">
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center mr-4">
                  {/* YouTube Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">YouTube</h3>
                  <p className="text-sm text-gray-500">API Ready</p>
                </div>
              </div>
            </div>
          )}
        </div>


     {/* Stats Lookup Section */}
     <div className="bg-white shadow-md rounded-lg p-6">
          {/* Platform Buttons */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Select Platform</h2>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded ${platform === 'instagram' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setPlatform('instagram')}
              >
                Instagram
              </button>
              <button
                className={`px-4 py-2 rounded ${platform === 'youtube' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setPlatform('youtube')}
              >
                YouTube
              </button>
            </div>
          </div>

                {/* Username Input */}
                <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Enter Username</h2>
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                className="flex-grow p-2 border rounded-l"
                placeholder={platform === 'instagram' ? '@username' : 'YouTube channel username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                type="submit"
                className={`px-4 py-2 rounded-r ${platform === 'instagram' ? 'bg-blue-500' : 'bg-red-500'} text-white`}
              >
                Get Stats
              </button>
            </form>
          </div>
