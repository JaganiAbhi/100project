const express = require('express');
const { body, validationResult, query } = require('express-validator');
const { pool } = require('../config/database');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Get all blog posts with filtering and pagination
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().trim().escape(),
  query('search').optional().trim().escape(),
  query('featured').optional().isBoolean().withMessage('Featured must be a boolean'),
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
      page = 1, 
      limit = 10, 
      category, 
      search,
      featured,
      sortBy = 'published_at',
      sortOrder = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    let whereConditions = [];
    let queryParams = [];
    let paramCount = 1;

    // Build dynamic WHERE clause
    if (category) {
      whereConditions.push(`category ILIKE $${paramCount}`);
      queryParams.push(`%${category}%`);
      paramCount++;
    }

    if (search) {
      whereConditions.push(`(title ILIKE $${paramCount} OR excerpt ILIKE $${paramCount} OR content ILIKE $${paramCount})`);
      queryParams.push(`%${search}%`);
      paramCount++;
    }

    if (featured !== undefined) {
      whereConditions.push(`featured = $${paramCount}`);
      queryParams.push(featured === 'true');
      paramCount++;
    }

    const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Validate sort parameters
    const allowedSortColumns = ['title', 'category', 'published_at', 'views', 'likes'];
    const sortColumn = allowedSortColumns.includes(sortBy) ? sortBy : 'published_at';
    const sortDirection = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM blog_posts ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get blog posts with pagination
    const postsQuery = `
      SELECT 
        id, title, excerpt, category, author, published_at, read_time,
        image, views, likes, featured, tags, created_at, updated_at
      FROM blog_posts 
      ${whereClause}
      ORDER BY ${sortColumn} ${sortDirection}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    queryParams.push(limit, offset);
    const postsResult = await pool.query(postsQuery, queryParams);

    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      posts: postsResult.rows,
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
    console.error('Get blog posts error:', error);
    res.status(500).json({
      message: 'Failed to fetch blog posts',
      error: 'Internal Server Error'
    });
  }
});

// Get single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT 
        id, title, excerpt, content, category, author, published_at, read_time,
        image, views, likes, featured, tags, created_at, updated_at
       FROM blog_posts 
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Blog post not found'
      });
    }

    // Increment view count
    await pool.query(
      'UPDATE blog_posts SET views = views + 1 WHERE id = $1',
      [id]
    );

    const post = result.rows[0];
    post.views += 1; // Update the returned object

    res.json({ post });
  } catch (error) {
    console.error('Get blog post error:', error);
    res.status(500).json({
      message: 'Failed to fetch blog post',
      error: 'Internal Server Error'
    });
  }
});

module.exports = router;