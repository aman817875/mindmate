import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search,
  Calendar,
  TrendingUp,
  Heart,
  Brain,
  Music,
  Activity,
  FileText,
  Users,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import axios from 'axios';

const Journal = () => {
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    mood: '',
    tags: [],
    isPrivate: true
  });

  const moodOptions = [
    { value: 'very-happy', label: 'Very Happy', emoji: '😄', color: 'bg-green-100 text-green-800' },
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-50 text-green-700' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-100 text-gray-700' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-700' },
    { value: 'very-sad', label: 'Very Sad', emoji: '😭', color: 'bg-blue-200 text-blue-800' },
    { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'stressed', label: 'Stressed', emoji: '😤', color: 'bg-red-100 text-red-700' },
    { value: 'angry', label: 'Angry', emoji: '😠', color: 'bg-red-200 text-red-800' },
    { value: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-purple-100 text-purple-700' },
    { value: 'calm', label: 'Calm', emoji: '😌', color: 'bg-indigo-100 text-indigo-700' }
  ];

  const commonTags = [
    'work', 'family', 'friends', 'health', 'exercise', 'travel', 'food', 
    'hobby', 'learning', 'gratitude', 'challenge', 'success', 'reflection'
  ];

  const fetchEntries = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      
      if (searchTerm) params.append('search', searchTerm);
      if (selectedMood) params.append('mood', selectedMood);

      const response = await axios.get(`/api/journal?${params}`);
      setEntries(response.data.entries);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      toast.error('Failed to load journal entries');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, selectedMood]);

  useEffect(() => {
    fetchEntries();
    fetchInsights();
  }, [fetchEntries]);

  const fetchInsights = async () => {
    try {
      const response = await axios.get('/api/journal/stats/insights?period=30');
      setInsights(response.data);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'tags') {
      const tagValue = e.target.value;
      if (e.target.checked) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagValue]
        }));
      } else {
        setFormData(prev => ({
          ...prev,
          tags: prev.tags.filter(tag => tag !== tagValue)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.content.trim()) {
      toast.error('Please write something in your journal entry');
      return;
    }

    try {
      if (editingEntry) {
        await axios.put(`/api/journal/${editingEntry._id}`, formData);
        toast.success('Journal entry updated successfully');
      } else {
        await axios.post('/api/journal', formData);
        toast.success('Journal entry created successfully');
      }
      
      setShowForm(false);
      setEditingEntry(null);
      resetForm();
      fetchEntries();
      fetchInsights();
    } catch (error) {
      console.error('Error saving journal entry:', error);
      toast.error('Failed to save journal entry');
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title || '',
      content: entry.content,
      mood: entry.mood || '',
      tags: entry.tags || [],
      isPrivate: entry.isPrivate
    });
    setShowForm(true);
  };

  const handleDelete = async (entryId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await axios.delete(`/api/journal/${entryId}`);
        toast.success('Journal entry deleted');
        fetchEntries();
        fetchInsights();
      } catch (error) {
        console.error('Error deleting journal entry:', error);
        toast.error('Failed to delete journal entry');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      mood: '',
      tags: [],
      isPrivate: true
    });
  };

  const getMoodEmoji = (mood) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.emoji : '😐';
  };

  const getMoodColor = (mood) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption ? moodOption.color : 'bg-gray-100 text-gray-700';
  };

  const getRecommendationIcon = (type) => {
    const icons = {
      song: Music,
      exercise: Activity,
      meditation: Brain,
      activity: Users,
      article: FileText,
      breathing: Heart
    };
    return icons[type] || Lightbulb;
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
            <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
            Journal
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Express your thoughts and get AI-powered insights
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Entry
        </button>
      </div>

      {/* Insights Overview */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">{insights.totalEntries}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Writing Frequency</p>
                <p className="text-2xl font-bold text-gray-900">{insights.writingFrequency}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Words/Entry</p>
                <p className="text-2xl font-bold text-gray-900">{insights.avgWordsPerEntry}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Brain className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Sentiment</p>
                <p className="text-lg font-bold text-gray-900">
                  {insights.sentimentCounts.positive > insights.sentimentCounts.negative ? '😊 Positive' : 
                   insights.sentimentCounts.negative > insights.sentimentCounts.positive ? '😔 Negative' : '😐 Neutral'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your journal entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">All Moods</option>
              {moodOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Journal Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingEntry ? 'Edit Journal Entry' : 'New Journal Entry'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingEntry(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Give your entry a title..."
                  />
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How are you feeling? (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {moodOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.mood === option.value
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mood"
                          value={option.value}
                          checked={formData.mood === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-2xl mb-1">{option.emoji}</div>
                          <div className="text-xs font-medium text-gray-700">
                            {option.label}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What's on your mind? *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Write about your day, thoughts, feelings, or anything that's on your mind..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.content.length} characters
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Tags (Optional)
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {commonTags.map((tag) => (
                      <label key={tag} className="flex items-center">
                        <input
                          type="checkbox"
                          name="tags"
                          value={tag}
                          checked={formData.tags.includes(tag)}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{tag}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Privacy */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isPrivate"
                    checked={formData.isPrivate}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Keep this entry private
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEntry(null);
                      resetForm();
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingEntry ? 'Update' : 'Save'} Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Journal Entries List */}
      <div className="space-y-6">
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
            <p className="text-gray-600 mb-4">Start writing to track your thoughts and get AI insights</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Write Your First Entry
            </button>
          </div>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  {entry.title && (
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{entry.title}</h3>
                  )}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(entry.date).toLocaleDateString()} at {new Date(entry.date).toLocaleTimeString()}
                    {entry.mood && (
                      <>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(entry.mood)}`}>
                          {getMoodEmoji(entry.mood)} {entry.mood.replace('-', ' ')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(entry)}
                    className="p-2 text-gray-400 hover:text-indigo-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(entry._id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
              </div>

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {entry.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* AI Recommendations */}
              {entry.recommendations && entry.recommendations.length > 0 && (
                <div className="bg-indigo-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-indigo-900 mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    AI Recommendations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {entry.recommendations.map((rec, recIndex) => {
                      const Icon = getRecommendationIcon(rec.type);
                      return (
                        <div key={recIndex} className="bg-white rounded-lg p-3 border border-indigo-200">
                          <div className="flex items-start">
                            <Icon className="h-5 w-5 text-indigo-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div className="flex-1">
                              <h5 className="text-sm font-medium text-gray-900">{rec.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                              {rec.link && (
                                <a
                                  href={rec.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-indigo-600 hover:text-indigo-500 mt-1 inline-block"
                                >
                                  Learn more →
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sentiment Analysis */}
              {entry.sentiment && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-4">Sentiment:</span>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      entry.sentiment.positive > 0.5 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      Positive: {Math.round(entry.sentiment.positive * 100)}%
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      entry.sentiment.negative > 0.5 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      Negative: {Math.round(entry.sentiment.negative * 100)}%
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      entry.sentiment.neutral > 0.5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      Neutral: {Math.round(entry.sentiment.neutral * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={!pagination.hasPrev}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-700">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!pagination.hasNext}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;
