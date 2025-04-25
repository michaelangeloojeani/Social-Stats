// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">YouTube Stats</Link>
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/search" className="px-3 py-2 rounded-md hover:bg-red-700">
                Search Channels
              </Link>
              <Link to="/recent" className="px-3 py-2 rounded-md hover:bg-red-700">
                Recent Searches
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-4">{currentUser?.email}</span>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;