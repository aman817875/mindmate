import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Heart, 
  BookOpen, 
  Activity, 
  MessageCircle, 
  Users, 
  BarChart3,
  TrendingUp,
  Calendar,
  Brain
} from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [moodStats, setMoodStats] = useState(null);
  const [recentMoods, setRecentMoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [moodResponse, recentMoodResponse] = await Promise.all([
        axios.get('/api/mood/stats?period=7'),
        axios.get('/api/mood?limit=5')
      ]);
      
      setMoodStats(moodResponse.data);
      setRecentMoods(recentMoodResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      'very-happy': '😄',
      'happy': '😊',
      'neutral': '😐',
      'sad': '😢',
      'very-sad': '😭',
      'anxious': '😰',
      'stressed': '😤',
      'angry': '😠',
      'excited': '🤩',
      'calm': '😌'
    };
    return moodEmojis[mood] || '😐';
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      'very-happy': 'text-green-600 bg-green-100',
      'happy': 'text-green-500 bg-green-50',
      'neutral': 'text-gray-600 bg-gray-100',
      'sad': 'text-blue-600 bg-blue-100',
      'very-sad': 'text-blue-700 bg-blue-200',
      'anxious': 'text-yellow-600 bg-yellow-100',
      'stressed': 'text-red-600 bg-red-100',
      'angry': 'text-red-700 bg-red-200',
      'excited': 'text-purple-600 bg-purple-100',
      'calm': 'text-indigo-600 bg-indigo-100'
    };
    return moodColors[mood] || 'text-gray-600 bg-gray-100';
  };

  const quickActions = [
    {
      title: 'Log Mood',
      description: 'How are you feeling today?',
      icon: Heart,
      link: '/mood',
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      title: 'Write Journal',
      description: 'Express your thoughts',
      icon: BookOpen,
      link: '/journal',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Meditate',
      description: 'Take a mindful break',
      icon: Activity,
      link: '/meditation',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'AI Chat',
      description: 'Talk to our assistant',
      icon: MessageCircle,
      link: '/assessment',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const features = [
    {
      title: 'Mood Tracking',
      description: 'Track your daily emotions and see patterns over time',
      icon: Heart,
      link: '/mood',
      stats: moodStats ? `${moodStats.totalEntries} entries` : '0 entries'
    },
    {
      title: 'Journal',
      description: 'AI-powered journaling with personalized insights',
      icon: BookOpen,
      link: '/journal',
      stats: 'AI Analysis'
    },
    {
      title: 'Meditation',
      description: 'Guided meditations and breathing exercises',
      icon: Activity,
      link: '/meditation',
      stats: '10+ Sessions'
    },
    {
      title: 'Therapy',
      description: 'Connect with licensed mental health professionals',
      icon: Users,
      link: '/therapy',
      stats: '24/7 Available'
    },
    {
      title: 'Community',
      description: 'Join supportive discussions with peers',
      icon: Users,
      link: '/community',
      stats: 'Active Community'
    },
    {
      title: 'Analytics',
      description: 'Detailed insights into your mental health journey',
      icon: BarChart3,
      link: '/analytics',
      stats: 'Deep Insights'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-lg text-gray-600">
          How are you feeling today? Let's continue your mental health journey.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className={`${action.color} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1`}
              >
                <Icon className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Overview */}
      {moodStats && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Mood Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Average Mood</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {moodStats.overallAverage?.toFixed(1) || 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Most Common</p>
                  <p className="text-lg font-bold text-gray-900">
                    {getMoodEmoji(moodStats.mostCommonMood)} {moodStats.mostCommonMood?.replace('-', ' ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Entries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {moodStats.totalEntries}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  moodStats.trend > 0 ? 'bg-green-100' : moodStats.trend < 0 ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  <TrendingUp className={`h-6 w-6 ${
                    moodStats.trend > 0 ? 'text-green-600' : moodStats.trend < 0 ? 'text-red-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Trend</p>
                  <p className={`text-lg font-bold ${
                    moodStats.trend > 0 ? 'text-green-600' : moodStats.trend < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {moodStats.trend > 0 ? '+' : ''}{moodStats.trend?.toFixed(1) || '0.0'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Moods */}
      {recentMoods.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Mood Entries</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {recentMoods.map((mood, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{getMoodEmoji(mood.mood)}</span>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">
                          {mood.mood.replace('-', ' ')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(mood.date).toLocaleDateString()} at {new Date(mood.date).toLocaleTimeString()}
                        </p>
                        {mood.notes && (
                          <p className="text-sm text-gray-600 mt-1">{mood.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMoodColor(mood.mood)}`}>
                        Intensity: {mood.intensity}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Link
                  to="/mood"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  View all mood entries →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Grid */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={index}
                to={feature.link}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 hover:border-indigo-300"
              >
                <div className="flex items-start">
                  <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                    <Icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <span className="text-xs text-indigo-600 font-medium">{feature.stats}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white text-center">
        <Brain className="h-12 w-12 mx-auto mb-4 opacity-80" />
        <h3 className="text-xl font-semibold mb-2">Daily Reminder</h3>
        <p className="text-lg opacity-90">
          "Taking care of your mental health is not a luxury, it's a necessity. 
          Every small step you take today is progress towards a healthier tomorrow."
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
