const express = require('express');
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const patient = new Patient({ name, email, password });
    await patient.save();
    res.json({ msg: 'Patient registered' });
  } catch (err) {
    res.status(400).json({ msg: 'Error registering' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ email });
  if (!patient || patient.password !== password) return res.status(400).json({ msg: 'Invalid credentials' });
  const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

router.get('/profile',authMiddleware, async (req, res) => {
  try {
    const decoded = req.user;
    if (!decoded) return res.status(401).json({ msg: 'Unauthorized' });
    const patient = await Patient.findById(decoded.id).select('-password');
    if (!patient) return res.status(404).json({ msg: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ msg: 'Invalid token' });
  }
});
module.exports = router;
