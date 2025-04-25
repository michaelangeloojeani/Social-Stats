const express = require('express');
const router = express.Router();
const axios = require('axios');

// Instagram OAuth endpoints
router.get('/auth', (req, res) => {
  // Initiate Instagram OAuth flow
  const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.json({ authUrl: instagramAuthUrl });
});

// Handle Instagram OAuth callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://api.instagram.com/oauth/access_token', 
      `client_id=${process.env.INSTAGRAM_CLIENT_ID}&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&grant_type=authorization_code&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&code=${code}`, 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const { access_token, user_id } = tokenResponse.data;
    
    // Get long-lived token (valid for 60 days)
    const longLivedTokenResponse = await axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${access_token}`);
    
    const longLivedToken = longLivedTokenResponse.data.access_token;
    
    // Get user profile information
    const userInfoResponse = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${longLivedToken}`);
    
    // Store in user session
    if (!req.session.socialAccounts) {
      req.session.socialAccounts = {};
    }
    
    req.session.socialAccounts.instagram = {
      userId: user_id,
      username: userInfoResponse.data.username,
      accessToken: longLivedToken,
      connected: true
    };
    
    // Redirect back to frontend
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?instagram_connected=true`);
  } catch (error) {
    console.error('Instagram OAuth Error:', error.response?.data || error.message);
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?error=instagram_auth_failed`);
  }
});

// Get Instagram profile stats
router.get('/stats/:username', async (req, res) => {
  const { username } = req.params;
  
  // Check if user is authenticated with Instagram
  if (!req.session.socialAccounts?.instagram?.connected) {
    return res.status(401).json({ error: 'Instagram account not connected' });
  }
  
  try {
    const { accessToken } = req.session.socialAccounts.instagram;
    
    // Get user profile information
    // Note: Basic Display API is limited in what it can return
    // For full features, you would need to apply for advanced permissions
    const userInfoResponse = await axios.get(`https://graph.instagram.com/me?fields=id,username,media_count&access_token=${accessToken}`);
    
    // Get media edge to count followers/following
    // Note: This requires additional permissions that need app review
    // For demo purposes, we'll return the available data
    
    const stats = {
      username,
      posts: userInfoResponse.data.media_count || 0,
      // These would require Business/Creator account and additional permissions
      followers: "Not available without Business API access",
      following: "Not available without Business API access"
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Instagram API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Instagram data' });
  }
});

// Check if Instagram is connected
router.get('/status', (req, res) => {
  const isConnected = !!req.session.socialAccounts?.instagram?.connected;
  const username = req.session.socialAccounts?.instagram?.username;
  
  res.json({
    connected: isConnected,
    username: username || null
  });
});

module.exports = router;