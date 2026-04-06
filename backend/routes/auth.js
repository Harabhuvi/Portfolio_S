const express = require('express');
const router = express.Router();

// POST /api/auth/login — simple credential check
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'yourpassword';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({ success: true, message: 'Logged in successfully.' });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials.' });
});

module.exports = router;
