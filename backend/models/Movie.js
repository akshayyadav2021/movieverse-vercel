const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a movie title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 0,
    max: 10
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please add a release date']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes']
  },
  director: {
    type: String,
    required: [true, 'Please add a director']
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre']
  },
  cast: {
    type: [String],
    default: []
  },
  posterUrl: {
    type: String,
    default: ''
  },
  imdbId: {
    type: String,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


movieSchema.index({ title: 'text', description: 'text' });
movieSchema.index({ rating: -1 });
movieSchema.index({ releaseDate: -1 });
movieSchema.index({ duration: 1 });
movieSchema.index({ createdAt: -1 });
movieSchema.index({ title: 1, rating: -1 });
movieSchema.index({ genre: 1 }); 

module.exports = mongoose.model('Movie', movieSchema);
