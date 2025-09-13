# MindMate Installation Guide

This guide will help you install and set up MindMate on your local machine.

## 📋 Prerequisites

Before installing MindMate, ensure you have the following installed:

### Required Software
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### Optional Software
- **MongoDB Compass** - GUI for MongoDB
- **VS Code** - Recommended code editor
- **Postman** - API testing tool

## 🚀 Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mindmate.git
cd mindmate
```

### 2. Install Dependencies

#### Root Dependencies
```bash
npm install
```

#### Client Dependencies
```bash
cd client
npm install
cd ..
```

### 3. Environment Configuration

#### Create Environment File
```bash
# Copy the example environment file
cp .env.example .env
```

#### Configure Environment Variables
Edit the `.env` file with your configuration:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/mindmate

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 4. Database Setup

#### Local MongoDB
1. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

2. Create database:
   ```bash
   mongo
   use mindmate
   ```

#### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 5. Start the Application

#### Development Mode (Recommended)
```bash
# Runs both client and server concurrently
npm run dev
```

#### Separate Processes
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### 6. Verify Installation

1. **Backend**: Visit `http://localhost:5000/api`
2. **Frontend**: Visit `http://localhost:3000`
3. **Database**: Check MongoDB connection

## 🔧 Configuration Options

### Client Configuration
Edit `client/package.json`:
```json
{
  "proxy": "http://localhost:5000"
}
```

### Server Configuration
Edit `server/index.js` for custom settings:
- Port configuration
- CORS settings
- Rate limiting
- Security headers

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Kill process using port 5000
npx kill-port 5000

# Or use different port
PORT=3001 npm run server
```

#### MongoDB Connection Failed
1. Check if MongoDB is running
2. Verify connection string
3. Check firewall settings
4. Ensure database exists

#### Node Modules Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# For client
cd client
rm -rf node_modules package-lock.json
npm install
```

#### Permission Issues
```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
export PATH=~/.npm-global/bin:$PATH
```

### Environment Variables Not Loading
1. Ensure `.env` file is in root directory
2. Check file permissions
3. Restart the application
4. Verify variable names match exactly

### Build Issues
```bash
# Clear build cache
cd client
rm -rf build
npm run build
```

## 📊 Database Schema

### Initial Setup
The application will automatically create the following collections:
- `users` - User accounts and profiles
- `moods` - Mood tracking entries
- `journals` - Journal entries
- `meditations` - Meditation sessions
- `assessments` - Assessment responses
- `community` - Community posts

### Sample Data
You can add sample data for testing:
```bash
# Run sample data script
npm run seed
```

## 🔒 Security Considerations

### Development
- Use strong JWT secrets
- Don't commit `.env` files
- Use HTTPS in production
- Validate all inputs

### Production
- Use environment variables for secrets
- Enable MongoDB authentication
- Use strong passwords
- Regular security updates

## 📱 Mobile Development

### React Native Setup
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create mobile app
npx react-native init MindMateMobile
```

### PWA Support
The app includes PWA support:
- Service worker for offline functionality
- App manifest for installation
- Responsive design for mobile

## 🧪 Testing Setup

### Unit Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Integration Tests
```bash
# Run integration tests
npm run test:integration
```

### E2E Tests
```bash
# Run end-to-end tests
npm run test:e2e
```

## 📈 Performance Optimization

### Build Optimization
```bash
# Production build
npm run build

# Analyze bundle size
npm run analyze
```

### Database Optimization
- Add indexes for frequently queried fields
- Use connection pooling
- Monitor query performance

## 🚀 Deployment Preparation

### Build for Production
```bash
# Build client
cd client
npm run build
cd ..

# Start production server
NODE_ENV=production npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
PORT=5000
```

## 📞 Support

If you encounter issues:
1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Create a new issue with details
4. Join our community Discord

## 🎉 Next Steps

After successful installation:
1. Create your first account
2. Explore the features
3. Check out the API documentation
4. Join the community
5. Start contributing!

Happy coding! 🚀
