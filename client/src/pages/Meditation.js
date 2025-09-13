import React, { useState } from 'react';
import { 
  Activity, 
  Play, 
  Pause, 
  Clock, 
  Heart,
  Brain,
  Wind,
  Sun,
  Moon,
  Star,
  X
} from 'lucide-react';

const Meditation = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const meditationTypes = [
    {
      id: 'breathing',
      title: 'Breathing Exercises',
      description: 'Focus on your breath to calm your mind',
      icon: Wind,
      color: 'bg-blue-500',
      duration: 5,
      exercises: [
        { name: '4-7-8 Breathing', duration: 5, description: 'Inhale for 4, hold for 7, exhale for 8' },
        { name: 'Box Breathing', duration: 4, description: 'Equal inhale, hold, exhale, hold' },
        { name: 'Deep Breathing', duration: 10, description: 'Slow, deep breaths to relax' }
      ]
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness Meditation',
      description: 'Practice present-moment awareness',
      icon: Brain,
      color: 'bg-purple-500',
      duration: 15,
      exercises: [
        { name: 'Body Scan', duration: 20, description: 'Progressive relaxation through body awareness' },
        { name: 'Loving Kindness', duration: 15, description: 'Cultivate compassion and love' },
        { name: 'Walking Meditation', duration: 10, description: 'Mindful walking practice' }
      ]
    },
    {
      id: 'sleep',
      title: 'Sleep & Relaxation',
      description: 'Wind down and prepare for restful sleep',
      icon: Moon,
      color: 'bg-indigo-500',
      duration: 20,
      exercises: [
        { name: 'Sleep Story', duration: 30, description: 'Guided story to help you drift off' },
        { name: 'Progressive Relaxation', duration: 25, description: 'Tense and release each muscle group' },
        { name: 'White Noise', duration: 60, description: 'Soothing sounds for sleep' }
      ]
    },
    {
      id: 'stress',
      title: 'Stress Relief',
      description: 'Quick techniques to reduce stress',
      icon: Heart,
      color: 'bg-red-500',
      duration: 10,
      exercises: [
        { name: 'Quick Reset', duration: 3, description: 'Fast stress relief technique' },
        { name: 'Grounding Exercise', duration: 5, description: '5-4-3-2-1 grounding method' },
        { name: 'Tension Release', duration: 8, description: 'Release physical tension' }
      ]
    }
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectExercise = (exercise) => {
    setSelectedMeditation(exercise);
    setDuration(exercise.duration * 60); // Convert to seconds
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Activity className="h-8 w-8 text-green-500 mr-3" />
          Meditation & Mindfulness
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Find peace and calm through guided meditations and breathing exercises
        </p>
      </div>

      {/* Meditation Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {meditationTypes.map((type) => {
          const Icon = type.icon;
          return (
            <div
              key={type.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedMeditation(type)}
            >
              <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mb-4`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {type.duration} min average
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Meditation Details */}
      {selectedMeditation && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedMeditation.title}
              </h2>
              <p className="text-gray-600">{selectedMeditation.description}</p>
            </div>
            <button
              onClick={() => setSelectedMeditation(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Exercises List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedMeditation.exercises?.map((exercise, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSelectExercise(exercise)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
                  <span className="text-sm text-gray-500">{exercise.duration} min</span>
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meditation Player */}
      {selectedMeditation && selectedMeditation.name && (
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{selectedMeditation.name}</h3>
            <p className="text-indigo-100 mb-6">{selectedMeditation.description}</p>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-indigo-300 rounded-full h-2 mb-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 text-left max-w-2xl mx-auto">
              <h4 className="text-lg font-semibold mb-3">Instructions:</h4>
              <ul className="space-y-2 text-indigo-100">
                <li>• Find a comfortable position, sitting or lying down</li>
                <li>• Close your eyes and take a few deep breaths</li>
                <li>• Follow the guided instructions and focus on your breath</li>
                <li>• If your mind wanders, gently bring it back to the present</li>
                <li>• There's no right or wrong way to meditate</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Quick Access */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Sun className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Morning Routine</h3>
            <p className="text-gray-600 mb-4">Start your day with energy and focus</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
              Begin
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Moon className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Evening Wind-down</h3>
            <p className="text-gray-600 mb-4">Relax and prepare for restful sleep</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg">
              Begin
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Star className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stress Relief</h3>
            <p className="text-gray-600 mb-4">Quick techniques for immediate relief</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
              Begin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meditation;
