# PHP User Authentication System

A modern, secure, and responsive user authentication system built with PHP and MySQL. Features beautiful UI design with login, signup, and dashboard functionality.

## Features

- ✅ User Registration & Login
- ✅ Secure Password Hashing
- ✅ Session Management
- ✅ Form Validation
- ✅ Responsive Design
- ✅ Modern UI with Gradient Background
- ✅ SQL Injection Protection (PDO)
- ✅ Input Sanitization
- ✅ Error Handling

## Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- PDO MySQL extension enabled

## Installation

1. **Clone or download the files** to your web server directory
2. **Configure database settings** in `config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'your_username');
   define('DB_PASS', 'your_password');
   define('DB_NAME', 'user_auth_system');
   ```

3. **Setup the database** by running one of these options:

   **Option A: Run the setup script**
   ```bash
   php setup_database.php
   ```

   **Option B: Import SQL manually**
   ```bash
   mysql -u root -p < database.sql
   ```

4. **Access the application** in your web browser:
   ```
   http://localhost/php_login_system/
   ```

## Default Credentials

After setup, you can login with:
- **Username:** admin
- **Password:** admin123

## File Structure

```
php_login_system/
├── index.php          # Main landing page
├── login.php          # Login page
├── signup.php         # Registration page
├── dashboard.php      # User dashboard (protected)
├── logout.php         # Logout functionality
├── config.php         # Database configuration
├── style.css          # Styling and responsive design
├── database.sql       # Database schema
├── setup_database.php # Automated database setup
└── README.md          # Documentation
```

## Security Features

- **Password Hashing:** Uses PHP's `password_hash()` with strong encryption
- **SQL Injection Protection:** All queries use prepared statements
- **Session Security:** Proper session management and validation
- **Input Validation:** Server-side validation for all user inputs
- **XSS Protection:** All output is properly escaped

## Customization

### Changing the Design
Edit `style.css` to modify colors, fonts, and layout. The current design uses:
- Gradient background (#667eea to #764ba2)
- Glass-morphism effects
- Smooth animations and transitions

### Adding New Features
- Extend the `users` table for additional user information
- Add password reset functionality
- Implement email verification
- Add user roles and permissions

## Database Schema

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Usage

1. **Registration:** Users can create new accounts with username, email, and password
2. **Login:** Authenticate using username/email and password
3. **Dashboard:** Protected area accessible only to logged-in users
4. **Logout:** Secure session termination

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check database credentials in `config.php`
   - Ensure MySQL service is running
   - Verify database exists

2. **Permission Denied**
   - Check file permissions (755 for directories, 644 for files)
   - Ensure web server has read access

3. **Session Issues**
   - Verify session.save_path is writable
   - Check PHP session configuration

### Error Messages

- **"Connection failed"** - Database connection issues
- **"Username or email already exists"** - Duplicate registration attempt
- **"Invalid username or password"** - Authentication failure
- **"Please fill in all fields"** - Form validation error

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is open source and available under the MIT License.