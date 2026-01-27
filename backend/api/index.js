const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../config/db');

// Load env vars
dotenv.config();

// Connect DB (important: connect once)
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('../routes/auth'));
app.use('/api/movies', require('../routes/movies'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'MovieVerse API is running (serverless)' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

module.exports = serverless(app);
