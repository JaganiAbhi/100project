-- Create database
CREATE DATABASE IF NOT EXISTS user_auth_system;
USE user_auth_system;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create a sample admin user (password: admin123)
-- Note: Run setup_database.php instead to create the admin user with proper password hashing
-- INSERT INTO users (username, email, password, full_name) VALUES 
-- ('admin', 'admin@example.com', 'HASHED_PASSWORD_HERE', 'Administrator');