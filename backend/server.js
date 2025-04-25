const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const youtubeRoutes = require('./routes/youtube');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/youtube', youtubeRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Social Media Stats API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});