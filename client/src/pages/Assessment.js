import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Bot,
  Volume2,
  VolumeX,
  Loader,
  Brain,
  Heart,
  Activity
} from 'lucide-react';

const Assessment = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI mental health assistant. How are you feeling today? I'm here to listen and help you with any concerns you might have.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand how you're feeling. It's completely normal to have these emotions. Can you tell me more about what's been on your mind?",
        "Thank you for sharing that with me. It takes courage to open up about your feelings. What strategies have you tried to cope with this?",
        "I hear you, and your feelings are valid. Sometimes it helps to break things down into smaller steps. What would you like to focus on first?",
        "It sounds like you're going through a challenging time. Remember, you're not alone in this. What support systems do you have in place?",
        "I appreciate you being so open with me. These feelings you're experiencing are temporary, even though they might not feel that way right now. What brings you comfort?"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop speech recognition
  };

  const toggleSpeaking = () => {
    setIsSpeaking(!isSpeaking);
    // In a real app, this would start/stop text-to-speech
  };

  const quickQuestions = [
    "How are you feeling right now?",
    "What's been on your mind lately?",
    "How has your sleep been?",
    "Are you feeling stressed about anything?",
    "What's one thing you're grateful for today?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <MessageCircle className="h-8 w-8 text-purple-500 mr-3" />
          AI Mental Health Assistant
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Chat with our AI assistant for support, guidance, and mental health resources
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-indigo-50 rounded-t-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Always here to listen</p>
                </div>
                <div className="ml-auto flex items-center space-x-2">
                  <button
                    onClick={toggleSpeaking}
                    className={`p-2 rounded-full ${
                      isSpeaking ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span className="text-sm">AI is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-full ${
                    isListening ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Questions</h3>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left p-3 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Brain className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-sm text-blue-800">Crisis Resources</span>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Heart className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-sm text-green-800">Self-Care Tips</span>
              </div>
              <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600 mr-3" />
                <span className="text-sm text-purple-800">Breathing Exercises</span>
              </div>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-red-800 mb-2">Emergency Support</h4>
            <p className="text-xs text-red-700 mb-2">
              If you're having thoughts of self-harm, please reach out to:
            </p>
            <div className="text-xs text-red-600 space-y-1">
              <p>National Suicide Prevention Lifeline: 988</p>
              <p>Crisis Text Line: Text HOME to 741741</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
