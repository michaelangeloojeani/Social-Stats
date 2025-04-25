const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const instagramRoutes = require('./routes/instagram');
const youtubeRoutes = require('./routes/youtube');