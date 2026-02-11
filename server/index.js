const express = require('express');
const pool = require('./db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const appRoutes = require('./routes/applications');
const paymentsRoutes = require('./routes/payments');
const smsRoutes = require('./routes/sms');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/sms', smsRoutes);

// initialize tables (simple)
async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(50) DEFAULT 'citizen',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      applicant_name VARCHAR(255),
      product VARCHAR(255),
      data JSON,
      status VARCHAR(50),
      verifier_comment TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      application_id INT,
      user_id INT,
      amount DECIMAL(10,2),
      method VARCHAR(50),
      status VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS policies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      application_id INT,
      policy_number VARCHAR(255),
      data JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query("CREATE TABLE IF NOT EXISTS sms_logs (\n      id INT AUTO_INCREMENT PRIMARY KEY,\n      `to` VARCHAR(50),\n      message TEXT,\n      sent_at TIMESTAMP\n    );");

  // create default admin if not exists
  const [admins] = await pool.query('SELECT id FROM users WHERE role = ?', ['admin']);
  if (!admins.length) {
    const bcrypt = require('bcrypt');
    const pass = await bcrypt.hash('admin123', 10);
    await pool.query('INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)', ['Admin','admin@example.com',pass,'admin']);
    console.log('Default admin created: admin@example.com / admin123');
  }
}

const port = process.env.PORT || 4000;
init().then(()=>{
  app.listen(port, ()=> console.log(`Server running on port ${port}`));
}).catch(err=>{
  console.error('Failed to init DB', err);
});

module.exports = app;
