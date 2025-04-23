import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to display YouTube channel statistics
function YouTubeStats({ username }) {
  const [stats, setStats] = useState(null); // Holds the fetched stats
  const [loading, setLoading] = useState(false); // Indicates if data is loading
  const [error, setError] = useState(null); // Stores any error message