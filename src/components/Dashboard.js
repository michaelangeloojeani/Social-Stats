import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import YouTubeStats from './YoutubeStats';

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [searchUsername, setSearchUsername] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setSearchUsername(username);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Social Stats </h1>
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
        {/* Stats Lookup Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">YouTube Channel Stats</h2>
            <p className="text-gray-600 mb-4">
              Enter a YouTube channel name or ID to view their statistics.
            </p>
            
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                className="flex-grow p-2 border rounded-l"
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
          
          <YouTubeStats username={searchUsername} />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;