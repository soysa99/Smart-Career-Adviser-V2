require('dotenv').config();

const express = require('express');
const { connect } = require('mongoose');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

// // Basic health check route
// app.get('/', (req, res) => {
//   res.json({ message: 'API is running!' });
// });

// Import suggestion routes
const suggestionRoute = require('./routes/suggestions.js');
app.use('/api/suggestions', suggestionRoute);

// 404 handler - keep this at the end!
app.use((req, res) => {
  res.status(404).json({ message: "API Endpoint Not Found!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoints:`);
  console.log(` GET  http://localhost:${PORT}/`);
  console.log(` POST http://localhost:${PORT}/api/suggestions`);
});
