// back/server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const countryRoutes = require('./router/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());


// Endpoint to get country info
app.use('/api', countryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

