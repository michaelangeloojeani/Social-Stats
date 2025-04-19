import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display Instagram statistics for a given username
function InstagramStats({ username, isConnected, onConnect }) {
  const [stats, setStats] = useState(null); // Holds the fetched stats
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error message if any

  const fetchInstagramStats = async () => {
    if (!username) return; // Don't fetch if username is empty