const express = require('express');
const cors = require('cors'); 
require('dotenv').config();

const taskRoutes = require('./routes/api/task');

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
