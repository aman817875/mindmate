import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Brain, Eye, EyeOff, Loader, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    psychometricAnswers: []
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { register } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        emergencyContact: {
          ...formData.emergencyContact,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handlePsychometricAnswer = (questionId, answer, score) => {
    setFormData({
      ...formData,
      psychometricAnswers: [
        ...formData.psychometricAnswers.filter(q => q.questionId !== questionId),
        { questionId, answer, score }
      ]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      const result = await register(userData);
      
      if (result.success) {
        toast.success('Registration successful! Welcome to MindMate!');
        navigate('/dashboard');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const psychometricQuestions = [
    {
      id: 'stress-level',
      question: 'How often do you feel stressed or overwhelmed?',
      options: [
        { text: 'Never', score: 1 },
        { text: 'Rarely', score: 2 },
        { text: 'Sometimes', score: 3 },
        { text: 'Often', score: 4 },
        { text: 'Always', score: 5 }
      ]
    },
    {
      id: 'sleep-quality',
      question: 'How would you rate your sleep quality?',
      options: [
        { text: 'Excellent', score: 1 },
        { text: 'Good', score: 2 },
        { text: 'Fair', score: 3 },
        { text: 'Poor', score: 4 },
        { text: 'Very Poor', score: 5 }
      ]
    },
    {
      id: 'social-support',
      question: 'How satisfied are you with your social support system?',
      options: [
        { text: 'Very Satisfied', score: 1 },
        { text: 'Satisfied', score: 2 },
        { text: 'Neutral', score: 3 },
        { text: 'Dissatisfied', score: 4 },
        { text: 'Very Dissatisfied', score: 5 }
      ]
    }
  ];

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-3 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Security & Emergency Contact</h3>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password *
        </label>
        <div className="mt-1 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Create a password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password *
        </label>
        <div className="mt-1 relative">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Confirm your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-md font-medium text-gray-900 mb-3">Emergency Contact (Optional)</h4>
        
        <div>
          <label htmlFor="emergencyContact.name" className="block text-sm font-medium text-gray-700">
            Contact Name
          </label>
          <input
            id="emergencyContact.name"
            name="emergencyContact.name"
            type="text"
            value={formData.emergencyContact.name}
            onChange={handleChange}
            className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Emergency contact name"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="emergencyContact.phone" className="block text-sm font-medium text-gray-700">
            Contact Phone
          </label>
          <input
            id="emergencyContact.phone"
            name="emergencyContact.phone"
            type="tel"
            value={formData.emergencyContact.phone}
            onChange={handleChange}
            className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Emergency contact phone"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="emergencyContact.relationship" className="block text-sm font-medium text-gray-700">
            Relationship
          </label>
          <input
            id="emergencyContact.relationship"
            name="emergencyContact.relationship"
            type="text"
            value={formData.emergencyContact.relationship}
            onChange={handleChange}
            className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="e.g., Spouse, Parent, Friend"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Mental Health Assessment (Optional)</h3>
      <p className="text-sm text-gray-600 mb-6">
        Help us personalize your experience by answering a few questions about your mental health.
      </p>

      {psychometricQuestions.map((question, index) => (
        <div key={question.id} className="border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            {index + 1}. {question.question}
          </h4>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => {
              const currentAnswer = formData.psychometricAnswers.find(a => a.questionId === question.id);
              const isSelected = currentAnswer && currentAnswer.answer === option.text;
              
              return (
                <label
                  key={optionIndex}
                  className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.text}
                    checked={isSelected}
                    onChange={() => handlePsychometricAnswer(question.id, option.text, option.score)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">{option.text}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}

      <div>
        <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
          Medical History (Optional)
        </label>
        <textarea
          id="medicalHistory"
          name="medicalHistory"
          rows={3}
          value={formData.medicalHistory}
          onChange={handleChange}
          className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Any relevant medical history or conditions..."
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Join MindMate
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Start your mental health journey with us
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="bg-white py-8 px-6 shadow rounded-lg">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle className="h-4 w-4 mr-2" />
                )}
                Create Account
              </button>
            )}
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in here
              </Link>
            </span>
          </div>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Secure & HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
