const express = require('express');
const Booking = require('../models/Booking');
const Test = require('../models/Test');
const PDFDocument = require('pdfkit');
const router = express.Router();

// Book a test
router.post('/book', async (req, res) => {
  const { testId } = req.body;
  const booking = new Booking({ patient: req.user.id, test: testId });
  await booking.save();
  res.json({ msg: 'Booked' });
});

// Get history
router.get('/history', async (req, res) => {
  const bookings = await Booking.find({ patient: req.user.id }).populate('test');
  res.json(bookings);
});

// Get dummy report
router.get('/report/:id', async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('test');
  if (!booking || booking.patient.toString() !== req.user.id) return res.status(404).json({ msg: 'Not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
  doc.pipe(res);
  doc.fontSize(25).text('Dummy Lab Report');
  doc.text(`Test: ${booking.test.name}`);
  doc.text(`Date: ${booking.date.toLocaleDateString()}`);
  doc.text('Results: All normal (dummy data)');
  doc.end();
});

module.exports = router;
