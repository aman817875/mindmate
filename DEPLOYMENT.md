# MindMate Deployment Guide

## Quick Deploy to Heroku

### Prerequisites
1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Install [Git](https://git-scm.com/)
3. Create a [Heroku account](https://www.heroku.com/)

### Deployment Steps

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create a new Heroku app**
   ```bash
   heroku create mindmate-app-[your-name]
   ```

3. **Set up MongoDB Atlas (Free tier)**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Get your connection string
   - Set it as an environment variable:
   ```bash
   heroku config:set MONGODB_URI="your_mongodb_atlas_connection_string"
   ```

4. **Set other environment variables**
   ```bash
   heroku config:set JWT_SECRET="your_strong_jwt_secret_here"
   heroku config:set NODE_ENV="production"
   ```

5. **Deploy to Heroku**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

6. **Open your app**
   ```bash
   heroku open
   ```

### Alternative: Deploy with Railway

1. Go to [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Add environment variables in Railway dashboard
4. Deploy automatically

### Environment Variables Needed

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Set to "production"
- `PORT`: Automatically set by hosting platform

### Troubleshooting

- If the app doesn't start, check logs: `heroku logs --tail`
- Ensure all dependencies are in package.json
- Make sure the build process completes successfully
