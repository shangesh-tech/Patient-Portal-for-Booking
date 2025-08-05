const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/tests');
const bookingRoutes = require('./routes/bookings');
const authMiddleware = require('./middleware/auth.middleware');
require('dotenv').config();

const app = express();
app.use(cors(
  { origin: 'https://patient-portal-for-booking.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Testing server response
app.router('/',(req, res) => {
  res.send('Welcome to the Patient Portal API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', authMiddleware, testRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
