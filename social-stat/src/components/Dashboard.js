// src/components/Dashboard.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import InstagramStats from './InstagramStats';
import YouTubeStats from './YouTubeStats';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [platform, setPlatform] = useState('instagram');
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchUsername(username);
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Social Media Tracker</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4">{currentUser?.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white shadow-md rounded-lg p-6">
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
          
          {platform === 'instagram' ? (
            <InstagramStats username={searchUsername} />
          ) : (
            <YouTubeStats username={searchUsername} />
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;