import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Heart, 
  MessageCircle, 
  Share,
  Flag,
  MoreVertical,
  Clock,
  ThumbsUp,
  Reply
} from 'lucide-react';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'anxiety', label: 'Anxiety Support', count: 8 },
    { id: 'depression', label: 'Depression Support', count: 6 },
    { id: 'general', label: 'General Discussion', count: 10 }
  ];

  const posts = [
    {
      id: 1,
      author: 'Sarah M.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      category: 'anxiety',
      title: 'Coping with work stress',
      content: 'I\'ve been feeling overwhelmed at work lately. Does anyone have strategies that help them manage work-related anxiety?',
      likes: 12,
      comments: 8,
      timeAgo: '2 hours ago',
      tags: ['work', 'stress', 'anxiety']
    },
    {
      id: 2,
      author: 'Mike R.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      category: 'depression',
      title: 'Gratitude practice helping',
      content: 'Started a daily gratitude journal last week and I can already feel a difference. Small wins matter!',
      likes: 18,
      comments: 5,
      timeAgo: '4 hours ago',
      tags: ['gratitude', 'journaling', 'positivity']
    },
    {
      id: 3,
      author: 'Emma L.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      category: 'general',
      title: 'Meditation recommendations',
      content: 'Looking for meditation apps or techniques that have worked for others. What do you recommend?',
      likes: 15,
      comments: 12,
      timeAgo: '6 hours ago',
      tags: ['meditation', 'mindfulness', 'apps']
    }
  ];

  const comments = [
    {
      id: 1,
      author: 'Alex K.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      content: 'I find taking short breaks every hour really helps. Even just standing up and stretching makes a difference.',
      timeAgo: '1 hour ago',
      likes: 3
    },
    {
      id: 2,
      author: 'Lisa P.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face',
      content: 'Breathing exercises have been a game changer for me. The 4-7-8 technique works wonders.',
      timeAgo: '30 minutes ago',
      likes: 7
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Users className="h-8 w-8 text-green-500 mr-3" />
            Community
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Connect with others on their mental health journey
          </p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Posts</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search community posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{category.label}</span>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Community Guidelines</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Be respectful and supportive</li>
              <li>• Share your experiences, not medical advice</li>
              <li>• Keep discussions constructive</li>
              <li>• Report inappropriate content</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                {/* Post Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.avatar}
                      alt={post.author}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{post.author}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.timeAgo}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Flag className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h2>
                  <p className="text-gray-700">{post.content}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center text-gray-500 hover:text-red-500">
                      <Heart className="h-5 w-5 mr-1" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-blue-500">
                      <MessageCircle className="h-5 w-5 mr-1" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                    <button className="flex items-center text-gray-500 hover:text-green-500">
                      <Share className="h-5 w-5 mr-1" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>

                {/* Comments */}
                <div className="mt-4 space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-8 h-8 rounded-full mr-3 mt-1"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 ml-3">
                          <button className="flex items-center text-xs text-gray-500 hover:text-red-500">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            {comment.likes}
                          </button>
                          <button className="text-xs text-gray-500 hover:text-blue-500">
                            <Reply className="h-3 w-3 mr-1 inline" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                      alt="You"
                      className="w-8 h-8 rounded-full"
                    />
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium">
              Load More Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
