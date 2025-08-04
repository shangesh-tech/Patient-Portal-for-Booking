const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const PDFDocument = require('pdfkit');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/tests');
const bookingRoutes = require('./routes/bookings');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware for JWT auth
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ msg: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

app.use('/api/auth', authRoutes);
app.use('/api/tests', authMiddleware, testRoutes);
app.use('/api/bookings', authMiddleware, bookingRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
