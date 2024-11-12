// back/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const countryRoutes = require('./router/index');

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration: Allow frontend (React) on localhost:3000 to access backend
app.use(cors({
  origin: 'http://localhost:3000',  // Adjust this to the frontend's URL if deployed
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Routes: Handles API endpoints related to country data
app.use('/api', countryRoutes);

// Start the server and listen on specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
