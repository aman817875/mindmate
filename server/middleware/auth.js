const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');
const memoryStorage = require('./memoryStorage');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Use appropriate storage based on MongoDB connection
    const getUserModel = () => {
      if (mongoose.connection.readyState === 1) {
        return User;
      }
      return memoryStorage.users;
    };

    const UserModel = getUserModel();
    const user = await UserModel.findOne({ _id: decoded.userId });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.userId = user._id;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
