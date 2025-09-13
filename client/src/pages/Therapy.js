import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Video, 
  Phone, 
  MessageCircle, 
  Clock,
  Star,
  CheckCircle
} from 'lucide-react';

const Therapy = () => {
  const [selectedTab, setSelectedTab] = useState('book');

  const therapists = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Anxiety & Depression',
      rating: 4.9,
      experience: '8 years',
      nextAvailable: 'Today, 2:00 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Trauma & PTSD',
      rating: 4.8,
      experience: '12 years',
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Couples Therapy',
      rating: 4.9,
      experience: '6 years',
      nextAvailable: 'Today, 4:00 PM',
      image: 'https://images.unsplash.com/photo-1594824388852-8a0a4b0b0b0b?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      therapist: 'Dr. Sarah Johnson',
      type: 'Video Call',
      date: 'Today',
      time: '2:00 PM',
      duration: '50 minutes',
      status: 'confirmed'
    },
    {
      id: 2,
      therapist: 'Dr. Michael Chen',
      type: 'Phone Call',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '50 minutes',
      status: 'confirmed'
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'therapist',
      name: 'Dr. Sarah Johnson',
      message: 'Hi! How are you feeling today? I wanted to check in before our session.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      sender: 'user',
      message: 'I\'m doing okay, thank you for asking. I\'ve been practicing the breathing exercises you suggested.',
      timestamp: '1 hour ago'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Users className="h-8 w-8 text-blue-500 mr-3" />
          Therapy Sessions
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Connect with licensed mental health professionals
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'book', label: 'Book Session', icon: Calendar },
              { id: 'upcoming', label: 'Upcoming', icon: Clock },
              { id: 'messages', label: 'Messages', icon: MessageCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.id
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Book Session Tab */}
      {selectedTab === 'book' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Therapists</h2>
            <p className="text-gray-600">Choose a therapist that matches your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((therapist) => (
              <div key={therapist.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <img
                    src={therapist.image}
                    alt={therapist.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{therapist.name}</h3>
                    <p className="text-sm text-gray-600">{therapist.specialization}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-gray-600">{therapist.rating} rating</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{therapist.experience} experience</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-600">Next: {therapist.nextAvailable}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Book Session
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions Tab */}
      {selectedTab === 'upcoming' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Sessions</h2>
            <p className="text-gray-600">Your scheduled therapy sessions</p>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-3 bg-indigo-100 rounded-lg mr-4">
                      {session.type === 'Video Call' ? (
                        <Video className="h-6 w-6 text-indigo-600" />
                      ) : (
                        <Phone className="h-6 w-6 text-indigo-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{session.therapist}</h3>
                      <p className="text-sm text-gray-600">{session.type} • {session.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{session.date}</p>
                    <p className="text-sm text-gray-600">{session.time}</p>
                    <div className="flex items-center mt-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 capitalize">{session.status}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Join Session
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Tab */}
      {selectedTab === 'messages' && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages</h2>
            <p className="text-gray-600">Secure communication with your therapists</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Conversations</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div key={message.id} className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white text-sm font-medium">
                              {message.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{message.name}</h4>
                            <p className="text-xs text-gray-500">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md h-96 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Dr. Sarah Johnson</h3>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-indigo-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Therapy;
