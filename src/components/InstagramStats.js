import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display Instagram statistics for a given username
function InstagramStats({ username, isConnected, onConnect }) {
  const [stats, setStats] = useState(null); // Holds the fetched stats
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message if any

  const fetchInstagramStats = async () => {
    if (!username) return; // Don't fetch if username is empty

    setLoading(true); // Show loading spinner
    setError(null); // Reset previous error

    try {
      // Remove @ from username if present
      const formattedUsername = username.replace('@', '');

      // Send GET request to backend API
      const response = await axios.get(`/api/instagram/stats/${formattedUsername}`);