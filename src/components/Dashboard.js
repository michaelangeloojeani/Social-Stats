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
