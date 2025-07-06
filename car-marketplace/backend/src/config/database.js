const { Pool } = require('pg');
require('dotenv').config();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'car_marketplace',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
};

// Create a new pool instance
const pool = new Pool(dbConfig);

// Test database connection
pool.on('connect', () => {
  console.log('🐘 Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('🚨 Unexpected error on idle client', err);
  process.exit(-1);
});

// Database initialization script
const initializeDatabase = async () => {
  const client = await pool.connect();
  
  try {
    // Create tables if they don't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        role VARCHAR(20) DEFAULT 'user',
        avatar VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS cars (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(100) NOT NULL,
        price DECIMAL(12, 2) NOT NULL,
        year INTEGER NOT NULL,
        mileage INTEGER,
        fuel_type VARCHAR(50),
        seats INTEGER,
        description TEXT,
        features TEXT[],
        images TEXT[],
        status VARCHAR(20) DEFAULT 'active',
        views INTEGER DEFAULT 0,
        inquiries INTEGER DEFAULT 0,
        vin VARCHAR(17),
        stock_number VARCHAR(50),
        condition VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        category VARCHAR(100),
        author VARCHAR(255),
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        read_time VARCHAR(20),
        image VARCHAR(500),
        views INTEGER DEFAULT 0,
        likes INTEGER DEFAULT 0,
        featured BOOLEAN DEFAULT FALSE,
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        car_id INTEGER REFERENCES cars(id),
        message TEXT,
        contact_method VARCHAR(50),
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        car_id INTEGER REFERENCES cars(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_cars_brand ON cars(brand);
      CREATE INDEX IF NOT EXISTS idx_cars_price ON cars(price);
      CREATE INDEX IF NOT EXISTS idx_cars_year ON cars(year);
      CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Seed initial data
const seedDatabase = async () => {
  const client = await pool.connect();
  
  try {
    // Check if we already have data
    const existingCars = await client.query('SELECT COUNT(*) FROM cars');
    if (parseInt(existingCars.rows[0].count) > 0) {
      console.log('📦 Database already has data, skipping seed');
      return;
    }

    // Insert sample cars
    const sampleCars = [
      {
        name: 'BMW M5 Competition',
        brand: 'BMW',
        price: 105000,
        year: 2024,
        mileage: 15,
        fuel_type: 'Gasoline',
        seats: 5,
        description: 'The BMW M5 Competition delivers exceptional performance with its twin-turbo V8 engine.',
        features: ['All-Wheel Drive', 'Luxury Package', 'Sport Mode'],
        images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop'],
        vin: 'WBSJF0C55NCE12345',
        stock_number: 'LC2024001'
      },
      {
        name: 'Mercedes-AMG GT 63 S',
        brand: 'Mercedes-Benz',
        price: 158000,
        year: 2024,
        mileage: 12,
        fuel_type: 'Gasoline',
        seats: 4,
        description: 'Experience the pinnacle of Mercedes-AMG engineering with this high-performance GT.',
        features: ['Carbon Fiber Package', 'AMG Track Package', 'Premium Audio'],
        images: ['https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=800&auto=format&fit=crop'],
        vin: 'WDD2130121A123456',
        stock_number: 'LC2024002'
      }
    ];

    for (const car of sampleCars) {
      await client.query(`
        INSERT INTO cars (name, brand, price, year, mileage, fuel_type, seats, description, features, images, vin, stock_number)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [car.name, car.brand, car.price, car.year, car.mileage, car.fuel_type, car.seats, car.description, car.features, car.images, car.vin, car.stock_number]);
    }

    console.log('🌱 Database seeded with sample data');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    client.release();
  }
};

// Export the pool and helper functions
module.exports = {
  pool,
  initializeDatabase,
  seedDatabase,
  query: (text, params) => pool.query(text, params)
};