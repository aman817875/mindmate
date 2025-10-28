# 🧠 MindMate - Mental Health Companion App

A comprehensive mental health companion application built with React and Node.js, featuring AI-powered features, mood tracking, journaling, meditation, and community support.

![MindMate Logo](https://via.placeholder.com/400x200/4F46E5/FFFFFF?text=MindMate)

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Secure login and registration system
- **Mood Tracking** - Daily mood logging with analytics and insights
- **Journaling** - Private journal entries with AI-powered suggestions
- **Meditation** - Guided meditation sessions and breathing exercises
- **Assessment** - Mental health assessments and progress tracking
- **Therapy** - AI-powered therapy sessions and recommendations
- **Community** - Supportive community features and peer connections
- **Analytics** - Comprehensive mental health analytics and reports

### 🤖 AI-Powered Features
- Smart mood analysis and pattern recognition
- Personalized therapy recommendations
- Journal entry insights and suggestions
- Progress tracking and goal setting

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **Socket.io** - Real-time communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Socket.io** - Real-time features
- **Bcrypt** - Password hashing

## 📁 Project Structure

```
mindmate/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── middleware/        # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
├── docs/                 # Documentation
├── scripts/              # Utility scripts
└── package.json          # Root package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindmate.git
   cd mindmate
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   MONGODB_URI=mongodb://localhost:27017/mindmate
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately
   npm run server  # Backend on port 5000
   npm run client  # Frontend on port 3000
   ```

### Production Deployment

#### Heroku Deployment
1. Create a Heroku app
2. Set environment variables
3. Deploy:
   ```bash
   git push heroku main
   ```

#### Railway Deployment
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Mood Tracking
- `GET /api/mood` - Get mood entries
- `POST /api/mood` - Create mood entry
- `PUT /api/mood/:id` - Update mood entry
- `DELETE /api/mood/:id` - Delete mood entry

### Journal
- `GET /api/journal` - Get journal entries
- `POST /api/journal` - Create journal entry
- `PUT /api/journal/:id` - Update journal entry
- `DELETE /api/journal/:id` - Delete journal entry

### Meditation
- `GET /api/meditation` - Get meditation sessions
- `POST /api/meditation` - Start meditation session
- `GET /api/meditation/:id` - Get specific session

### Assessment
- `GET /api/assessment` - Get assessments
- `POST /api/assessment` - Submit assessment
- `GET /api/assessment/results` - Get assessment results

### Community
- `GET /api/community/posts` - Get community posts
- `POST /api/community/posts` - Create post
- `GET /api/community/users` - Get community users

### Analytics
- `GET /api/analytics/mood` - Mood analytics
- `GET /api/analytics/journal` - Journal analytics
- `GET /api/analytics/overview` - Overall analytics

## 🎨 UI Components

### Pages
- **Home** - Landing page with features overview
- **Dashboard** - Main user dashboard
- **Mood Tracking** - Daily mood logging interface
- **Journal** - Journaling interface with AI suggestions
- **Meditation** - Meditation session player
- **Assessment** - Mental health assessment forms
- **Therapy** - AI therapy session interface
- **Community** - Community posts and interactions
- **Analytics** - Data visualization and insights
- **Profile** - User profile management

### Reusable Components
- **Navbar** - Navigation component
- **ProtectedRoute** - Authentication wrapper
- **AuthContext** - Authentication state management

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Rate limiting
- Helmet security headers
- Input validation and sanitization

## 📊 Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  profile: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    preferences: Object
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Mood Model
```javascript
{
  userId: ObjectId,
  mood: Number (1-10),
  emotions: [String],
  notes: String,
  date: Date,
  createdAt: Date
}
```

### Journal Model
```javascript
{
  userId: ObjectId,
  title: String,
  content: String,
  mood: Number,
  tags: [String],
  isPrivate: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run client tests
cd client
npm test

# Run server tests
npm test

# Run all tests
npm run test:all
```

## 📈 Performance

- Lazy loading for components
- Image optimization
- Code splitting
- Caching strategies
- Database indexing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Aman Singh** - Lead Developer
- **Team Members** - [Add team member names]

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB for the database solution
- Tailwind CSS for the utility-first approach
- All open-source contributors

## 📞 Support

For support, email support@mindmate.app or join our community discussions.

## 🔗 Links

- [Live Demo](https://mindmate-app.herokuapp.com)
- [Documentation](https://docs.mindmate.app)
- [API Reference](https://api.mindmate.app/docs)

---

Made with ❤️ for mental health awareness and support.

## ✅ What's Been Completed

### 📁 Complete Repository Structure
- **Initialized Git** repository with proper `.gitignore`
- **Comprehensive README.md** with full project documentation
- **API Documentation** in `docs/API.md`
- **Installation Guide** in `docs/INSTALLATION.md`
- **Contributing Guidelines** in `docs/CONTRIBUTING.md`
- **Deployment Guide** in `DEPLOYMENT.md`
- **MIT License** file
- **Changelog** for version tracking
- **GitHub Issue Templates** for bug reports and feature requests
- **All project files** committed to git

### 🎯 Project Features Documented
- Complete mental health companion app
- React frontend with modern UI
- Node.js backend with Express
- MongoDB database integration
- JWT authentication
- Real-time features
- Comprehensive API documentation

## 🚀 Next Steps to Create GitHub Repository

### Option 1: Using GitHub CLI (Recommended)
```bash
<code_block_to_apply_changes_from>
```

### Option 2: Using GitHub Website
1. **Go to GitHub.com** and sign in
2. **Click "New Repository"** (green button)
3. **Repository name**: `mindmate`
4. **Description**: `Mental Health Companion App with AI-powered features`
5. **Make it Public**
6. **Don't initialize** with README (we already have one)
7. **Click "Create Repository"**

Then run these commands:
```bash
git remote add origin https://github.com/yourusername/mindmate.git
git branch -M main
git push -u origin main
```

### Option 3: I can help you with the commands
Would you like me to run the GitHub CLI commands for you? Just let me know your GitHub username and I'll set it up!

## 📋 Repository Contents

Your repository now includes:
- ✅ Complete React frontend
- ✅ Node.js backend with all routes
- ✅ MongoDB models and middleware
- ✅ Comprehensive documentation
- ✅ Deployment configuration
- ✅ License and contributing guidelines
- ✅ Issue templates
- ✅ Professional README with screenshots placeholders

## 🔗 Once Created

Your team members will be able to:
- **Clone the repository**: `git clone https://github.com/yourusername/mindmate.git`
- **View live documentation** on GitHub
- **Submit issues and feature requests**
- **Contribute to the project**
- **Deploy using the provided guides**

Would you like me to help you create the GitHub repository using the CLI, or would you prefer to do it manually through the GitHub website?