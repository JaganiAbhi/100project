<?php
// Database setup script
$host = 'localhost';
$user = 'root';
$pass = '';

try {
    // Connect to MySQL server (without database)
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS user_auth_system");
    echo "Database 'user_auth_system' created successfully.\n";
    
    // Use the database
    $pdo->exec("USE user_auth_system");
    
    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "Users table created successfully.\n";
    
    // Create admin user with hashed password (password: admin123)
    $admin_password = password_hash('admin123', PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("INSERT IGNORE INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)");
    $stmt->execute(['admin', 'admin@example.com', $admin_password, 'Administrator']);
    
    echo "Admin user created successfully.\n";
    echo "Login credentials: username=admin, password=admin123\n";
    echo "\nDatabase setup completed!\n";
    
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>