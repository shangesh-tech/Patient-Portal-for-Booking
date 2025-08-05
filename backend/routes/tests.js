const express = require('express');
const Test = require('../models/Test');
const router = express.Router();

// Seed some dummy tests
const seedTests = async () => {
  if (await Test.countDocuments() === 0) {
    await Test.insertMany([
      { name: 'Blood Test', description: 'Basic blood analysis' },
      { name: 'X-Ray', description: 'Imaging for bones' },
      { name: 'MRI', description: 'Detailed internal scan' },
    ]);
  }
};
seedTests();

// Get all tests
router.get('/', async (req, res) => {
  const tests = await Test.find();
  res.json(tests);
});

module.exports = router;
