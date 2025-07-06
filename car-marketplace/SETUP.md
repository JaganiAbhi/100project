# 🚀 Quick Setup Guide

This guide will help you get the LuxeCars marketplace up and running quickly.

## Prerequisites ✅

- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

## Quick Start (5 minutes) ⚡

### 1. Install All Dependencies
```bash
npm run install:all
```

### 2. Set Up Database
```bash
# Create PostgreSQL database
createdb car_marketplace

# Or using psql
psql -U postgres -c "CREATE DATABASE car_marketplace;"
```

### 3. Configure Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

### 4. Initialize Database
```bash
npm run init-db
```

### 5. Start Development Servers
```bash
npm run dev
```

This will start both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## Default Credentials 🔑

### Admin Access
- **Email**: admin@luxecars.com
- **Password**: password

### Regular User
- **Email**: user@luxecars.com  
- **Password**: password

## Features to Test 🧪

1. **Browse Cars**: Visit homepage and explore car listings
2. **Search & Filter**: Try different search criteria and filters
3. **User Registration**: Create a new account
4. **Admin Dashboard**: Login as admin to manage cars
5. **Blog Section**: Read automotive articles
6. **Responsive Design**: Test on different screen sizes

## Troubleshooting 🔧

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists

### Port Conflicts
- Frontend runs on port 3000
- Backend runs on port 5000
- Change ports in respective config files if needed

### Node Modules Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## Development URLs 🌐

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

---

🎉 **Congratulations!** Your luxury car marketplace is now running.

For detailed documentation, see [README.md](README.md)