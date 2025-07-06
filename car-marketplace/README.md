# 🚗 LuxeCars - Premium Car Marketplace

A modern, full-stack car marketplace web application built with React, Node.js, Express, and PostgreSQL. Features a luxurious design, comprehensive car management system, user authentication, admin dashboard, and automotive blog.

## ✨ Features

### 🎨 Frontend Features
- **Modern & Responsive Design**: Built with React and Tailwind CSS
- **Luxury UI/UX**: Premium color scheme with elegant typography
- **User Authentication**: Secure login and registration system
- **Car Browsing**: Advanced filtering, searching, and sorting capabilities
- **Car Details**: Comprehensive car information with image galleries
- **Admin Dashboard**: Complete car management system for administrators
- **Blog System**: Automotive blog with categories and search functionality
- **Mobile-First**: Fully responsive design for all devices

### 🔧 Backend Features
- **RESTful API**: Built with Express.js and Node.js
- **PostgreSQL Database**: Robust data storage with proper indexing
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: User and admin role management
- **Data Validation**: Comprehensive input validation and sanitization
- **Security**: Rate limiting, CORS, helmet protection
- **Error Handling**: Proper error responses and logging

### 🚀 Key Functionalities
1. **User Management**
   - User registration and login
   - Profile management
   - Password change functionality
   - Role-based access control

2. **Car Management**
   - Browse cars with advanced filters
   - View detailed car information
   - Admin car CRUD operations
   - Car categorization by brands
   - Search functionality

3. **Admin Features**
   - Dashboard with statistics
   - Add, edit, and delete cars
   - User management
   - Analytics overview

4. **Blog System**
   - Browse automotive articles
   - Category-based filtering
   - Search functionality
   - Featured articles

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Lucide React**: Beautiful icon set

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Express Validator**: Input validation
- **Helmet**: Security middleware
- **Morgan**: HTTP request logger

### Development Tools
- **Nodemon**: Auto-restart development server
- **Concurrently**: Run multiple npm scripts
- **ESLint**: Code linting
- **Prettier**: Code formatting

## 📁 Project Structure

```
car-marketplace/
├── frontend/                 # React frontend application
│   ├── public/              # Static assets
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies and scripts
│   └── tailwind.config.js  # Tailwind configuration
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── scripts/        # Utility scripts
│   │   ├── utils/          # Helper functions
│   │   └── server.js       # Express server setup
│   ├── .env.example        # Environment variables template
│   └── package.json        # Dependencies and scripts
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd car-marketplace
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your database credentials and other settings
   ```

4. **Set up PostgreSQL database**
   - Create a new database named `car_marketplace`
   - Update database credentials in `.env` file

5. **Initialize the database**
   ```bash
   npm run init-db
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```

7. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=car_marketplace
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
```

## 🎯 Usage

### For Regular Users
1. **Browse Cars**: Visit the homepage to see featured cars
2. **Search & Filter**: Use advanced filters to find specific cars
3. **View Details**: Click on any car to see comprehensive details
4. **Create Account**: Sign up to save favorites and contact dealers
5. **Read Blog**: Stay updated with automotive news and reviews

### For Administrators
1. **Login as Admin**: Use admin credentials to access dashboard
2. **Manage Cars**: Add, edit, or remove car listings
3. **View Analytics**: Monitor site statistics and user activity
4. **User Management**: View and manage user accounts

### Demo Accounts
- **Admin**: admin@luxecars.com / password
- **User**: user@luxecars.com / password

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Cars
- `GET /api/cars` - Get all cars (with filtering)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car (admin only)
- `PUT /api/cars/:id` - Update car (admin only)
- `DELETE /api/cars/:id` - Delete car (admin only)

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post

### Users
- `GET /api/users` - Get all users (admin only)

## 🎨 Design Features

### Color Palette
- **Luxury Gold**: #D4A574 - Premium accent color
- **Navy Blue**: #1A2332 - Primary dark color
- **Luxury Cream**: #F5F2E8 - Background color
- **Silver**: #B8B8B8 - Secondary accent
- **Charcoal**: #36454F - Text color

### Typography
- **Luxury Font**: Playfair Display - For headings and branding
- **Modern Font**: Inter - For body text and UI elements
- **Classic Font**: Crimson Text - For elegant content

### Key Design Elements
- Gradient overlays for premium feel
- Glass morphism effects
- Smooth animations and transitions
- Card-based layouts with hover effects
- Professional car photography
- Consistent spacing and typography

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Prevents API abuse
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Cross-origin request security
- **Helmet Security**: Security headers protection
- **SQL Injection Prevention**: Parameterized queries

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layout with touch interactions
- **Mobile**: Mobile-first design with hamburger navigation

## 🧪 Testing

To run tests (when implemented):
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Frontend Deployment
1. Build the production version:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

### Backend Deployment
1. Set environment variables for production
2. Install production dependencies:
   ```bash
   cd backend
   npm install --production
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Database Setup
1. Create PostgreSQL database on your hosting service
2. Run database initialization:
   ```bash
   npm run init-db
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

Built with passion by the LuxeCars development team.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: info@luxecars.com

---

**LuxeCars** - Where luxury meets technology. Experience the future of car marketplace platforms.