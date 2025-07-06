const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all cars with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('brand').optional().trim().escape(),
  query('minPrice').optional().isFloat({ min: 0 }).withMessage('Min price must be a positive number'),
  query('maxPrice').optional().isFloat({ min: 0 }).withMessage('Max price must be a positive number'),
  query('year').optional().isInt({ min: 1900, max: 2030 }).withMessage('Year must be between 1900 and 2030'),
  query('fuelType').optional().trim().escape(),
  query('search').optional().trim().escape(),
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { 
      page = 1, 
      limit = 10, 
      brand, 
      minPrice, 
      maxPrice, 
      year, 
      fuelType, 
      search,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = ['status = $1'];
    let queryParams = ['active'];
    let paramCount = 2;

    // Build dynamic WHERE clause
    if (brand) {
      whereConditions.push(`brand ILIKE $${paramCount}`);
      queryParams.push(`%${brand}%`);
      paramCount++;
    }

    if (minPrice) {
      whereConditions.push(`price >= $${paramCount}`);
      queryParams.push(minPrice);
      paramCount++;
    }

    if (maxPrice) {
      whereConditions.push(`price <= $${paramCount}`);
      queryParams.push(maxPrice);
      paramCount++;
    }

    if (year) {
      whereConditions.push(`year = $${paramCount}`);
      queryParams.push(year);
      paramCount++;
    }

    if (fuelType) {
      whereConditions.push(`fuel_type ILIKE $${paramCount}`);
      queryParams.push(`%${fuelType}%`);
      paramCount++;
    }

    if (search) {
      whereConditions.push(`(name ILIKE $${paramCount} OR description ILIKE $${paramCount} OR brand ILIKE $${paramCount})`);
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    // Validate sort parameters
    const allowedSortColumns = ['name', 'brand', 'price', 'year', 'created_at', 'views'];
    const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const sortDirection = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Build the main query
    const baseQuery = `
      FROM cars 
      WHERE ${whereConditions.join(' AND ')}
    `;

    // Get total count
    const countQuery = `SELECT COUNT(*) ${baseQuery}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get cars with pagination
    const carsQuery = `
      SELECT 
        id, name, brand, price, year, mileage, fuel_type, seats, 
        description, features, images, status, views, inquiries,
        vin, stock_number, condition, created_at, updated_at
      ${baseQuery}
      ORDER BY ${sortColumn} ${sortDirection}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    queryParams.push(limit, offset);
    const carsResult = await pool.query(carsQuery, queryParams);

    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      cars: carsResult.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems,
        itemsPerPage: parseInt(limit),
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      message: 'Failed to fetch cars',
      error: 'Internal Server Error'
    });
  }
});

// Get single car by ID
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        id, name, brand, price, year, mileage, fuel_type, seats, 
        description, features, images, status, views, inquiries,
        vin, stock_number, condition, created_at, updated_at
       FROM cars 
       WHERE id = $1 AND status = 'active'`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Car not found'
      });
    }

    // Increment view count
    await pool.query(
      'UPDATE cars SET views = views + 1 WHERE id = $1',
      [id]
    );

    const car = result.rows[0];
    car.views += 1; // Update the returned object

    res.json({ car });
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({
      message: 'Failed to fetch car',
      error: 'Internal Server Error'
    });
  }
});

// Create new car (Admin only)
router.post('/', authenticateToken, requireAdmin, [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('brand').trim().isLength({ min: 2 }).withMessage('Brand must be at least 2 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('year').isInt({ min: 1900, max: 2030 }).withMessage('Year must be between 1900 and 2030'),
  body('mileage').optional().isInt({ min: 0 }).withMessage('Mileage must be a positive integer'),
  body('fuelType').optional().trim().escape(),
  body('seats').optional().isInt({ min: 1, max: 12 }).withMessage('Seats must be between 1 and 12'),
  body('description').optional().trim(),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('vin').optional().trim().isLength({ max: 17 }).withMessage('VIN must be at most 17 characters'),
  body('stockNumber').optional().trim(),
  body('condition').optional().isIn(['new', 'used', 'certified']).withMessage('Invalid condition'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      name, brand, price, year, mileage, fuelType, seats,
      description, features, images, vin, stockNumber, condition
    } = req.body;

    const result = await pool.query(
      `INSERT INTO cars 
       (name, brand, price, year, mileage, fuel_type, seats, description, features, images, vin, stock_number, condition)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING *`,
      [
        name, brand, price, year, mileage || null, fuelType || null, seats || null,
        description || null, features || [], images || [], vin || null, stockNumber || null, condition || 'new'
      ]
    );

    res.status(201).json({
      message: 'Car created successfully',
      car: result.rows[0]
    });
  } catch (error) {
    console.error('Create car error:', error);
    res.status(500).json({
      message: 'Failed to create car',
      error: 'Internal Server Error'
    });
  }
});

// Update car (Admin only)
router.put('/:id', authenticateToken, requireAdmin, [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('brand').optional().trim().isLength({ min: 2 }).withMessage('Brand must be at least 2 characters'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('year').optional().isInt({ min: 1900, max: 2030 }).withMessage('Year must be between 1900 and 2030'),
  body('mileage').optional().isInt({ min: 0 }).withMessage('Mileage must be a positive integer'),
  body('fuelType').optional().trim().escape(),
  body('seats').optional().isInt({ min: 1, max: 12 }).withMessage('Seats must be between 1 and 12'),
  body('description').optional().trim(),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('status').optional().isIn(['active', 'sold', 'inactive']).withMessage('Invalid status'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const updates = Object.keys(req.body);
    
    if (updates.length === 0) {
      return res.status(400).json({
        message: 'No fields to update'
      });
    }

    // Build dynamic update query
    const setClause = updates.map((field, index) => {
      const dbField = field === 'fuelType' ? 'fuel_type' : field;
      return `${dbField} = $${index + 2}`;
    }).join(', ');

    const values = [id, ...updates.map(field => req.body[field])];

    const query = `
      UPDATE cars 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $1 
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Car not found'
      });
    }

    res.json({
      message: 'Car updated successfully',
      car: result.rows[0]
    });
  } catch (error) {
    console.error('Update car error:', error);
    res.status(500).json({
      message: 'Failed to update car',
      error: 'Internal Server Error'
    });
  }
});

// Delete car (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM cars WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Car not found'
      });
    }

    res.json({
      message: 'Car deleted successfully'
    });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({
      message: 'Failed to delete car',
      error: 'Internal Server Error'
    });
  }
});

module.exports = router;