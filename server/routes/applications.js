const express = require('express');
const pool = require('../db');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

// create application (citizen)
router.post('/', authenticate, authorize(['citizen','eo','admin']), async (req, res) => {
  const { applicant_name, product, data } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO applications (user_id, applicant_name, product, data, status) VALUES (?,?,?,?,?)', [req.user.id, applicant_name, product, JSON.stringify(data||{}), 'submitted']);
    res.json({ id: result.insertId, status: 'submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// list applications (admin/verifier/eo) or user own applications
router.get('/', authenticate, async (req, res) => {
  try {
    if (req.user.role === 'citizen') {
      const [rows] = await pool.query('SELECT * FROM applications WHERE user_id = ?', [req.user.id]);
      return res.json(rows);
    }
    const [rows] = await pool.query('SELECT * FROM applications');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// update status (verifier/admin)
router.post('/:id/status', authenticate, authorize(['verifier','admin','eo']), async (req, res) => {
  const { status, comment } = req.body;
  try {
    await pool.query('UPDATE applications SET status = ?, verifier_comment = ? WHERE id = ?', [status, comment||null, req.params.id]);
    res.json({ status: 'ok' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
