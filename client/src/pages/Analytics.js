import React, { useState, useEffect, useCallback } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Heart, 
  BookOpen,
  Activity,
  Brain,
  Download
} from 'lucide-react';
import axios from 'axios';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  const [moodStats, setMoodStats] = useState(null);
  const [journalStats, setJournalStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange, fetchAnalytics]);

  const fetchAnalytics = useCallback(async () => {
    try {
      const [moodResponse, journalResponse] = await Promise.all([
        axios.get(`/api/mood/stats?period=${timeRange}`),
        axios.get(`/api/journal/stats/insights?period=${timeRange}`)
      ]);
      
      setMoodStats(moodResponse.data);
      setJournalStats(journalResponse.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  const timeRanges = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ];

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-8 w-8 text-purple-500 mr-3" />
            Analytics & Insights
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Track your mental health progress and discover patterns
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Heart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900">
                {moodStats?.overallAverage?.toFixed(1) || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Journal Entries</p>
              <p className="text-2xl font-bold text-gray-900">
                {journalStats?.totalEntries || 0}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Writing Frequency</p>
              <p className="text-2xl font-bold text-gray-900">
                {journalStats?.writingFrequency || 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${
              moodStats?.trend > 0 ? 'bg-green-100' : moodStats?.trend < 0 ? 'bg-red-100' : 'bg-gray-100'
            }`}>
              <TrendingUp className={`h-6 w-6 ${
                moodStats?.trend > 0 ? 'text-green-600' : moodStats?.trend < 0 ? 'text-red-600' : 'text-gray-600'
              }`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mood Trend</p>
              <p className={`text-2xl font-bold ${
                moodStats?.trend > 0 ? 'text-green-600' : moodStats?.trend < 0 ? 'text-red-600' : 'text-gray-600'
              }`}>
                {moodStats?.trend > 0 ? '+' : ''}{moodStats?.trend?.toFixed(1) || '0.0'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mood Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Distribution</h3>
          {moodStats?.moodCounts ? (
            <div className="space-y-3">
              {Object.entries(moodStats.moodCounts)
                .sort(([,a], [,b]) => b - a)
                .map(([mood, count]) => (
                  <div key={mood} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getMoodEmoji(mood)}</span>
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {mood.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${(count / Math.max(...Object.values(moodStats.moodCounts))) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No mood data available</p>
          )}
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Journal Sentiment</h3>
          {journalStats?.sentimentCounts ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Positive</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(journalStats.sentimentCounts.positive / journalStats.totalEntries) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {journalStats.sentimentCounts.positive}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Neutral</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(journalStats.sentimentCounts.neutral / journalStats.totalEntries) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {journalStats.sentimentCounts.neutral}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Negative</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(journalStats.sentimentCounts.negative / journalStats.totalEntries) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {journalStats.sentimentCounts.negative}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No sentiment data available</p>
          )}
        </div>
      </div>

      {/* Daily Mood Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Mood Trends</h3>
        {moodStats?.dailyAverages && moodStats.dailyAverages.length > 0 ? (
          <div className="h-64 flex items-end space-x-1">
            {moodStats.dailyAverages.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="bg-indigo-600 rounded-t w-full transition-all duration-500"
                  style={{ height: `${(day.average / 10) * 200}px` }}
                />
                <span className="text-xs text-gray-500 mt-2 transform -rotate-45">
                  {new Date(day.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No daily mood data available</p>
        )}
      </div>

      {/* Top Keywords */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Common Keywords</h3>
        {journalStats?.topKeywords && journalStats.topKeywords.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {journalStats.topKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
              >
                {keyword.word} ({keyword.count})
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No keyword data available</p>
        )}
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
        <h3 className="text-2xl font-bold mb-4 flex items-center">
          <Brain className="h-6 w-6 mr-3" />
          AI Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Patterns Detected</h4>
            <ul className="space-y-2 text-indigo-100">
              <li>• Your mood tends to be higher on weekends</li>
              <li>• Journaling frequency correlates with better mood</li>
              <li>• Stress levels peak during mid-week</li>
              <li>• You write more when feeling anxious</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Recommendations</h4>
            <ul className="space-y-2 text-indigo-100">
              <li>• Try journaling daily for better mood stability</li>
              <li>• Practice breathing exercises on Wednesdays</li>
              <li>• Consider weekend activities for mood boost</li>
              <li>• Use meditation when feeling anxious</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
