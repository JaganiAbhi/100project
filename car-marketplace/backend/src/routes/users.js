const express = require('express');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { pool } = require('../config/database');

const router = express.Router();

// Get all users (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, phone, role, avatar, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      users: result.rows
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      message: 'Failed to fetch users',
      error: 'Internal Server Error'
    });
  }
});

module.exports = router;