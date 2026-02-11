const express = require('express');
const pool = require('../db');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Mock SMS send endpoint
router.post('/send', authenticate, async (req, res) => {
  const { to, message } = req.body;
  try {
    await pool.query('INSERT INTO sms_logs (`to`, message, sent_at) VALUES (?,?,NOW())', [to, message]);
    res.json({ status: 'queued' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
