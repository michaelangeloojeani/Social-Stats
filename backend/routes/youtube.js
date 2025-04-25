const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

// Initialize YouTube API
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

// Get channel statistics by username or channel ID
router.get('/stats/:identifier', async (req, res) => {
  const { identifier } = req.params;
  
  try {
    // First, we need to find the channel ID if the user entered a username
    let channelId = identifier;
    
    // Check if the identifier is a username (not a channel ID)
    if (!identifier.startsWith('UC')) {
      // Search for the channel by username
      const searchResponse = await youtube.search.list({
        part: 'snippet',
        q: identifier,
        type: 'channel',
        maxResults: 1
      });
      
      if (searchResponse.data.items.length === 0) {
        return res.status(404).json({ error: 'YouTube channel not found' });
      }
      
      channelId = searchResponse.data.items[0].id.channelId;
    }
    
    // Get channel statistics
    const channelResponse = await youtube.channels.list({
      part: 'snippet,statistics',
      id: channelId
    });
    
    if (channelResponse.data.items.length === 0) {
      return res.status(404).json({ error: 'YouTube channel not found' });
    }
    
    const channel = channelResponse.data.items[0];
    
    // Get videos to calculate total view count
    const videosResponse = await youtube.search.list({
      part: 'id',
      channelId: channelId,
      type: 'video',
      maxResults: 50 // API limit
    });
    
    const stats = {
      channelName: channel.snippet.title,
      description: channel.snippet.description,
      thumbnailUrl: channel.snippet.thumbnails.default.url,
      subscribers: parseInt(channel.statistics.subscriberCount),
      videos: parseInt(channel.statistics.videoCount),
      views: parseInt(channel.statistics.viewCount),
      videoCount: videosResponse.data.pageInfo.totalResults
    };
    
    res.json(stats);
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
});

module.exports = router;