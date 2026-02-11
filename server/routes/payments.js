const express = require('express');
const pool = require('../db');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// Mock payment endpoint
router.post('/pay', authenticate, async (req, res) => {
  const { applicationId, amount, method } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO payments (application_id, user_id, amount, method, status) VALUES (?,?,?,?,?)', [applicationId, req.user.id, amount, method||'mock', 'completed']);
    // in real integration you'd call gateway and handle callbacks
    res.json({ id: result.insertId, status: 'completed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
