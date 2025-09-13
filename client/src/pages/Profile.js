import React, { useState, useEffect } from 'react';
import { 
  User, 
  Phone, 
  Save,
  Edit,
  Camera,
  Settings,
  Heart,
  Brain,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    preferences: {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      privacy: {
        profileVisibility: 'private',
        dataSharing: false
      },
      therapy: {
        preferredTime: '',
        preferredType: 'video'
      }
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : '',
        gender: user.gender || '',
        medicalHistory: user.medicalHistory || '',
        emergencyContact: user.emergencyContact || {
          name: '',
          phone: '',
          relationship: ''
        },
        preferences: user.preferences || {
          notifications: { email: true, push: true, sms: false },
          privacy: { profileVisibility: 'private', dataSharing: false },
          therapy: { preferredTime: '', preferredType: 'video' }
        }
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else if (name.startsWith('preferences.')) {
      const parts = name.split('.');
      if (parts.length === 3) {
        const [pref, , field] = parts;
        setFormData(prev => ({
          ...prev,
          preferences: {
            ...prev.preferences,
            [pref]: {
              ...prev.preferences[pref],
              [field]: type === 'checkbox' ? checked : value
            }
          }
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
    
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const stats = [
    { label: 'Mood Entries', value: '24', icon: Heart, color: 'text-pink-500' },
    { label: 'Journal Entries', value: '18', icon: Brain, color: 'text-blue-500' },
    { label: 'Meditation Sessions', value: '12', icon: Activity, color: 'text-green-500' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <User className="h-8 w-8 text-indigo-500 mr-3" />
          Profile Settings
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=4f46e5&color=fff&size=120`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600 mb-4">{user?.email}</p>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center mx-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Activity</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Icon className={`h-5 w-5 ${stat.color} mr-3`} />
                      <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical History (Optional)
                </label>
                <textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  placeholder="Any relevant medical history..."
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Contact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.name"
                    value={formData.emergencyContact.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    name="emergencyContact.phone"
                    value={formData.emergencyContact.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relationship
                  </label>
                  <input
                    type="text"
                    name="emergencyContact.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                    placeholder="e.g., Spouse, Parent, Friend"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Preferences
              </h3>
              
              {/* Notifications */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Notifications</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications.email"
                      checked={formData.preferences.notifications.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications.push"
                      checked={formData.preferences.notifications.push}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Push notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.notifications.sms"
                      checked={formData.preferences.notifications.sms}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                  </label>
                </div>
              </div>

              {/* Privacy */}
              <div className="mb-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">Privacy</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Visibility
                    </label>
                    <select
                      name="preferences.privacy.profileVisibility"
                      value={formData.preferences.privacy.profileVisibility}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                    >
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </select>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences.privacy.dataSharing"
                      checked={formData.preferences.privacy.dataSharing}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <span className="ml-2 text-sm text-gray-700">Allow data sharing for research</span>
                  </label>
                </div>
              </div>

              {/* Therapy Preferences */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Therapy Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      name="preferences.therapy.preferredTime"
                      value={formData.preferences.therapy.preferredTime}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Type
                    </label>
                    <select
                      name="preferences.therapy.preferredType"
                      value={formData.preferences.therapy.preferredType}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-50"
                    >
                      <option value="video">Video Call</option>
                      <option value="audio">Audio Call</option>
                      <option value="chat">Chat</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
