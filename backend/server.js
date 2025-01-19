const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors');
const multer = require('multer');  // Import multer for file uploads

const app = express();
const PORT = 5000;

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');  // You can change this path to any directory where you want to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);  // Store files with their original name
  },
});

const upload = multer({ storage: storage });

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve uploaded files as static files

// Routes
app.use('/api/users', userRoutes);  // Make sure this is the correct path 

// Database connection
mongoose.connect('mongodb://localhost:27017/ticketing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
