// Simple in-memory storage for development without MongoDB
const bcrypt = require('bcryptjs');
const users = [];
const moods = [];
const journals = [];

const memoryStorage = {
  users: {
    findOne: (query) => {
      if (query.email) {
        return Promise.resolve(users.find(user => user.email === query.email));
      }
      if (query._id) {
        return Promise.resolve(users.find(user => user._id === query._id));
      }
      return Promise.resolve(null);
    },
    findByIdAndUpdate: (id, update, options) => {
      const userIndex = users.findIndex(user => user._id === id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...update.$set };
        return Promise.resolve(users[userIndex]);
      }
      return Promise.resolve(null);
    },
    create: async (userData) => {
      // Hash password before storing
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const newUser = {
        _id: Date.now().toString(),
        ...userData,
        password: hashedPassword,
        isActive: true,
        isVerified: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      users.push(newUser);
      return Promise.resolve(newUser);
    }
  },
  moods: {
    find: (query) => {
      let filteredMoods = moods;
      if (query.userId) {
        filteredMoods = moods.filter(mood => mood.userId === query.userId);
      }
      if (query.date) {
        if (query.date.$gte) {
          filteredMoods = filteredMoods.filter(mood => new Date(mood.date) >= new Date(query.date.$gte));
        }
        if (query.date.$lte) {
          filteredMoods = filteredMoods.filter(mood => new Date(mood.date) <= new Date(query.date.$lte));
        }
      }
      return Promise.resolve(filteredMoods.sort((a, b) => new Date(b.date) - new Date(a.date)));
    },
    create: (moodData) => {
      const newMood = {
        _id: Date.now().toString(),
        ...moodData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      moods.push(newMood);
      return Promise.resolve(newMood);
    },
    findOneAndUpdate: (query, update, options) => {
      const moodIndex = moods.findIndex(mood => mood._id === query._id && mood.userId === query.userId);
      if (moodIndex !== -1) {
        moods[moodIndex] = { ...moods[moodIndex], ...update.$set };
        return Promise.resolve(moods[moodIndex]);
      }
      return Promise.resolve(null);
    },
    findOneAndDelete: (query) => {
      const moodIndex = moods.findIndex(mood => mood._id === query._id && mood.userId === query.userId);
      if (moodIndex !== -1) {
        const deletedMood = moods.splice(moodIndex, 1)[0];
        return Promise.resolve(deletedMood);
      }
      return Promise.resolve(null);
    },
    countDocuments: (query) => {
      let filteredMoods = moods;
      if (query.userId) {
        filteredMoods = moods.filter(mood => mood.userId === query.userId);
      }
      return Promise.resolve(filteredMoods.length);
    }
  },
  journals: {
    find: (query) => {
      let filteredJournals = journals;
      if (query.userId) {
        filteredJournals = journals.filter(journal => journal.userId === query.userId);
      }
      if (query.mood) {
        filteredJournals = filteredJournals.filter(journal => journal.mood === query.mood);
      }
      if (query.$or) {
        const searchTerm = query.$or[0].title?.$regex?.source || query.$or[0].content?.$regex?.source;
        if (searchTerm) {
          const regex = new RegExp(searchTerm, 'i');
          filteredJournals = filteredJournals.filter(journal => 
            regex.test(journal.title || '') || regex.test(journal.content || '')
          );
        }
      }
      return Promise.resolve(filteredJournals.sort((a, b) => new Date(b.date) - new Date(a.date)));
    },
    create: (journalData) => {
      const newJournal = {
        _id: Date.now().toString(),
        ...journalData,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      journals.push(newJournal);
      return Promise.resolve(newJournal);
    },
    findOneAndUpdate: (query, update, options) => {
      const journalIndex = journals.findIndex(journal => journal._id === query._id && journal.userId === query.userId);
      if (journalIndex !== -1) {
        journals[journalIndex] = { ...journals[journalIndex], ...update.$set };
        return Promise.resolve(journals[journalIndex]);
      }
      return Promise.resolve(null);
    },
    findOneAndDelete: (query) => {
      const journalIndex = journals.findIndex(journal => journal._id === query._id && journal.userId === query.userId);
      if (journalIndex !== -1) {
        const deletedJournal = journals.splice(journalIndex, 1)[0];
        return Promise.resolve(deletedJournal);
      }
      return Promise.resolve(null);
    },
    countDocuments: (query) => {
      let filteredJournals = journals;
      if (query.userId) {
        filteredJournals = journals.filter(journal => journal.userId === query.userId);
      }
      return Promise.resolve(filteredJournals.length);
    }
  }
};

module.exports = memoryStorage;
