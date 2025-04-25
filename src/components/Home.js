// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 pt-10">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome to YouTube Stats Tracker, {currentUser?.email}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Track YouTube channel statistics and view your recent searches.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link 
            to="/search" 
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-red-600 p-6 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">Search Channels</h2>
              <p className="mt-2 text-gray-600">
                Search for YouTube channels and view their statistics.
              </p>
            </div>
          </Link>

          <Link 
            to="/recent" 
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <div className="bg-red-600 p-6 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Searches</h2>
              <p className="mt-2 text-gray-600">
                View your recently searched YouTube channels.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;