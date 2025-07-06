const { initializeDatabase, seedDatabase } = require('../config/database');

async function initializeApp() {
  console.log('🚀 Starting database initialization...');
  
  try {
    // Initialize database tables
    await initializeDatabase();
    
    // Seed with initial data
    await seedDatabase();
    
    console.log('✅ Database initialization completed successfully!');
    console.log('🎉 Your car marketplace is ready to go!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initializeApp();