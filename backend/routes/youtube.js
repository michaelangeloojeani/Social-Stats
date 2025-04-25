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

// Get just basic channel info (for recent searches display)
router.get('/info/:identifier', async (req, res) => {
  const { identifier } = req.params;
  
  try {
    // First, find the channel ID if the user entered a username
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
    
    // Get channel basic info
    const channelResponse = await youtube.channels.list({
      part: 'snippet',
      id: channelId
    });
    
    if (channelResponse.data.items.length === 0) {
      return res.status(404).json({ error: 'YouTube channel not found' });
    }
    
    const channel = channelResponse.data.items[0];
    
    const channelInfo = {
      channelId: channel.id,
      title: channel.snippet.title,
      thumbnailUrl: channel.snippet.thumbnails.default.url
    };
    
    res.json(channelInfo);
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube channel info' });
  }
});

// Get latest videos from a channel
router.get('/videos/:channelId', async (req, res) => {
  const { channelId } = req.params;
  const limit = req.query.limit || 5; // Default to 5 videos
  
  try {
    // Get latest videos from the channel
    const videosResponse = await youtube.search.list({
      part: 'snippet',
      channelId: channelId,
      order: 'date',
      type: 'video',
      maxResults: limit
    });
    
    if (videosResponse.data.items.length === 0) {
      return res.json({ videos: [] });
    }
    
    // Extract video details
    const videos = videosResponse.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      description: item.snippet.description
    }));
    
    res.json({ videos });
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube videos' });
  }
});

// Get trending videos on YouTube
router.get('/trending', async (req, res) => {
  const regionCode = req.query.region || 'US'; // Default to US
  const maxResults = req.query.limit || 10; // Default to 10 videos
  
  try {
    const trendingResponse = await youtube.videos.list({
      part: 'snippet,statistics',
      chart: 'mostPopular',
      regionCode: regionCode,
      maxResults: maxResults
    });
    
    const trendingVideos = trendingResponse.data.items.map(video => ({
      videoId: video.id,
      title: video.snippet.title,
      channelTitle: video.snippet.channelTitle,
      publishedAt: video.snippet.publishedAt,
      thumbnailUrl: video.snippet.thumbnails.medium.url,
      viewCount: parseInt(video.statistics.viewCount),
      likeCount: parseInt(video.statistics.likeCount || 0)
    }));
    
    res.json({ trending: trendingVideos });
  } catch (error) {
    console.error('YouTube API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch trending videos' });
  }
});

module.exports = router;