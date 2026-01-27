const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const sampleMovies = require('./sampleData');

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing movies
    await Movie.deleteMany({});
    console.log('Existing movies cleared');

    // Insert sample movies
    await Movie.insertMany(sampleMovies);
    console.log('Sample movies inserted successfully');

    console.log(`${sampleMovies.length} movies added to the database`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
