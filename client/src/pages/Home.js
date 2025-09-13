import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Activity, 
  MessageCircle, 
  Users, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Shield,
  Clock,
  Star
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Heart,
      title: 'Mood Tracking',
      description: 'Track your daily emotions with intuitive emoji-based logging and detailed analytics.'
    },
    {
      icon: BookOpen,
      title: 'AI-Powered Journal',
      description: 'Write freely with AI analysis that provides personalized recommendations and insights.'
    },
    {
      icon: Activity,
      title: 'Guided Meditations',
      description: 'Access audio and video meditations, breathing exercises, and relaxation techniques.'
    },
    {
      icon: MessageCircle,
      title: 'AI Assistant',
      description: 'Real-time talking assistant with speech-to-text for stress relief conversations.'
    },
    {
      icon: Users,
      title: 'Therapy Sessions',
      description: 'Connect with licensed therapists through secure video calls and messaging.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Comprehensive dashboard with mood trends, patterns, and personalized insights.'
    }
  ];

  const benefits = [
    '24/7 AI-powered mental health support',
    'Secure and confidential data handling',
    'Personalized recommendations based on your data',
    'Professional therapy sessions available',
    'Community support and peer discussions',
    'Evidence-based mental health resources'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Mental Health
              <span className="block text-yellow-300">Companion</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              MindMate combines AI technology with professional therapy to provide 
              comprehensive mental health support whenever you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides tools, support, and insights 
              to help you on your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose MindMate?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We combine cutting-edge AI technology with professional mental health 
                expertise to provide you with the most comprehensive mental wellness platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-12 w-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  AI-Powered Insights
                </h3>
                <p className="text-gray-600 mb-6">
                  Our advanced AI analyzes your mood patterns, journal entries, and 
                  assessments to provide personalized recommendations and early warning signs.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">95%</div>
                    <div className="text-sm text-gray-600">Accuracy Rate</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">24/7</div>
                    <div className="text-sm text-gray-600">Available Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Privacy & Security Matter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We use enterprise-grade security to protect your mental health data 
              and ensure complete confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                End-to-End Encryption
              </h3>
              <p className="text-gray-600">
                All your data is encrypted using industry-standard protocols to ensure maximum security.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                HIPAA Compliant
              </h3>
              <p className="text-gray-600">
                We follow strict healthcare privacy regulations to protect your sensitive information.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Trusted by Thousands
              </h3>
              <p className="text-gray-600">
                Join thousands of users who trust MindMate with their mental health journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Mental Health Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join MindMate today and take the first step towards better mental wellness. 
            It's free to get started.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
