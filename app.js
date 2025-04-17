const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const voteRoutes = require('./routes/votes');
const authMiddleware = require('./middleware/auth');
const dbConfig = require('./config/db');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware);

// Routes
app.use('/api/votes', voteRoutes);

// MongoDB connection
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
