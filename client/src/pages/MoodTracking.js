import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  Heart, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react';
import axios from 'axios';

const MoodTracking = () => {
  const [moods, setMoods] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMood, setEditingMood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    mood: '',
    intensity: 5,
    notes: '',
    triggers: [],
    activities: [],
    sleepQuality: 5,
    energyLevel: 5,
    stressLevel: 5,
    anxietyLevel: 5
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

  const triggerOptions = [
    'work', 'relationships', 'health', 'finances', 'family', 
    'social', 'weather', 'sleep', 'exercise', 'other'
  ];

  const activityOptions = [
    'exercise', 'meditation', 'socializing', 'work', 'hobby', 
    'rest', 'eating', 'reading', 'music', 'other'
  ];

  useEffect(() => {
    fetchMoods();
    fetchStats();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await axios.get('/api/mood?limit=50');
      setMoods(response.data);
    } catch (error) {
      console.error('Error fetching moods:', error);
      toast.error('Failed to load mood entries');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/mood/stats?period=30');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target;
      if (name === 'triggers' || name === 'activities') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.mood) {
      toast.error('Please select a mood');
      return;
    }

    try {
      if (editingMood) {
        await axios.put(`/api/mood/${editingMood._id}`, formData);
        toast.success('Mood updated successfully');
      } else {
        await axios.post('/api/mood', formData);
        toast.success('Mood logged successfully');
      }
      
      setShowForm(false);
      setEditingMood(null);
      resetForm();
      fetchMoods();
      fetchStats();
    } catch (error) {
      console.error('Error saving mood:', error);
      toast.error('Failed to save mood entry');
    }
  };

  const handleEdit = (mood) => {
    setEditingMood(mood);
    setFormData({
      mood: mood.mood,
      intensity: mood.intensity,
      notes: mood.notes || '',
      triggers: mood.triggers || [],
      activities: mood.activities || [],
      sleepQuality: mood.sleepQuality || 5,
      energyLevel: mood.energyLevel || 5,
      stressLevel: mood.stressLevel || 5,
      anxietyLevel: mood.anxietyLevel || 5
    });
    setShowForm(true);
  };

  const handleDelete = async (moodId) => {
    if (window.confirm('Are you sure you want to delete this mood entry?')) {
      try {
        await axios.delete(`/api/mood/${moodId}`);
        toast.success('Mood entry deleted');
        fetchMoods();
        fetchStats();
      } catch (error) {
        console.error('Error deleting mood:', error);
        toast.error('Failed to delete mood entry');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      mood: '',
      intensity: 5,
      notes: '',
      triggers: [],
      activities: [],
      sleepQuality: 5,
      energyLevel: 5,
      stressLevel: 5,
      anxietyLevel: 5
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
            <Heart className="h-8 w-8 text-pink-500 mr-3" />
            Mood Tracking
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Track your daily emotions and discover patterns in your mental health
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Mood
        </button>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Mood</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.overallAverage?.toFixed(1) || 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalEntries}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Most Common</p>
                <p className="text-lg font-bold text-gray-900">
                  {getMoodEmoji(stats.mostCommonMood)} {stats.mostCommonMood?.replace('-', ' ')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${
                stats.trend > 0 ? 'bg-green-100' : stats.trend < 0 ? 'bg-red-100' : 'bg-gray-100'
              }`}>
                <BarChart3 className={`h-6 w-6 ${
                  stats.trend > 0 ? 'text-green-600' : stats.trend < 0 ? 'text-red-600' : 'text-gray-600'
                }`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Trend</p>
                <p className={`text-lg font-bold ${
                  stats.trend > 0 ? 'text-green-600' : stats.trend < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {stats.trend > 0 ? '+' : ''}{stats.trend?.toFixed(1) || '0.0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mood Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingMood ? 'Edit Mood Entry' : 'Log Your Mood'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setEditingMood(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Mood Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How are you feeling? *
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

                {/* Intensity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intensity: {formData.intensity}/10
                  </label>
                  <input
                    type="range"
                    name="intensity"
                    min="1"
                    max="10"
                    value={formData.intensity}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Quality: {formData.sleepQuality}/10
                    </label>
                    <input
                      type="range"
                      name="sleepQuality"
                      min="1"
                      max="10"
                      value={formData.sleepQuality}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Energy Level: {formData.energyLevel}/10
                    </label>
                    <input
                      type="range"
                      name="energyLevel"
                      min="1"
                      max="10"
                      value={formData.energyLevel}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stress Level: {formData.stressLevel}/10
                    </label>
                    <input
                      type="range"
                      name="stressLevel"
                      min="1"
                      max="10"
                      value={formData.stressLevel}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anxiety Level: {formData.anxietyLevel}/10
                    </label>
                    <input
                      type="range"
                      name="anxietyLevel"
                      min="1"
                      max="10"
                      value={formData.anxietyLevel}
                      onChange={handleInputChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What might have influenced your mood? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {triggerOptions.map((trigger) => (
                      <label key={trigger} className="flex items-center">
                        <input
                          type="checkbox"
                          name="triggers"
                          value={trigger}
                          checked={formData.triggers.includes(trigger)}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{trigger}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What activities did you do today? (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {activityOptions.map((activity) => (
                      <label key={activity} className="flex items-center">
                        <input
                          type="checkbox"
                          name="activities"
                          value={activity}
                          checked={formData.activities.includes(activity)}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700 capitalize">{activity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Share any additional thoughts about your mood..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMood(null);
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
                    {editingMood ? 'Update' : 'Save'} Mood
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mood Entries List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Mood Entries</h2>
          
          {moods.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mood entries yet</h3>
              <p className="text-gray-600 mb-4">Start tracking your mood to see patterns and insights</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                Log Your First Mood
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {moods.map((mood, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-3xl mr-4">{getMoodEmoji(mood.mood)}</span>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900 capitalize">
                            {mood.mood.replace('-', ' ')}
                          </h3>
                          <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${getMoodColor(mood.mood)}`}>
                            Intensity: {mood.intensity}/10
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(mood.date).toLocaleDateString()} at {new Date(mood.date).toLocaleTimeString()}
                        </p>
                        {mood.notes && (
                          <p className="text-sm text-gray-600 mt-1">{mood.notes}</p>
                        )}
                        {(mood.triggers?.length > 0 || mood.activities?.length > 0) && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {mood.triggers?.map((trigger, i) => (
                              <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                                {trigger}
                              </span>
                            ))}
                            {mood.activities?.map((activity, i) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {activity}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(mood)}
                        className="p-2 text-gray-400 hover:text-indigo-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mood._id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracking;
