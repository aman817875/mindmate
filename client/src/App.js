import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MoodTracking from './pages/MoodTracking';
import Journal from './pages/Journal';
import Meditation from './pages/Meditation';
import Assessment from './pages/Assessment';
import Therapy from './pages/Therapy';
import Community from './pages/Community';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/mood" 
                element={
                  <ProtectedRoute>
                    <MoodTracking />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/journal" 
                element={
                  <ProtectedRoute>
                    <Journal />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/meditation" 
                element={
                  <ProtectedRoute>
                    <Meditation />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/assessment" 
                element={
                  <ProtectedRoute>
                    <Assessment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/therapy" 
                element={
                  <ProtectedRoute>
                    <Therapy />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/community" 
                element={
                  <ProtectedRoute>
                    <Community />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/analytics" 
                element={
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
