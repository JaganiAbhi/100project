const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Verify JWT token middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      message: 'Access token required',
      error: 'Unauthorized' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Fetch user from database to ensure they still exist
    const userResult = await pool.query(
      'SELECT id, name, email, role, avatar FROM users WHERE id = $1',
      [decoded.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ 
        message: 'User not found',
        error: 'Unauthorized' 
      });
    }

    req.user = userResult.rows[0];
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        message: 'Invalid token',
        error: 'Forbidden' 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        message: 'Token expired',
        error: 'Forbidden' 
      });
    }

    return res.status(500).json({ 
      message: 'Authentication failed',
      error: 'Internal Server Error' 
    });
  }
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: 'Admin access required',
      error: 'Forbidden' 
    });
  }
  next();
};

// Optional authentication - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const userResult = await pool.query(
      'SELECT id, name, email, role, avatar FROM users WHERE id = $1',
      [decoded.userId]
    );

    req.user = userResult.rows.length > 0 ? userResult.rows[0] : null;
  } catch (error) {
    req.user = null;
  }

  next();
};

module.exports = {
  authenticateToken,
  requireAdmin,
  optionalAuth
};